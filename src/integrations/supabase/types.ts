export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_notifications: {
        Row: {
          action_url: string | null
          admin_id: string | null
          created_at: string
          id: string
          is_read: boolean
          message: string
          metadata: Json | null
          read_at: string | null
          title: string
          type: string
        }
        Insert: {
          action_url?: string | null
          admin_id?: string | null
          created_at?: string
          id?: string
          is_read?: boolean
          message: string
          metadata?: Json | null
          read_at?: string | null
          title: string
          type?: string
        }
        Update: {
          action_url?: string | null
          admin_id?: string | null
          created_at?: string
          id?: string
          is_read?: boolean
          message?: string
          metadata?: Json | null
          read_at?: string | null
          title?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "admin_notifications_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_users: {
        Row: {
          created_at: string
          created_by: string | null
          email: string
          id: string
          is_active: boolean
          last_login: string | null
          role: Database["public"]["Enums"]["admin_role"]
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          email: string
          id?: string
          is_active?: boolean
          last_login?: string | null
          role?: Database["public"]["Enums"]["admin_role"]
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          email?: string
          id?: string
          is_active?: boolean
          last_login?: string | null
          role?: Database["public"]["Enums"]["admin_role"]
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_users_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_conversations: {
        Row: {
          agent_type: string
          context: Json
          conversation_data: Json
          created_at: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          agent_type: string
          context?: Json
          conversation_data?: Json
          created_at?: string
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          agent_type?: string
          context?: Json
          conversation_data?: Json
          created_at?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      ai_insights: {
        Row: {
          actionable: boolean
          category: string
          created_at: string
          description: string
          id: string
          insight_type: string
          is_read: boolean
          metadata: Json
          priority: string
          title: string
          user_id: string
        }
        Insert: {
          actionable?: boolean
          category: string
          created_at?: string
          description: string
          id?: string
          insight_type: string
          is_read?: boolean
          metadata?: Json
          priority?: string
          title: string
          user_id: string
        }
        Update: {
          actionable?: boolean
          category?: string
          created_at?: string
          description?: string
          id?: string
          insight_type?: string
          is_read?: boolean
          metadata?: Json
          priority?: string
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      ai_usage_logs: {
        Row: {
          cost_sar: number | null
          created_at: string
          feature_type: string
          id: string
          subscription_id: string | null
          tokens_used: number | null
          usage_count: number
          user_id: string
        }
        Insert: {
          cost_sar?: number | null
          created_at?: string
          feature_type: string
          id?: string
          subscription_id?: string | null
          tokens_used?: number | null
          usage_count?: number
          user_id: string
        }
        Update: {
          cost_sar?: number | null
          created_at?: string
          feature_type?: string
          id?: string
          subscription_id?: string | null
          tokens_used?: number | null
          usage_count?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_usage_logs_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "user_subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          admin_id: string | null
          created_at: string
          id: string
          ip_address: unknown | null
          new_values: Json | null
          old_values: Json | null
          resource_id: string | null
          resource_type: string
          user_agent: string | null
        }
        Insert: {
          action: string
          admin_id?: string | null
          created_at?: string
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          resource_id?: string | null
          resource_type: string
          user_agent?: string | null
        }
        Update: {
          action?: string
          admin_id?: string | null
          created_at?: string
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          resource_id?: string | null
          resource_type?: string
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      campaigns: {
        Row: {
          budget: number | null
          created_at: string | null
          description: string | null
          end_date: string | null
          id: string
          metrics: Json | null
          name: string
          start_date: string | null
          status: string | null
          target_audience: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          budget?: number | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          metrics?: Json | null
          name: string
          start_date?: string | null
          status?: string | null
          target_audience?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          budget?: number | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          metrics?: Json | null
          name?: string
          start_date?: string | null
          status?: string | null
          target_audience?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      competitor_analysis: {
        Row: {
          analysis_data: Json
          competitor_name: string
          competitor_url: string | null
          created_at: string
          id: string
          market_position: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          analysis_data?: Json
          competitor_name: string
          competitor_url?: string | null
          created_at?: string
          id?: string
          market_position?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          analysis_data?: Json
          competitor_name?: string
          competitor_url?: string | null
          created_at?: string
          id?: string
          market_position?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      content: {
        Row: {
          campaign_id: string | null
          content_text: string | null
          content_type: string | null
          created_at: string | null
          engagement_metrics: Json | null
          id: string
          media_url: string | null
          platform: string | null
          published_at: string | null
          scheduled_at: string | null
          status: string | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          campaign_id?: string | null
          content_text?: string | null
          content_type?: string | null
          created_at?: string | null
          engagement_metrics?: Json | null
          id?: string
          media_url?: string | null
          platform?: string | null
          published_at?: string | null
          scheduled_at?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          campaign_id?: string | null
          content_text?: string | null
          content_type?: string | null
          created_at?: string | null
          engagement_metrics?: Json | null
          id?: string
          media_url?: string | null
          platform?: string | null
          published_at?: string | null
          scheduled_at?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "content_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      onboarding_data: {
        Row: {
          budget: string | null
          business_name: string | null
          competitors: string[] | null
          completed_at: string | null
          created_at: string | null
          experience: string | null
          goals: string[] | null
          id: string
          industry: string | null
          skill_level: string | null
          social_accounts: Json | null
          updated_at: string | null
          user_id: string
          website: string | null
        }
        Insert: {
          budget?: string | null
          business_name?: string | null
          competitors?: string[] | null
          completed_at?: string | null
          created_at?: string | null
          experience?: string | null
          goals?: string[] | null
          id?: string
          industry?: string | null
          skill_level?: string | null
          social_accounts?: Json | null
          updated_at?: string | null
          user_id: string
          website?: string | null
        }
        Update: {
          budget?: string | null
          business_name?: string | null
          competitors?: string[] | null
          completed_at?: string | null
          created_at?: string | null
          experience?: string | null
          goals?: string[] | null
          id?: string
          industry?: string | null
          skill_level?: string | null
          social_accounts?: Json | null
          updated_at?: string | null
          user_id?: string
          website?: string | null
        }
        Relationships: []
      }
      platform_config: {
        Row: {
          category: string
          created_at: string
          description: string | null
          id: string
          is_sensitive: boolean
          key: string
          updated_at: string
          updated_by: string | null
          value: Json
        }
        Insert: {
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          is_sensitive?: boolean
          key: string
          updated_at?: string
          updated_by?: string | null
          value: Json
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          is_sensitive?: boolean
          key?: string
          updated_at?: string
          updated_by?: string | null
          value?: Json
        }
        Relationships: [
          {
            foreignKeyName: "platform_config_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          company_name: string | null
          created_at: string | null
          full_name: string | null
          id: string
          industry: string | null
          location: string | null
          phone: string | null
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          company_name?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          industry?: string | null
          location?: string | null
          phone?: string | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          company_name?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          industry?: string | null
          location?: string | null
          phone?: string | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: []
      }
      social_media_accounts: {
        Row: {
          account_handle: string | null
          account_url: string
          created_at: string
          id: string
          last_sync: string | null
          metrics_data: Json
          platform: string
          updated_at: string
          user_id: string
        }
        Insert: {
          account_handle?: string | null
          account_url: string
          created_at?: string
          id?: string
          last_sync?: string | null
          metrics_data?: Json
          platform: string
          updated_at?: string
          user_id: string
        }
        Update: {
          account_handle?: string | null
          account_url?: string
          created_at?: string
          id?: string
          last_sync?: string | null
          metrics_data?: Json
          platform?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      subscription_plans: {
        Row: {
          created_at: string
          features: Json
          id: string
          monthly_message_limit: number
          name: string
          overage_price_sar: number | null
          price_sar: number
        }
        Insert: {
          created_at?: string
          features?: Json
          id?: string
          monthly_message_limit: number
          name: string
          overage_price_sar?: number | null
          price_sar: number
        }
        Update: {
          created_at?: string
          features?: Json
          id?: string
          monthly_message_limit?: number
          name?: string
          overage_price_sar?: number | null
          price_sar?: number
        }
        Relationships: []
      }
      support_ticket_messages: {
        Row: {
          admin_sender_id: string | null
          attachments: Json | null
          created_at: string
          id: string
          is_internal: boolean
          message: string
          sender_id: string | null
          ticket_id: string | null
        }
        Insert: {
          admin_sender_id?: string | null
          attachments?: Json | null
          created_at?: string
          id?: string
          is_internal?: boolean
          message: string
          sender_id?: string | null
          ticket_id?: string | null
        }
        Update: {
          admin_sender_id?: string | null
          attachments?: Json | null
          created_at?: string
          id?: string
          is_internal?: boolean
          message?: string
          sender_id?: string | null
          ticket_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "support_ticket_messages_admin_sender_id_fkey"
            columns: ["admin_sender_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_ticket_messages_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "support_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      support_tickets: {
        Row: {
          assigned_admin_id: string | null
          category: string
          created_at: string
          description: string
          id: string
          metadata: Json | null
          priority: string
          resolved_at: string | null
          status: string
          title: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          assigned_admin_id?: string | null
          category?: string
          created_at?: string
          description: string
          id?: string
          metadata?: Json | null
          priority?: string
          resolved_at?: string | null
          status?: string
          title: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          assigned_admin_id?: string | null
          category?: string
          created_at?: string
          description?: string
          id?: string
          metadata?: Json | null
          priority?: string
          resolved_at?: string | null
          status?: string
          title?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "support_tickets_assigned_admin_id_fkey"
            columns: ["assigned_admin_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      system_monitoring: {
        Row: {
          id: string
          metadata: Json | null
          metric_name: string
          metric_value: number
          recorded_at: string
        }
        Insert: {
          id?: string
          metadata?: Json | null
          metric_name: string
          metric_value: number
          recorded_at?: string
        }
        Update: {
          id?: string
          metadata?: Json | null
          metric_name?: string
          metric_value?: number
          recorded_at?: string
        }
        Relationships: []
      }
      usage_tracking: {
        Row: {
          api_calls_count: number
          content_generation_count: number
          created_at: string
          id: string
          message_count: number
          period_end: string
          period_start: string
          subscription_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          api_calls_count?: number
          content_generation_count?: number
          created_at?: string
          id?: string
          message_count?: number
          period_end: string
          period_start: string
          subscription_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          api_calls_count?: number
          content_generation_count?: number
          created_at?: string
          id?: string
          message_count?: number
          period_end?: string
          period_start?: string
          subscription_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "usage_tracking_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "user_subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      user_preferences: {
        Row: {
          ai_context: Json | null
          created_at: string | null
          id: string
          language: string | null
          personalization_data: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          ai_context?: Json | null
          created_at?: string | null
          id?: string
          language?: string | null
          personalization_data?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          ai_context?: Json | null
          created_at?: string | null
          id?: string
          language?: string | null
          personalization_data?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_subscriptions: {
        Row: {
          created_at: string
          current_period_end: string
          current_period_start: string
          id: string
          plan_id: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_period_end: string
          current_period_start?: string
          id?: string
          plan_id: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_period_end?: string
          current_period_start?: string
          id?: string
          plan_id?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      website_analysis: {
        Row: {
          analysis_data: Json
          created_at: string
          id: string
          mobile_score: number | null
          performance_score: number | null
          seo_score: number | null
          updated_at: string
          user_id: string
          website_url: string
        }
        Insert: {
          analysis_data?: Json
          created_at?: string
          id?: string
          mobile_score?: number | null
          performance_score?: number | null
          seo_score?: number | null
          updated_at?: string
          user_id: string
          website_url: string
        }
        Update: {
          analysis_data?: Json
          created_at?: string
          id?: string
          mobile_score?: number | null
          performance_score?: number | null
          seo_score?: number | null
          updated_at?: string
          user_id?: string
          website_url?: string
        }
        Relationships: []
      }
      zapier_webhooks: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          name: string
          trigger_event: string
          updated_at: string | null
          user_id: string
          webhook_url: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          trigger_event: string
          updated_at?: string | null
          user_id: string
          webhook_url: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          trigger_event?: string
          updated_at?: string | null
          user_id?: string
          webhook_url?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_access_onboarding_data: {
        Args: { target_user_id: string }
        Returns: boolean
      }
      can_access_profile: {
        Args: { target_user_id: string }
        Returns: boolean
      }
      can_access_user_preferences: {
        Args: { target_user_id: string }
        Returns: boolean
      }
      get_current_admin: {
        Args: Record<PropertyKey, never>
        Returns: {
          created_at: string
          created_by: string | null
          email: string
          id: string
          is_active: boolean
          last_login: string | null
          role: Database["public"]["Enums"]["admin_role"]
          updated_at: string
          user_id: string | null
        }
      }
      get_current_user_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      is_admin: {
        Args: { required_role?: Database["public"]["Enums"]["admin_role"] }
        Returns: boolean
      }
    }
    Enums: {
      admin_role: "super_admin" | "admin" | "moderator" | "support"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      admin_role: ["super_admin", "admin", "moderator", "support"],
    },
  },
} as const
