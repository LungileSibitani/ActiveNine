import React, { useState } from 'react';
import {
  Search,
  MapPin,
  Star,
  Phone,
  Eye,
  Heart,
  Grid,
  List
} from 'lucide-react';
import { useOfflineStorage } from '../../hooks/useOfflineStorage';
import type { Business } from '../../types';

import Comfort from '../../Comfort.jpg';

export default function MarketplaceView() {
  const [businesses] = useOfflineStorage<Business[]>('businesses', []);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTownship, setSelectedTownship] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Sample businesses with the 8 entrepreneurs using public URLs
  const sampleBusinesses: Business[] = [
    {
      id: '1',
      name: 'Lungile\'s Crafts Corner',
      owner: 'Lungile Sibitane',
      description: 'Sells Fresh and healthy fruits 24/7',
      category: 'Arts & Crafts',
      location: 'Section 12, Main Market',
      township: 'Soweto',
      phone: '071 234 5678',
      email: 'lungile@email.com',
      products: [],
      services: [],
      images: ['/images/Lungile.jpg'],
      isVerified: true,
      rating: 4.9,
      reviewCount: 45,
      createdAt: new Date(),
      isOnline: true
    },
    {
      id: '2',
      name: 'Kamo\'s Fresh',
      owner: 'Kamo Nkosi',
      description: 'Kamo\'s Fresh is a small business located in Ga-Rankuwa, offering coffee and other products. It benefits from the Dintshang Business platform, which has provided valuable visibility, allowing both local residents and new customers to discover this refreshing spot.',
      category: 'Food & Beverages',
      location: 'Ga-Rankuwa',
      township: 'Ga-Rankuwa',
      phone: '082 987 6543',
      products: [],
      services: [],
      images: ['/images/Kamo.jpg'],
      isVerified: true,
      rating: 4.7,
      reviewCount: 32,
      createdAt: new Date(),
      isOnline: true
    },
    {
      id: '3',
      name: 'Kea\'s Boutique store',
      owner: 'Kea Dlamini',
      description: 'Fresh flowers bring smile , harvested from the garden.',
      category: 'Health ',
      location: 'Shop 15, Central Plaza',
      township: 'Alexandra',
      phone: '076 555 1234',
      products: [],
      services: [],
      images: ['/images/Kea.jpg'],
      isVerified: true,
      rating: 4.8,
      reviewCount: 28,
      createdAt: new Date(),
      isOnline: true
    },
    {
      id: '4',
      name: 'Ncebo\'s Energy Drinks',
      owner: 'Ncebo Zulu',
      description: 'Unleash your potential and boost your energy with Ncebo\'s range of refreshing energy drinks, available in Soshanguve Block L.',
      category: ' Beverages',
      location: 'Block L',
      township: 'Soshanguve',
      phone: '073 111 2222',
      products: [],
      services: [],
      images: ['/images/Ncebo.jpg'],
      isVerified: true,
      rating: 4.6,
      reviewCount: 19,
      createdAt: new Date(),
      isOnline: true
    },
    {
      id: '5',
      name: 'Onthatile\'s Catering',
      owner: 'Onthatile Mogale',
      description: 'Delicious catering for all occasions. From weddings to corporate events, we make your event memorable.',
      category: 'Food & Beverages',
      location: 'Section 8, Industrial Area',
      township: 'Atteridgeville',
      phone: '084 333 4444',
      products: [],
      services: [],
      images: ['/images/Onthatile5.jpg'],
      isVerified: false,
      rating: 4.9,
      reviewCount: 41,
      createdAt: new Date(),
      isOnline: true
    },
    {
      id: '6',
      name: 'Rhulane\'s Fresh Water',
      owner: 'Rhulane Mokoena',
      description: '💧 Rhulane\'s Fresh Water – Mabopane 1632 Str At Rhulane\'s Fresh Water, we believe nothing refreshes the body and mind like pure, clean water. Located right here in Mabopane 1632 Str, we proudly serve our community with safe, affordable, and always fresh water. Our customers know us for reliability, friendliness, and quality you can trust. Every drop is handled with care — because your health and hydration matter most. 👉 "Sure Dintshang?" Whether you\'re heading home, going to work, or just passing by, make a stop at Rhulane\'s Fresh Water and quench your thirst the right way. Why choose us? ✅ Fresh & clean water ✅ Affordable prices ✅ Convenient local service in Mabopane ✅ Friendly customer care Stay hydrated, stay healthy — with Rhulane\'s Fresh Water.',
      category: 'Water',
      location: 'Mabopane 1632 Str',
      township: 'Mabopane',
      phone: '072 555 6666',
      products: [],
      services: [],
      images: ['/images/Rhulane.jpg'],
      isVerified: true,
      rating: 4.5,
      reviewCount: 23,
      createdAt: new Date(),
      isOnline: true
    },
    {
      id: '7',
      name: 'Tebogo\'s Internet Cafee',
      owner: 'Tebogo Masemola',
      description: 'Printing and copies services available',
      category: 'Internet Cafee',
      location: 'Shop 22, Fashion Square',
      township: 'Ga-Rankuwa',
      phone: '081 777 8888',
      products: [],
      services: [],
      images: ['/images/Tebogo.jpg'],
      isVerified: true,
      rating: 4.8,
      reviewCount: 37,
      createdAt: new Date(),
      isOnline: true
    },
    {
      id: '8',
      name: 'Comfort\' Jewellary shop',
      owner: 'Comfort',
      description: 'Gold jewelary of all days',
      category: 'Food & Beverages',
      location: 'Stand 45, Market Street',
      township: 'Mabopane',
      phone: '079 999 0000',
      products: [],
      services: [],
      images: [Comfort],
      isVerified: true,
      rating: 4.7,
      reviewCount: 29,
      createdAt: new Date(),
      isOnline: true
    }
  ];

  const allBusinesses = businesses.length > 0 ? businesses : sampleBusinesses;

  const categories = [
    'Arts & Crafts',
    'Food & Beverages',
    'Health & Beauty',
    'Technology',
    'Services',
    'Fashion & Clothing',
    'Retail & Shopping',
    'Construction',
    'Transportation',
    'Education',
    'Manufacturing'
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
    'Temba'
  ];

  const filteredBusinesses = allBusinesses.filter(business => {
    const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         business.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || business.category === selectedCategory;
    const matchesTownship = !selectedTownship || business.township === selectedTownship;

    return matchesSearch && matchesCategory && matchesTownship;
  });

  const BusinessCard = ({ business }: { business: Business }) => (
    <div className={`bg-off-white rounded-xl shadow-3d border border-gray-200 hover:shadow-lg transition-all duration-300 animate-fade-in ${
      viewMode === 'list' ? 'flex gap-4' : ''
    }`}>
      <div className={`${viewMode === 'list' ? 'w-32 h-24' : 'h-48'} bg-gray-200 rounded-t-xl ${
        viewMode === 'list' ? 'rounded-l-xl rounded-tr-none flex-shrink-0' : ''
      } overflow-hidden`}>
        {business.images.length > 0 ? (
          <img
            src={business.images[0]}
            alt={business.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <Eye className="h-8 w-8" />
          </div>
        )}
      </div>

      <div className="p-4 flex-1">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800 mb-1">{business.name}</h3>
            <p className="text-sm text-warm-orange font-medium">{business.category}</p>
          </div>
          <button className="p-1 text-gray-400 hover:text-red-500 transition-colors">
            <Heart className="h-5 w-5" />
          </button>
        </div>

        <p className={`text-gray-600 text-sm mb-3 ${
          viewMode === 'grid' ? 'line-clamp-2' : 'line-clamp-1'
        }`}>
          {business.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <MapPin className="h-4 w-4" />
            <span>{business.township}</span>
            {business.isVerified && (
              <span className="bg-orange-100 text-warm-orange text-xs px-2 py-1 rounded-full">
                Verified
              </span>
            )}
          </div>

          {business.rating > 0 && (
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm font-semibold">{business.rating}</span>
              <span className="text-xs text-gray-500">({business.reviewCount})</span>
            </div>
          )}
        </div>

        <div className="flex gap-2 mt-3">
          <button className="flex-1 bg-warm-orange text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-orange-400 transition-all duration-300 shadow-3d hover:shadow-lg transform hover:scale-105">
            View Details
          </button>
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Phone className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Township Marketplace</h1>
        <p className="text-white">Discover amazing businesses from our community entrepreneurs</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-off-white p-6 rounded-xl shadow-3d border border-gray-200 animate-fade-in">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search businesses, products, or services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-warm-orange focus:border-warm-orange transition-all duration-300 shadow-inner-3d"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-warm-orange focus:border-warm-orange transition-all duration-300 shadow-inner-3d"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <select
              value={selectedTownship}
              onChange={(e) => setSelectedTownship(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-warm-orange focus:border-warm-orange transition-all duration-300 shadow-inner-3d"
            >
              <option value="">All Townships</option>
              {townships.map((township) => (
                <option key={township} value={township}>{township}</option>
              ))}
            </select>

            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 ${viewMode === 'grid' ? 'bg-orange-100 text-warm-orange' : 'text-gray-400 hover:bg-gray-50'} transition-all duration-300`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 ${viewMode === 'list' ? 'bg-orange-100 text-warm-orange' : 'text-gray-400 hover:bg-gray-50'} transition-all duration-300`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-gray-600">
            {filteredBusinesses.length} businesses found
          </p>
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="rating">Sort by Rating</option>
            <option value="name">Sort by Name</option>
            <option value="distance">Sort by Distance</option>
            <option value="newest">Newest First</option>
          </select>
        </div>

        <div className={`grid gap-6 ${
          viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
        }`}>
          {filteredBusinesses.map((business) => (
            <BusinessCard key={business.id} business={business} />
          ))}
        </div>

        {filteredBusinesses.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No businesses found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
