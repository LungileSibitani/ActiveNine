import React, { useState } from 'react';
import {
  Plus,
  Edit,
  Camera,
  MapPin,
  Phone,
  Mail,
  Package,
  Star,
  Eye,
  TrendingUp,
  Store,
  Users
} from 'lucide-react';
import { useOfflineStorage } from '../../hooks/useOfflineStorage';
import type { Business } from '../../types';

interface BusinessViewProps {
  onViewChange: (view: string) => void;
}

export default function BusinessView({ onViewChange }: BusinessViewProps) {
  const [businesses, setBusinesses] = useOfflineStorage<Business[]>('businesses', []);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(
    businesses.length > 0 ? businesses[0] : null
  );
  const [showCreateForm, setShowCreateForm] = useState(businesses.length === 0);

  const [formData, setFormData] = useState({
    name: '',
    owner: '',
    description: '',
    category: '',
    location: '',
    township: '',
    phone: '',
    email: ''
  });

  const categories = [
    'Retail & Shopping',
    'Food & Beverages',
    'Services',
    'Construction',
    'Transportation',
    'Technology',
    'Health & Beauty',
    'Education',
    'Manufacturing',
    'Other'
  ];

  const townships = [
    'Alexandra',
    'Soweto',
    'Mamelodi',
    'Soshanguve',
    'Atteridgeville',
    'Hammanskraal',
    'Ga-Rankuwa',
    'Mabopane',
    'Temba',
    'Other'
  ];

  const handleCreateBusiness = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newBusiness: Business = {
      id: Date.now().toString(),
      ...formData,
      products: [],
      services: [],
      images: [],
      isVerified: false,
      rating: 0,
      reviewCount: 0,
      createdAt: new Date(),
      isOnline: true
    };

    setBusinesses([...businesses, newBusiness]);
    setSelectedBusiness(newBusiness);
    setShowCreateForm(false);
    setFormData({
      name: '',
      owner: '',
      description: '',
      category: '',
      location: '',
      township: '',
      phone: '',
      email: ''
    });
  };

  if (showCreateForm) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-off-white rounded-2xl shadow-3d border border-gray-200 p-8 animate-slide-up">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Your Business Profile</h2>
          
          <form onSubmit={handleCreateBusiness} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Business Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-warm-orange focus:border-warm-orange transition-all duration-300 shadow-inner-3d"
                  placeholder="Enter business name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Owner Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.owner}
                  onChange={(e) => setFormData({...formData, owner: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-warm-orange focus:border-warm-orange transition-all duration-300 shadow-inner-3d"
                  placeholder="Your name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Business Description *
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-warm-orange focus:border-warm-orange transition-all duration-300 shadow-inner-3d"
                placeholder="Describe your business and what you offer"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-warm-orange focus:border-warm-orange transition-all duration-300 shadow-inner-3d"
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Township *
                </label>
                <select
                  required
                  value={formData.township}
                  onChange={(e) => setFormData({...formData, township: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-warm-orange focus:border-warm-orange transition-all duration-300 shadow-inner-3d"
                >
                  <option value="">Select township</option>
                  {townships.map((township) => (
                    <option key={township} value={township}>{township}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Street Address
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-warm-orange focus:border-warm-orange transition-all duration-300 shadow-inner-3d"
                placeholder="Street address or landmark"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-warm-orange focus:border-warm-orange transition-all duration-300 shadow-inner-3d"
                  placeholder="0XX XXX XXXX"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-warm-orange focus:border-warm-orange transition-all duration-300 shadow-inner-3d"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-warm-orange text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-400 transition-all duration-300 shadow-3d hover:shadow-lg transform hover:scale-105"
              >
                Create Business Profile
              </button>
              {businesses.length > 0 && (
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  }

  if (!selectedBusiness) {
    return (
      <div className="text-center py-12">
        <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-800 mb-2">No Business Profile</h3>
        <p className="text-gray-600 mb-6">Create your business profile to get started</p>
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-warm-orange text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-400 transition-all duration-300 inline-flex items-center gap-2 shadow-3d hover:shadow-lg transform hover:scale-105"
        >
          <Plus className="h-5 w-5" />
          Create Business Profile
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Business Header */}
      <div className="bg-off-white rounded-2xl shadow-3d border border-gray-200 p-6 animate-fade-in">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center">
              <Store className="h-8 w-8 text-warm-orange" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{selectedBusiness.name}</h1>
              <p className="text-gray-600">{selectedBusiness.category}</p>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{selectedBusiness.township}</span>
                </div>
                {selectedBusiness.rating > 0 && (
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-semibold">{selectedBusiness.rating}</span>
                    <span className="text-sm text-gray-500">({selectedBusiness.reviewCount})</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Edit className="h-5 w-5" />
          </button>
        </div>
        
        <p className="text-gray-700 mb-4">{selectedBusiness.description}</p>
        
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2 text-gray-600">
            <Phone className="h-4 w-4" />
            <span>{selectedBusiness.phone}</span>
          </div>
          {selectedBusiness.email && (
            <div className="flex items-center gap-2 text-gray-600">
              <Mail className="h-4 w-4" />
              <span>{selectedBusiness.email}</span>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-off-white p-4 rounded-xl shadow-3d border border-gray-200 text-center animate-slide-up">
          <Eye className="h-8 w-8 text-blue-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-800">156</div>
          <div className="text-sm text-gray-600">Profile Views</div>
        </div>
        <div className="bg-off-white p-4 rounded-xl shadow-3d border border-gray-200 text-center animate-slide-up">
          <TrendingUp className="h-8 w-8 text-warm-orange mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-800">12</div>
          <div className="text-sm text-gray-600">Inquiries</div>
        </div>
        <div className="bg-off-white p-4 rounded-xl shadow-3d border border-gray-200 text-center animate-slide-up">
          <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-800">4.6</div>
          <div className="text-sm text-gray-600">Average Rating</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <button className="bg-off-white p-4 rounded-xl shadow-3d border border-gray-200 hover:shadow-lg transition-all duration-300 text-left animate-fade-in">
          <Camera className="h-8 w-8 text-purple-500 mb-3" />
          <div className="font-semibold text-gray-800">Add Photos</div>
          <div className="text-sm text-gray-600">Showcase your products</div>
        </button>

        <button
          onClick={() => onViewChange('tools')}
          className="bg-off-white p-4 rounded-xl shadow-3d border border-gray-200 hover:shadow-lg transition-all duration-300 text-left animate-fade-in"
        >
          <Package className="h-8 w-8 text-blue-500 mb-3" />
          <div className="font-semibold text-gray-800">Manage Inventory</div>
          <div className="text-sm text-gray-600">Track your products</div>
        </button>

        <button className="bg-off-white p-4 rounded-xl shadow-3d border border-gray-200 hover:shadow-lg transition-all duration-300 text-left animate-fade-in">
          <Users className="h-8 w-8 text-warm-orange mb-3" />
          <div className="font-semibold text-gray-800">Customer Reviews</div>
          <div className="text-sm text-gray-600">See what customers say</div>
        </button>

        <button
          onClick={() => onViewChange('marketplace')}
          className="bg-off-white p-4 rounded-xl shadow-3d border border-gray-200 hover:shadow-lg transition-all duration-300 text-left animate-fade-in"
        >
          <TrendingUp className="h-8 w-8 text-warm-orange mb-3" />
          <div className="font-semibold text-gray-800">Boost Visibility</div>
          <div className="text-sm text-gray-600">Get more customers</div>
        </button>
      </div>

      {/* Quick Tips */}
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-xl shadow-3d border border-orange-100">
        <h3 className="font-semibold text-gray-800 mb-3">💡 Tips to Grow Your Business</h3>
        <ul className="space-y-2 text-gray-700">
          <li>• Add high-quality photos of your products or services</li>
          <li>• Keep your contact information up to date</li>
          <li>• Respond quickly to customer inquiries</li>
          <li>• Encourage satisfied customers to leave reviews</li>
        </ul>
      </div>
    </div>
  );
}