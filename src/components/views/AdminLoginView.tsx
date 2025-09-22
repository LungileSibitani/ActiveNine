import React, { useState } from 'react';
import { Eye, EyeOff, LogIn, RefreshCw, ArrowLeft, Shield } from 'lucide-react';

interface AdminLoginViewProps {
  onViewChange: (view: string) => void;
  onAdminLogin: (username: string) => void;
}

export default function AdminLoginView({ onViewChange, onAdminLogin }: AdminLoginViewProps) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Admin credentials validation
      if (!formData.username || !formData.password) {
        throw new Error('Please fill in all fields');
      }

      if (formData.username.length < 3) {
        throw new Error('Username must be at least 3 characters');
      }

      if (formData.password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      // Simple admin authentication (in production, this would be server-side)
      const adminCredentials = {
        username: 'admin',
        password: 'admin123'
      };

      if (formData.username !== adminCredentials.username || formData.password !== adminCredentials.password) {
        throw new Error('Invalid admin credentials');
      }

      // Call onAdminLogin with admin username
      onAdminLogin(formData.username);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Admin login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      username: '',
      password: '',
    });
    setError('');
    setShowPassword(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-custom-gradient py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header with Back Button */}
        <div className="text-center animate-fade-in relative">
          {/* Back Button */}
          <button
            onClick={() => onViewChange('landing')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white hover:text-warm-orange transition-colors"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>

          <div className="mx-auto h-16 w-16 bg-red-600 rounded-full flex items-center justify-center mb-4 shadow-3d animate-float">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
            Admin Access
          </h2>
          <p className="text-gray-300 drop-shadow">
            Administrator login only
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-sm rounded-xl p-8 shadow-3d border border-white/20">
          <div className="space-y-6">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-white mb-2">
                Admin Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent backdrop-blur-sm"
                placeholder="Enter admin username"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                Admin Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent backdrop-blur-sm pr-12"
                  placeholder="Enter admin password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-yellow-500/20 border border-yellow-400/50 text-yellow-100 px-4 py-3 rounded-lg text-sm">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Default credentials: admin / admin123</span>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/20 border border-red-400/50 text-red-100 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-500 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-3d hover:shadow-lg transform hover:scale-105"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="h-5 w-5 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    <LogIn className="h-5 w-5" />
                    Admin Login
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleReset}
                disabled={isLoading}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <RefreshCw className="h-5 w-5" />
                Reset
              </button>
            </div>
          </div>
        </form>

        {/* Footer Links */}
        <div className="text-center space-y-2">
          <p className="text-gray-300">
            <button
              onClick={() => onViewChange('login')}
              className="text-warm-orange hover:text-orange-400 font-semibold transition-colors"
            >
              ← Back to User Login
            </button>
          </p>
          <p className="text-sm text-gray-400">
            This is a restricted admin area
          </p>
        </div>
      </div>
    </div>
  );
}
