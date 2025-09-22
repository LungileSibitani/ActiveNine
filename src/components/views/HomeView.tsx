import React from 'react';
import {
  TrendingUp,
  Users,
  MapPin,
  Star,
  ChevronRight,
  Smartphone,
  Zap,
  DollarSign,
  BookOpen,
  Calculator,
  Building2
} from 'lucide-react';

interface HomeViewProps {
  onViewChange: (view: string) => void;
  userRole?: 'buyer' | 'entrepreneur' | null;
}

export default function HomeView({ onViewChange, userRole }: HomeViewProps) {
  const features = [
    {
      icon: Smartphone,
      title: 'Digital Presence',
      description: 'Get your business online and visible to thousands of customers',
      color: 'bg-blue-500',
      link: 'business'
    },
    {
      icon: Users,
      title: 'Connect Locally',
      description: 'Network with other township businesses and share opportunities',
      color: 'bg-warm-orange',
      link: 'marketplace'
    },
    {
      icon: Zap,
      title: 'Business Tools',
      description: 'Access affordable tools to manage inventory, sales, and customers',
      color: 'bg-yellow-500',
      link: 'tools'
    },
    {
      icon: DollarSign,
      title: 'Financial Access',
      description: 'Find loans, grants, and financial services for your business',
      color: 'bg-purple-500',
      link: 'finance'
    }
  ];

  const stats = [
    { label: 'Active Businesses', value: '1,247', icon: TrendingUp },
    { label: 'Happy Customers', value: '15,892', icon: Users },
    { label: 'Townships Connected', value: '23', icon: MapPin },
    { label: 'Average Rating', value: '4.8', icon: Star }
  ];

  const quickActions = [
    {
      icon: BookOpen,
      title: 'Learning Centre',
      description: 'Access training materials',
      link: 'learn'
    },
    {
      icon: Calculator,
      title: 'Financial Tools',
      description: 'Manage your finances',
      link: 'finance'
    },
    {
      icon: Building2,
      title: 'Business Hub',
      description: 'Manage your business',
      link: 'business'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-warm-orange to-orange-500 text-white rounded-2xl p-8 shadow-3d animate-slide-up">
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Welcome to Dintshang? 🏠
          </h1>
          <p className="text-orange-100 text-lg mb-2">
            Your digital marketplace for township businesses
          </p>
          <p className="text-orange-100 text-base">
            {userRole === 'entrepreneur'
              ? 'Discover amazing products, connect with local entrepreneurs, and grow your business.'
              : 'Discover amazing products from local township businesses and support your community.'
            }
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-off-white p-6 rounded-xl shadow-3d border border-gray-200 animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
              <div className="flex items-center gap-3 mb-2">
                <Icon className="h-8 w-8 text-warm-orange" />
              </div>
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Features - Only show for entrepreneurs */}
      {userRole === 'entrepreneur' && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Explore Our Platform</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  onClick={() => onViewChange(feature.link)}
                  className="bg-off-white p-6 rounded-xl shadow-3d border border-gray-200 hover:shadow-lg transition-all duration-300 animate-slide-up cursor-pointer hover:border-warm-orange"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                  <div className="flex items-center text-warm-orange mt-3 font-medium">
                    Explore <ChevronRight className="h-4 w-4 ml-1" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Quick Actions - Only show for entrepreneurs (excluding marketplace) */}
      {userRole === 'entrepreneur' && (
        <div className="bg-light-gray p-6 rounded-xl shadow-3d border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  onClick={() => onViewChange(action.link)}
                  className="bg-off-white p-4 rounded-lg shadow-3d hover:shadow-lg transition-all duration-300 text-left border border-gray-200 hover:border-warm-orange"
                >
                  <Icon className="h-8 w-8 text-warm-orange mb-2" />
                  <div className="font-semibold text-gray-800">{action.title}</div>
                  <div className="text-gray-600 text-sm">{action.description}</div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Recent Activity - Role-based content */}
      <div className="bg-off-white p-6 rounded-xl shadow-3d border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          {userRole === 'entrepreneur' ? 'Recent Activity' : 'Latest Updates'}
        </h2>
        <div className="space-y-3">
          {userRole === 'entrepreneur' ? (
            // Entrepreneur-focused activity
            <>
              <div className="flex items-center gap-3 p-3 bg-light-gray rounded-lg">
                <div className="w-2 h-2 bg-warm-orange rounded-full"></div>
                <div className="flex-1">
                  <div className="font-medium text-gray-800">New business registered in Soweto</div>
                  <div className="text-sm text-gray-600">2 hours ago</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-light-gray rounded-lg">
                <div className="w-2 h-2 bg-warm-orange rounded-full"></div>
                <div className="flex-1">
                  <div className="font-medium text-gray-800">Marketplace updated with new products</div>
                  <div className="text-sm text-gray-600">4 hours ago</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-light-gray rounded-lg">
                <div className="w-2 h-2 bg-warm-orange rounded-full"></div>
                <div className="flex-1">
                  <div className="font-medium text-gray-800">Financial workshop scheduled for next week</div>
                  <div className="text-sm text-gray-600">1 day ago</div>
                </div>
              </div>
            </>
          ) : (
            // Buyer-focused activity
            <>
              <div className="flex items-center gap-3 p-3 bg-light-gray rounded-lg">
                <div className="w-2 h-2 bg-warm-orange rounded-full"></div>
                <div className="flex-1">
                  <div className="font-medium text-gray-800">New handmade crafts available in your area</div>
                  <div className="text-sm text-gray-600">1 hour ago</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-light-gray rounded-lg">
                <div className="w-2 h-2 bg-warm-orange rounded-full"></div>
                <div className="flex-1">
                  <div className="font-medium text-gray-800">Special weekend deals on fresh produce</div>
                  <div className="text-sm text-gray-600">3 hours ago</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-light-gray rounded-lg">
                <div className="w-2 h-2 bg-warm-orange rounded-full"></div>
                <div className="flex-1">
                  <div className="font-medium text-gray-800">Popular street food vendors near you</div>
                  <div className="text-sm text-gray-600">5 hours ago</div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
