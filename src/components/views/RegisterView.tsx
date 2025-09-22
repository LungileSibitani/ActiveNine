import React, { useState } from 'react';
import { Eye, EyeOff, User, RefreshCw, ArrowLeft } from 'lucide-react';

interface RegisterViewProps {
  onViewChange: (view: string) => void;
  onLogin: (role: 'buyer' | 'entrepreneur', name: string) => void;
}

export default function RegisterView({ onViewChange, onLogin }: RegisterViewProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    township: '',
    password: '',
    confirmPassword: '',
    userType: 'buyer' as 'buyer' | 'entrepreneur'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

      // Basic validation
      if (!formData.name || !formData.email || !formData.phone || !formData.password) {
        throw new Error('Please fill in all required fields');
      }

      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      if (formData.password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      // Call onLogin with selected role and name
      onLogin(formData.userType, formData.name);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      location: '',
      township: '',
      password: '',
      confirmPassword: '',
      userType: 'buyer'
    });
    setError('');
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-gray py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header with Back Button */}
        <div className="text-center relative">
          {/* Back Button */}
          <button
            onClick={() => onViewChange('landing')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-warm-orange transition-colors"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>

          <div className="mx-auto h-16 w-16 bg-warm-orange rounded-full flex items-center justify-center mb-4 shadow-3d animate-float">
            <User className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Join Dintshang?
          </h2>
          <p className="text-gray-600">
            Create your account and start your journey
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 shadow-3d border border-gray-200">
          <div className="space-y-6">
            {/* User Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                I am a:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, userType: 'buyer' }))}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                    formData.userType === 'buyer'
                      ? 'border-warm-orange bg-orange-50 text-warm-orange'
                      : 'border-gray-200 hover:border-warm-orange hover:bg-orange-50'
                  }`}
                >
                  <div className="text-center">
                    <div className="font-semibold text-sm">Buyer</div>
                    <div className="text-xs text-gray-600">Shop & Discover</div>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, userType: 'entrepreneur' }))}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                    formData.userType === 'entrepreneur'
                      ? 'border-warm-orange bg-orange-50 text-warm-orange'
                      : 'border-gray-200 hover:border-warm-orange hover:bg-orange-50'
                  }`}
                >
                  <div className="text-center">
                    <div className="font-semibold text-sm">Entrepreneur</div>
                    <div className="text-xs text-gray-600">Sell & Grow</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-orange focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-orange focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>

            {/* Phone Field */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-orange focus:border-transparent"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Location Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-orange focus:border-transparent"
                  placeholder="City"
                />
              </div>
              <div>
                <label htmlFor="township" className="block text-sm font-medium text-gray-700 mb-2">
                  Township
                </label>
                <input
                  id="township"
                  name="township"
                  type="text"
                  value={formData.township}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-orange focus:border-transparent"
                  placeholder="Township"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password *
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-orange focus:border-transparent pr-12"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password *
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-orange focus:border-transparent pr-12"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-warm-orange text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-400 focus:ring-2 focus:ring-warm-orange focus:ring-offset-2 transition-all duration-300 shadow-3d hover:shadow-lg transform hover:scale-105 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="h-5 w-5 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    <User className="h-5 w-5" />
                    Create Account
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleReset}
                disabled={isLoading}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-300 shadow-3d hover:shadow-lg transform hover:scale-105 flex items-center gap-2"
              >
                <RefreshCw className="h-5 w-5" />
                Reset
              </button>
            </div>
          </div>
        </form>

        {/* Footer Links */}
        <div className="text-center space-y-2">
          <p className="text-gray-600">
            Already have an account?{' '}
            <button
              onClick={() => onViewChange('login')}
              className="text-warm-orange hover:text-orange-400 font-semibold transition-all duration-300"
            >
              Sign In
            </button>
          </p>
          <p className="text-sm text-gray-500">
            By registering, you agree to our{' '}
            <button className="text-warm-orange hover:text-orange-400 font-semibold transition-all duration-300">
              Terms of Service
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
