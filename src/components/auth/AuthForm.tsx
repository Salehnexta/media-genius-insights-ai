
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';

interface AuthFormProps {
  isLogin: boolean;
  isArabic: boolean;
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  showPassword: boolean;
  loading: boolean;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onFullNameChange: (value: string) => void;
  onTogglePassword: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({
  isLogin,
  isArabic,
  email,
  password,
  confirmPassword,
  fullName,
  showPassword,
  loading,
  onEmailChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onFullNameChange,
  onTogglePassword,
  onSubmit
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {!isLogin && (
        <div className="space-y-2">
          <Label htmlFor="fullName">
            {isArabic ? 'الاسم الكامل' : 'Full Name'}
          </Label>
          <Input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => onFullNameChange(e.target.value)}
            required={!isLogin}
            className="bg-white dark:bg-gray-800"
          />
        </div>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="email">
          {isArabic ? 'البريد الإلكتروني' : 'Email'}
        </Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          required
          className="bg-white dark:bg-gray-800"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">
          {isArabic ? 'كلمة المرور' : 'Password'}
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            required
            className="bg-white dark:bg-gray-800 pr-10"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={onTogglePassword}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-gray-400" />
            ) : (
              <Eye className="h-4 w-4 text-gray-400" />
            )}
          </Button>
        </div>
      </div>
      
      {!isLogin && (
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">
            {isArabic ? 'تأكيد كلمة المرور' : 'Confirm Password'}
          </Label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => onConfirmPasswordChange(e.target.value)}
            required
            className="bg-white dark:bg-gray-800"
          />
        </div>
      )}
      
      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        disabled={loading}
      >
        {loading 
          ? (isArabic ? 'جاري المعالجة...' : 'Processing...')
          : isLogin 
            ? (isArabic ? 'تسجيل الدخول' : 'Sign In')
            : (isArabic ? 'إنشاء الحساب' : 'Create Account')
        }
      </Button>
    </form>
  );
};

export default AuthForm;
