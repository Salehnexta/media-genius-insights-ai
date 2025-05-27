
import { supabase } from '@/integrations/supabase/client';

export interface ChatMessage {
  id: string;
  user_id: string;
  session_id: string;
  message_content: string;
  message_type: 'user' | 'ai';
  agent_type?: string;
  context?: Record<string, any>;
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface ChatSession {
  session_id: string;
  messages: ChatMessage[];
  created_at: string;
  last_message: string;
}

export const chatHistoryService = {
  // Save a message to chat history
  async saveMessage(
    sessionId: string,
    messageContent: string,
    messageType: 'user' | 'ai',
    agentType: string = 'marketing-manager',
    context: Record<string, any> = {},
    metadata: Record<string, any> = {}
  ): Promise<ChatMessage | null> {
    try {
      const { data, error } = await supabase
        .from('ai_chat_history')
        .insert({
          session_id: sessionId,
          message_content: messageContent,
          message_type: messageType,
          agent_type: agentType,
          context,
          metadata
        })
        .select()
        .single();

      if (error) {
        console.error('Error saving chat message:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in saveMessage:', error);
      return null;
    }
  },

  // Get chat history for a specific session
  async getSessionHistory(sessionId: string): Promise<ChatMessage[]> {
    try {
      const { data, error } = await supabase
        .from('ai_chat_history')
        .select('*')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching session history:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error in getSessionHistory:', error);
      return [];
    }
  },

  // Get all chat sessions for the current user
  async getUserChatSessions(): Promise<ChatSession[]> {
    try {
      const { data, error } = await supabase
        .from('ai_chat_history')
        .select('session_id, message_content, created_at, message_type')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching user sessions:', error);
        return [];
      }

      // Group messages by session_id
      const sessionMap = new Map<string, ChatMessage[]>();
      
      data?.forEach((message) => {
        if (!sessionMap.has(message.session_id)) {
          sessionMap.set(message.session_id, []);
        }
        sessionMap.get(message.session_id)?.push(message as ChatMessage);
      });

      // Convert to ChatSession format
      const sessions: ChatSession[] = [];
      sessionMap.forEach((messages, sessionId) => {
        if (messages.length > 0) {
          sessions.push({
            session_id: sessionId,
            messages: messages.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()),
            created_at: messages[0].created_at,
            last_message: messages[messages.length - 1].message_content
          });
        }
      });

      return sessions.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    } catch (error) {
      console.error('Error in getUserChatSessions:', error);
      return [];
    }
  },

  // Delete a chat session
  async deleteSession(sessionId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('ai_chat_history')
        .delete()
        .eq('session_id', sessionId);

      if (error) {
        console.error('Error deleting session:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error in deleteSession:', error);
      return false;
    }
  },

  // Generate a new session ID
  generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
};
