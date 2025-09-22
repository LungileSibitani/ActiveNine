import React, { useState, useMemo } from 'react';
import { User as UserIcon, Briefcase, Box, CreditCard, Trash2, Edit2, Plus, Settings, Shield } from 'lucide-react';
import type { User, Business, Product, FinancialService } from '../../types';

// Lightweight mock data generators
const makeId = (prefix = '') => prefix + Math.random().toString(36).slice(2, 9);

// Enhanced mock data with buyers, entrepreneurs, and their businesses
const initialUsers: User[] = [
  // Entrepreneurs (Business Owners)
  { id: 'u_1', name: 'Tebogo Makhubela', email: 'tebogo@example.com', phone: '0810000000', location: 'Pretoria', township: 'Soshanguve', isBusiness: true, businessId: 'b_1' },
  { id: 'u_2', name: 'Thabo Molefe', email: 'thabo@example.com', phone: '0821111111', location: 'Johannesburg', township: 'Alexandra', isBusiness: true, businessId: 'b_2' },
  { id: 'u_3', name: 'Nomsa Dlamini', email: 'nomsa@example.com', phone: '0832222222', location: 'Soweto', township: 'Orlando', isBusiness: true, businessId: 'b_3' },
  { id: 'u_4', name: 'Sipho Nkosi', email: 'sipho@example.com', phone: '0843333333', location: 'Tembisa', township: 'Tembisa', isBusiness: true, businessId: 'b_4' },
  { id: 'u_5', name: 'Lerato Mahlangu', email: 'lerato@example.com', phone: '0854444444', location: 'Pretoria', township: 'Mamelodi', isBusiness: true, businessId: 'b_5' },

  // Buyers (Customers)
  { id: 'u_6', name: 'Kamo Selepe', email: 'kamo@example.com', phone: '0820000000', location: 'Pretoria', township: 'Atteridgeville', isBusiness: false },
  { id: 'u_7', name: 'Zinhle Mthembu', email: 'zinhle@example.com', phone: '0865555555', location: 'Johannesburg', township: 'Diepkloof', isBusiness: false },
  { id: 'u_8', name: 'Bongani Zulu', email: 'bongani@example.com', phone: '0876666666', location: 'Soweto', township: 'Meadowlands', isBusiness: false },
  { id: 'u_9', name: 'Precious Khumalo', email: 'precious@example.com', phone: '0887777777', location: 'Tembisa', township: 'Tembisa', isBusiness: false },
  { id: 'u_10', name: 'Mandla Ndlovu', email: 'mandla@example.com', phone: '0898888888', location: 'Pretoria', township: 'Soshanguve', isBusiness: false },
  { id: 'u_11', name: 'Nokuthula Mbatha', email: 'nokuthula@example.com', phone: '0819999999', location: 'Johannesburg', township: 'Alexandra', isBusiness: false },
  { id: 'u_12', name: 'Sibusiso Ngcobo', email: 'sibusiso@example.com', phone: '0821234567', location: 'Soweto', township: 'Orlando', isBusiness: false },
];

