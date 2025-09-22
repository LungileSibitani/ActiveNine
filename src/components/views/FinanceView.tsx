import React, { useState } from 'react';
import { 
  CreditCard,
  DollarSign,
  FileText,
  Shield,
  Banknote,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Calculator,
  PiggyBank,
  Building2
} from 'lucide-react';

interface FinancialProduct {
  id: string;
  name: string;
  provider: string;
  type: 'loan' | 'insurance' | 'savings' | 'payment';
  description: string;
  features: string[];
  requirements: string[];
  amount: string;
  interestRate?: string;
  term?: string;
  fee?: string;
  processingTime: string;
  rating: number;
  popularity: 'high' | 'medium' | 'low';
}

export default function FinanceView() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showApplication, setShowApplication] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<FinancialProduct | null>(null);

  const financialProducts: FinancialProduct[] = [
    {
      id: '1',
      name: 'Township Business Starter Loan',
      provider: 'Teba Bank',
      type: 'loan',
      description: 'Quick business loans designed specifically for township entrepreneurs with minimal paperwork.',
      features: ['No collateral required up to R50,000', 'Flexible repayment terms', 'Quick approval process'],
      requirements: ['Valid ID document', 'Proof of business activity', 'Bank statements (3 months)'],
      amount: 'R5,000 - R200,000',
      interestRate: '18% - 24% p.a.',
      term: '6 - 60 months',
      processingTime: '3-5 business days',
      rating: 4.2,
      popularity: 'high'
    },
    {
      id: '2',
      name: 'Mobile Money Business Account',
      provider: 'MTN MoMo Business',
      type: 'payment',
      description: 'Accept payments from customers via mobile money, no smartphone required.',
      features: ['Accept mobile payments', 'Instant notifications', 'Low transaction fees'],
      requirements: ['Valid ID', 'Business registration or affidavit', 'Cellphone number'],
      amount: 'No minimum balance',
      fee: '1.5% per transaction',
      processingTime: 'Same day activation',
      rating: 4.6,
      popularity: 'high'
    },
    {
      id: '3',
      name: 'Stokvels Investment Plan',
      provider: 'African Bank',
      type: 'savings',
      description: 'Traditional stokvels with modern banking features and guaranteed returns.',
      features: ['Group savings management', 'Competitive interest rates', 'Mobile app access'],
      requirements: ['Minimum 5 members', 'Valid ID documents', 'Group constitution'],
      amount: 'R100 - R10,000 per month',
      interestRate: '8.5% p.a.',
      processingTime: '1-2 weeks',
      rating: 4.4,
      popularity: 'medium'
    },
    {
      id: '4',
      name: 'Business Insurance Cover',
      provider: 'Santam',
      type: 'insurance',
      description: 'Comprehensive business insurance for stock, equipment, and public liability.',
      features: ['Stock and equipment cover', 'Public liability', 'Business interruption'],
      requirements: ['Business registration', 'Stock valuation', 'Premises details'],
      amount: 'R50 - R5,000 per month',
      processingTime: '2-3 business days',
      rating: 4.1,
      popularity: 'medium'
    },
    {
      id: '5',
      name: 'Youth Enterprise Development Fund',
      provider: 'NYDA',
      type: 'loan',
      description: 'Government-backed loans for young entrepreneurs aged 18-35.',
      features: ['Subsidized interest rates', 'Business mentorship included', 'Up to 100% financing'],
      requirements: ['Age 18-35', 'South African citizen', 'Business plan', 'Training completion'],
      amount: 'R1,000 - R1,000,000',
      interestRate: '5% - 15% p.a.',
      term: '12 - 84 months',
      processingTime: '4-8 weeks',
      rating: 4.7,
      popularity: 'high'
    },
    {
      id: '6',
      name: 'SnapScan QR Payments',
      provider: 'SnapScan',
      type: 'payment',
      description: 'Accept card and app payments instantly with QR codes.',
      features: ['Instant payments', 'No monthly fees', 'Daily payouts'],
      requirements: ['Smartphone or tablet', 'Bank account', 'Business registration'],
      amount: 'No transaction limits',
      fee: '3.5% per transaction',
      processingTime: 'Instant activation',
      rating: 4.3,
      popularity: 'high'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Services', icon: DollarSign },
    { id: 'loan', name: 'Business Loans', icon: Banknote },
    { id: 'payment', name: 'Payment Solutions', icon: CreditCard },
    { id: 'savings', name: 'Savings & Investment', icon: PiggyBank },
    { id: 'insurance', name: 'Insurance', icon: Shield },
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? financialProducts 
    : financialProducts.filter(product => product.type === selectedCategory);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'loan': return 'bg-blue-100 text-blue-700';
      case 'payment': return 'bg-orange-100 text-warm-orange';
      case 'savings': return 'bg-purple-100 text-purple-700';
      case 'insurance': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'loan': return Banknote;
      case 'payment': return CreditCard;
      case 'savings': return PiggyBank;
      case 'insurance': return Shield;
      default: return DollarSign;
    }
  };

  const handleApply = (product: FinancialProduct) => {
    setSelectedProduct(product);
    setShowApplication(true);
  };

  if (showApplication && selectedProduct) {
    return (
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => setShowApplication(false)}
          className="mb-6 text-warm-orange hover:text-orange-400 flex items-center gap-2 transition-all duration-300"
        >
          ← Back to Financial Services
        </button>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Apply for {selectedProduct.name}
          </h2>
          
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-blue-800 mb-1">Application Process</h3>
                <p className="text-blue-700 text-sm">
                  This will redirect you to {selectedProduct.provider}'s secure application page. 
                  Make sure you have all required documents ready.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Required Documents</h3>
              <ul className="space-y-2">
                {selectedProduct.requirements.map((req, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="h-4 w-4 text-warm-orange" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Key Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-600">Amount</div>
                  <div className="font-semibold">{selectedProduct.amount}</div>
                </div>
                {selectedProduct.interestRate && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-600">Interest Rate</div>
                    <div className="font-semibold">{selectedProduct.interestRate}</div>
                  </div>
                )}
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-600">Processing Time</div>
                  <div className="font-semibold">{selectedProduct.processingTime}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-600">Provider</div>
                  <div className="font-semibold">{selectedProduct.provider}</div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button className="flex-1 bg-warm-orange text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-400 transition-all duration-300 shadow-3d hover:shadow-lg transform hover:scale-105 flex items-center justify-center gap-2">
                Continue to Application
                <ArrowRight className="h-5 w-5" />
              </button>
              <button
                onClick={() => setShowApplication(false)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Financial Services</h1>
        <p className="text-gray-600">Access funding, payments, and financial tools for your business</p>
      </div>

      {/* Categories */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="font-semibold text-gray-800 mb-4">Service Categories</h2>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = selectedCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  isActive
                    ? 'border-warm-orange bg-orange-50 text-warm-orange'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                } text-center shadow-3d hover:shadow-lg transform hover:scale-105`}
              >
                <Icon className="h-8 w-8 mx-auto mb-2" />
                <div className="font-medium text-sm">{category.name}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Product */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between">
          <div className="flex-1 mb-6 lg:mb-0">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-yellow-400 text-blue-900 px-3 py-1 rounded-full text-sm font-semibold">
                🔥 Most Popular
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-2">Youth Enterprise Development Fund</h3>
            <p className="text-blue-100 mb-4">
              Get up to R1 million in funding with subsidized interest rates and free business mentorship. 
              Designed specifically for young South African entrepreneurs.
            </p>
            <div className="flex flex-wrap gap-4 text-blue-100">
              <div>✓ 5-15% interest rate</div>
              <div>✓ Up to 84 months repayment</div>
              <div>✓ Free mentorship program</div>
            </div>
          </div>
          <button
            onClick={() => handleApply(financialProducts.find(p => p.id === '5')!)}
            className="bg-white text-warm-orange px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-all duration-300 shadow-3d hover:shadow-lg transform hover:scale-105 flex items-center gap-2 lg:ml-8"
          >
            Apply Now
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Financial Calculator */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <Calculator className="h-6 w-6 text-warm-orange" />
          <h2 className="font-semibold text-gray-800">Loan Calculator</h2>
        </div>
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Loan Amount (R)</label>
            <input
              type="number"
              placeholder="50000"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-warm-orange focus:border-warm-orange transition-all duration-300 shadow-inner-3d"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate (%)</label>
            <input
              type="number"
              placeholder="20"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Term (months)</label>
            <input
              type="number"
              placeholder="24"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-end">
            <button className="w-full bg-warm-orange text-white p-3 rounded-lg font-semibold hover:bg-orange-400 transition-all duration-300 shadow-3d hover:shadow-lg transform hover:scale-105">
              Calculate
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-800">
            {selectedCategory === 'all' ? 'All Financial Services' : categories.find(c => c.id === selectedCategory)?.name}
          </h2>
          <div className="text-sm text-gray-600">{filteredProducts.length} options available</div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {filteredProducts.map((product) => {
            const TypeIcon = getTypeIcon(product.type);
            return (
              <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <TypeIcon className="h-6 w-6 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{product.name}</h3>
                        <p className="text-sm text-gray-600">{product.provider}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {product.popularity === 'high' && (
                        <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full">
                          Popular
                        </span>
                      )}
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${getTypeColor(product.type)}`}>
                        {product.type.charAt(0).toUpperCase() + product.type.slice(1)}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 text-sm mb-4">{product.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Key Features</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {product.features.slice(0, 3).map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-warm-orange" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-600">Amount</div>
                        <div className="font-semibold text-gray-800">{product.amount}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Processing</div>
                        <div className="font-semibold text-gray-800">{product.processingTime}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-1">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <div
                            key={star}
                            className={`h-4 w-4 ${
                              star <= product.rating ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                          >
                            ★
                          </div>
                        ))}
                      </div>
                      <span className="text-sm font-semibold text-gray-800">{product.rating}</span>
                    </div>
                    
                    <button
                      onClick={() => handleApply(product)}
                      className="bg-warm-orange text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-400 transition-all duration-300 shadow-3d hover:shadow-lg transform hover:scale-105 flex items-center gap-2"
                    >
                      Apply Now
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-yellow-50 p-6 rounded-xl">
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-yellow-600" />
          Financial Health Tips
        </h3>
        <ul className="space-y-2 text-gray-700">
          <li>• Only borrow what you need and can afford to repay</li>
          <li>• Compare interest rates and terms from different providers</li>
          <li>• Keep good business records to improve your credit profile</li>
          <li>• Consider starting with smaller amounts to build your credit history</li>
          <li>• Always read the fine print before signing any agreement</li>
        </ul>
      </div>
    </div>
  );
}