const initialBusinesses: Business[] = [
  {
    id: 'b_1',
    name: 'Tebogo Groceries',
    owner: 'Tebogo Makhubela',
    description: 'Local convenience store offering fresh produce, groceries, and household items',
    category: 'Retail',
    location: 'Pretoria',
    township: 'Soshanguve',
    phone: '0810000000',
    products: [
      { id: 'p_1', name: 'Mealie Meal', description: '2kg maize meal - premium quality', price: 49.99, category: 'Groceries', inStock: true, images: [] },
      { id: 'p_2', name: 'Fresh Bread', description: 'Daily baked brown bread', price: 15.99, category: 'Bakery', inStock: true, images: [] },
      { id: 'p_3', name: 'Cooking Oil', description: '5L sunflower oil', price: 89.99, category: 'Groceries', inStock: true, images: [] }
    ],
    services: [],
    images: [],
    isVerified: true,
    rating: 4.6,
    reviewCount: 14,
    createdAt: new Date('2024-01-15'),
    isOnline: true,
  },
  {
    id: 'b_2',
    name: 'Thabo Auto Repairs',
    owner: 'Thabo Molefe',
    description: 'Professional automotive repair and maintenance services',
    category: 'Automotive',
    location: 'Johannesburg',
    township: 'Alexandra',
    phone: '0821111111',
    products: [],
    services: [
      { id: 's_1', name: 'Oil Change', description: 'Complete oil and filter change', price: 350.00, category: 'Maintenance', duration: '1 hour' }
    ],
    images: [],
    isVerified: true,
    rating: 4.8,
    reviewCount: 23,
    createdAt: new Date('2024-02-20'),
    isOnline: true,
  },
  {
    id: 'b_3',
    name: 'Nomsa Hair Salon',
    owner: 'Nomsa Dlamini',
    description: 'Modern hair styling and beauty services for all occasions',
    category: 'Beauty & Personal Care',
    location: 'Soweto',
    township: 'Orlando',
    phone: '0832222222',
    products: [
      { id: 'p_4', name: 'Hair Extensions', description: 'Premium quality hair extensions', price: 299.99, category: 'Beauty', inStock: true, images: [] }
    ],
    services: [
      { id: 's_2', name: 'Hair Wash & Style', description: 'Complete hair wash, treatment and styling', price: 150.00, category: 'Hair Care', duration: '2 hours' }
    ],
    images: [],
    isVerified: true,
    rating: 4.9,
    reviewCount: 31,
    createdAt: new Date('2024-01-10'),
    isOnline: true,
  },
  {
    id: 'b_4',
    name: 'Sipho Electronics',
    owner: 'Sipho Nkosi',
    description: 'Electronics repair and sales - phones, computers, and accessories',
    category: 'Electronics',
    location: 'Tembisa',
    township: 'Tembisa',
    phone: '0843333333',
    products: [
      { id: 'p_5', name: 'Phone Charger', description: 'Universal USB phone charger', price: 79.99, category: 'Electronics', inStock: true, images: [] },
      { id: 'p_6', name: 'Screen Protector', description: 'Tempered glass screen protector', price: 49.99, category: 'Electronics', inStock: false, images: [] }
    ],
    services: [
      { id: 's_3', name: 'Phone Repair', description: 'Screen and battery replacement services', price: 200.00, category: 'Repair', duration: '3 hours' }
    ],
    images: [],
    isVerified: false,
    rating: 4.2,
    reviewCount: 8,
    createdAt: new Date('2024-03-05'),
    isOnline: true,
  },
  {
    id: 'b_5',
    name: 'Lerato Catering',
    owner: 'Lerato Mahlangu',
    description: 'Traditional and modern catering services for events and functions',
    category: 'Food & Catering',
    location: 'Pretoria',
    township: 'Mamelodi',
    phone: '0854444444',
    products: [
      { id: 'p_7', name: 'Traditional Dish', description: 'Ready-to-eat traditional meal', price: 65.99, category: 'Food', inStock: true, images: [] },
      { id: 'p_8', name: 'Event Platter', description: 'Party platter for 20 people', price: 450.00, category: 'Catering', inStock: true, images: [] }
    ],
    services: [
      { id: 's_4', name: 'Event Catering', description: 'Full catering service for events up to 100 people', price: 2500.00, category: 'Catering', duration: '1 day' }
    ],
    images: [],
    isVerified: true,
    rating: 4.7,
    reviewCount: 19,
    createdAt: new Date('2024-02-01'),
    isOnline: false,
  }
];

const initialProducts: Product[] = [
  { id: 'p_1', name: 'Mealie Meal', description: '2kg maize meal - premium quality', price: 49.99, category: 'Groceries', inStock: true, images: [] },
  { id: 'p_2', name: 'Fresh Bread', description: 'Daily baked brown bread', price: 15.99, category: 'Bakery', inStock: true, images: [] },
  { id: 'p_3', name: 'Cooking Oil', description: '5L sunflower oil', price: 89.99, category: 'Groceries', inStock: true, images: [] },
  { id: 'p_4', name: 'Hair Extensions', description: 'Premium quality hair extensions', price: 299.99, category: 'Beauty', inStock: true, images: [] },
  { id: 'p_5', name: 'Phone Charger', description: 'Universal USB phone charger', price: 79.99, category: 'Electronics', inStock: true, images: [] },
  { id: 'p_6', name: 'Screen Protector', description: 'Tempered glass screen protector', price: 49.99, category: 'Electronics', inStock: false, images: [] },
  { id: 'p_7', name: 'Traditional Dish', description: 'Ready-to-eat traditional meal', price: 65.99, category: 'Food', inStock: true, images: [] },
  { id: 'p_8', name: 'Event Platter', description: 'Party platter for 20 people', price: 450.00, category: 'Catering', inStock: true, images: [] },
];

const initialFinancialServices: FinancialService[] = [
  { id: 'f_1', name: 'Small Business Loan', type: 'loan', provider: 'Local Bank', description: 'Short term business loans up to R50,000', requirements: ['ID', 'Proof of business', 'Bank statements'], maxAmount: 50000, interestRate: 12, term: '12 months' },
  { id: 'f_2', name: 'Equipment Finance', type: 'loan', provider: 'Township Finance Co', description: 'Finance for business equipment and machinery', requirements: ['ID', 'Business plan', 'Quotes'], maxAmount: 150000, interestRate: 15, term: '24 months' },
  { id: 'f_3', name: 'Working Capital', type: 'loan', provider: 'Community Bank', description: 'Working capital loans for daily operations', requirements: ['ID', '3 months bank statements'], maxAmount: 25000, interestRate: 18, term: '6 months' },
  { id: 'f_4', name: 'Business Insurance', type: 'insurance', provider: 'SecureLife', description: 'Comprehensive business insurance coverage', requirements: ['Business registration', 'ID'], maxAmount: 0, interestRate: 0, term: '12 months' },
];

interface AdminDashboardProps {
  onViewChange: (view: string) => void;
}

export default function AdminDashboard({ onViewChange }: AdminDashboardProps) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [businesses, setBusinesses] = useState<Business[]>(initialBusinesses);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [financialServices, setFinancialServices] = useState<FinancialService[]>(initialFinancialServices);
  const [filter, setFilter] = useState('all');
  const [selectedTab, setSelectedTab] = useState('analytics');


  // Derived counts
  const stats = useMemo(() => ({
    users: users.length,
    businesses: businesses.length,
    products: businesses.reduce((total, business) => total + business.products.length, 0) + products.length,
    finance: financialServices.length,
  }), [users, businesses, products, financialServices]);

  // CRUD actions (local state only)
  const addUser = (u: Partial<User>) => {
    const newUser: User = { id: makeId('u_'), name: u.name || 'New User', email: u.email || '', phone: u.phone || '', location: u.location || '', township: u.township || '', isBusiness: !!u.isBusiness, businessId: u.businessId };
    setUsers((s) => [newUser, ...s]);
  };

  const removeUser = (id: string) => setUsers((s) => s.filter((u) => u.id !== id));

  const addBusiness = (b: Partial<Business>) => {
    const newB: Business = {
      id: makeId('b_'),
      name: b.name || 'New Business',
      owner: b.owner || 'Owner',
      description: b.description || '',
      category: b.category || 'General',
      location: b.location || '',
      township: b.township || '',
      phone: b.phone || '',
      products: [],
      services: [],
      images: [],
      isVerified: false,
      rating: 0,
      reviewCount: 0,
      createdAt: new Date(),
      isOnline: false,
    };
    setBusinesses((s) => [newB, ...s]);
  };

  const addProduct = (p: Partial<Product>) => {
    const newP: Product = { id: makeId('p_'), name: p.name || 'New Product', description: p.description || '', price: p.price || 0, category: p.category || 'General', inStock: p.inStock ?? true, images: p.images || [] };
    setProducts((s) => [newP, ...s]);
  };

  const toggleVerifyBusiness = (id: string) => setBusinesses((s) => s.map(b => b.id === id ? { ...b, isVerified: !b.isVerified } : b));

  return (
    <div className="min-h-screen bg-custom-gradient">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onViewChange('landing')}
              className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
            >
              <Settings className="h-5 w-5" />
              Back to Landing
            </button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-warm-orange text-white rounded-full flex items-center justify-center text-xl font-bold shadow-3d">
                AD
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Admin Dashboard</h2>
                <p className="text-orange-100">Manage users, businesses, products and services</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="grid grid-cols-4 gap-3">
              <StatCard label="Users" value={stats.users} icon={<UserIcon />} />
              <StatCard label="Businesses" value={stats.businesses} icon={<Briefcase />} />
              <StatCard label="Products" value={stats.products} icon={<Box />} />
              <StatCard label="Finance" value={stats.finance} icon={<CreditCard />} />
            </div>
          </div>
        </header>



        {/* Tab Navigation */}
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-3d mb-6">
          <div className="flex flex-wrap gap-2 p-4 border-b border-gray-200">
            <button
              onClick={() => setSelectedTab('analytics')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                selectedTab === 'analytics'
                  ? 'bg-warm-orange text-white shadow-3d'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Analytics
            </button>
            <button
              onClick={() => setSelectedTab('users')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                selectedTab === 'users'
                  ? 'bg-warm-orange text-white shadow-3d'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Users
            </button>
            <button
              onClick={() => setSelectedTab('businesses')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                selectedTab === 'businesses'
                  ? 'bg-warm-orange text-white shadow-3d'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Businesses
            </button>
            <button
              onClick={() => setSelectedTab('products')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                selectedTab === 'products'
                  ? 'bg-warm-orange text-white shadow-3d'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Products
            </button>
            <button
              onClick={() => setSelectedTab('finance')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                selectedTab === 'finance'
                  ? 'bg-warm-orange text-white shadow-3d'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Finance
            </button>
          </div>
        </div>

        {/* Content Sections */}
        <section className="bg-white/95 backdrop-blur-sm rounded-xl shadow-3d p-6">
          {selectedTab === 'analytics' && (
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Platform Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Panel title="Active Users">
                  <p className="text-4xl font-bold text-warm-orange">{stats.users}</p>
                  <p className="text-sm text-gray-500">Users registered on the platform</p>
                </Panel>

                <Panel title="Verified Businesses">
                  <p className="text-4xl font-bold text-warm-orange">{businesses.filter(b => b.isVerified).length}</p>
                  <p className="text-sm text-gray-500">Businesses verified by admin</p>
                </Panel>

                <Panel title="Products Listed">
                  <p className="text-4xl font-bold text-warm-orange">{stats.products}</p>
                  <p className="text-sm text-gray-500">Total products in marketplace</p>
                </Panel>
              </div>
            </div>
          )}

          {selectedTab === 'users' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Users</h3>
                <div className="flex items-center gap-3">
                  <input
                    placeholder="Filter by township"
                    value={filter === 'all' ? '' : filter}
                    onChange={(e) => setFilter(e.target.value || 'all')}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-warm-orange"
                  />
                  <button
                    onClick={() => addUser({ name: 'New Admin User' })}
                    className="bg-warm-orange text-white px-4 py-2 rounded-lg hover:bg-orange-400 transition-all duration-300 flex items-center gap-2 shadow-3d hover:shadow-lg transform hover:scale-105"
                  >
                    <Plus className="h-4 w-4" />
                    Add User
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse">
                  <thead>
                    <tr className="text-left text-sm text-gray-600 border-b border-gray-200">
                      <th className="py-3 px-4">Name</th>
                      <th className="py-3 px-4">Email</th>
                      <th className="py-3 px-4">Phone</th>
                      <th className="py-3 px-4">Township</th>
                      <th className="py-3 px-4">Business</th>
                      <th className="py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.filter(u => filter === 'all' || u.township?.toLowerCase().includes(filter.toLowerCase())).map(u => (
                      <tr key={u.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{u.name}</td>
                        <td className="py-3 px-4 text-gray-600">{u.email}</td>
                        <td className="py-3 px-4 text-gray-600">{u.phone}</td>
                        <td className="py-3 px-4 text-gray-600">{u.township}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${u.isBusiness ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                            {u.isBusiness ? 'Business' : 'Customer'}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors" title="Edit">
                              <Edit2 className="h-4 w-4 text-gray-600" />
                            </button>
                            <button
                              onClick={() => removeUser(u.id)}
                              className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {selectedTab === 'businesses' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Businesses</h3>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => addBusiness({ name: 'New Business' })}
                    className="bg-warm-orange text-white px-4 py-2 rounded-lg hover:bg-orange-400 transition-all duration-300 flex items-center gap-2 shadow-3d hover:shadow-lg transform hover:scale-105"
                  >
                    <Plus className="h-4 w-4" />
                    Add Business
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {businesses.map(b => (
                  <div key={b.id} className="p-6 border border-gray-200 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-800 mb-1">{b.name}</h4>
                        <p className="text-sm text-gray-500 mb-2">{b.category} • {b.township}</p>
                        <p className="text-gray-700 mb-3">{b.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>Owner: {b.owner}</span>
                          <span>Rating: {b.rating} ({b.reviewCount} reviews)</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${b.isVerified ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {b.isVerified ? 'Verified' : 'Pending'}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => toggleVerifyBusiness(b.id)}
                            className="px-3 py-1 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors flex items-center gap-1"
                          >
                            <Shield className="h-3 w-3" />
                            {b.isVerified ? 'Unverify' : 'Verify'}
                          </button>
                          <button className="px-3 py-1 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors">
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'products' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Products</h3>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => addProduct({ name: 'New Product', price: 0 })}
                    className="bg-warm-orange text-white px-4 py-2 rounded-lg hover:bg-orange-400 transition-all duration-300 flex items-center gap-2 shadow-3d hover:shadow-lg transform hover:scale-105"
                  >
                    <Plus className="h-4 w-4" />
                    Add Product
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(p => (
                  <div key={p.id} className="p-6 border border-gray-200 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="font-bold text-lg text-gray-800 mb-1">{p.name}</div>
                        <div className="text-sm text-gray-500 mb-2">{p.category}</div>
                        <p className="text-gray-700 mb-3">{p.description}</p>
                        <div className="text-xl font-bold text-warm-orange">R{p.price.toFixed(2)}</div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className={`px-2 py-1 rounded text-xs font-medium ${p.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {p.inStock ? 'In Stock' : 'Out of Stock'}
                        </div>
                        <div className="flex gap-1">
                          <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
                            <Edit2 className="h-4 w-4 text-gray-600" />
                          </button>
                          <button className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'finance' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Financial Services</h3>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setFinancialServices(s => [{
                      id: makeId('f_'),
                      name: 'New Service',
                      type: 'loan',
                      provider: 'Provider',
                      description: '',
                      requirements: [],
                    }, ...s])}
                    className="bg-warm-orange text-white px-4 py-2 rounded-lg hover:bg-orange-400 transition-all duration-300 flex items-center gap-2 shadow-3d hover:shadow-lg transform hover:scale-105"
                  >
                    <Plus className="h-4 w-4" />
                    Add Service
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {financialServices.map(f => (
                  <div key={f.id} className="p-6 border border-gray-200 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="font-bold text-lg text-gray-800 mb-1">{f.name}</div>
                        <div className="text-sm text-gray-500 mb-2">{f.type} • {f.provider}</div>
                        <p className="text-gray-700 mb-3">{f.description}</p>
                        {f.maxAmount && (
                          <div className="text-sm text-gray-600">
                            Max Amount: R{f.maxAmount.toLocaleString()}
                          </div>
                        )}
                        {f.interestRate && (
                          <div className="text-sm text-gray-600">
                            Interest Rate: {f.interestRate}%
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button className="px-3 py-1 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors">
                          Edit
                        </button>
                        <button className="px-3 py-1 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) {
  return (
    <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-4 py-3 text-center">
      <div className="flex items-center justify-center mb-2">
        <div className="p-2 rounded-lg bg-warm-orange/20">
          <div className="text-white">{icon}</div>
        </div>
      </div>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm text-orange-100">{label}</div>
    </div>
  );
}



function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-6 border border-gray-200 rounded-xl bg-white shadow-lg">
      <div className="font-bold text-lg text-gray-800 mb-4">{title}</div>
      <div>{children}</div>
    </div>
  );
}
