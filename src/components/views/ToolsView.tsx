import React, { useState } from 'react';
import { 
  Calculator,
  Package,
  TrendingUp,
  Users,
  Calendar,
  FileText,
  CreditCard,
  BarChart3,
  Plus,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import { useOfflineStorage } from '../../hooks/useOfflineStorage';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
  cost: number;
  lowStock: number;
  lastUpdated: Date;
}

interface Sale {
  id: string;
  items: { itemId: string; itemName: string; quantity: number; price: number }[];
  total: number;
  date: Date;
  customer?: string;
}

export default function ToolsView() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [inventory, setInventory] = useOfflineStorage<InventoryItem[]>('inventory', []);
  const [sales, setSales] = useOfflineStorage<Sale[]>('sales', []);
  
  const [showAddItem, setShowAddItem] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    category: '',
    quantity: 0,
    price: 0,
    cost: 0,
    lowStock: 5
  });

  const tools = [
    {
      id: 'calculator',
      name: 'Business Calculator',
      description: 'Calculate profits, expenses, and break-even points',
      icon: Calculator,
      color: 'bg-blue-500'
    },
    {
      id: 'inventory',
      name: 'Inventory Tracker',
      description: 'Manage your stock and track low inventory',
      icon: Package,
      color: 'bg-warm-orange'
    },
    {
      id: 'sales',
      name: 'Sales Tracker',
      description: 'Record sales and track revenue trends',
      icon: TrendingUp,
      color: 'bg-purple-500'
    },
    {
      id: 'customers',
      name: 'Customer Manager',
      description: 'Keep track of your regular customers',
      icon: Users,
      color: 'bg-orange-500'
    },
    {
      id: 'scheduler',
      name: 'Appointment Scheduler',
      description: 'Schedule and manage customer appointments',
      icon: Calendar,
      color: 'bg-red-500'
    },
    {
      id: 'invoicing',
      name: 'Simple Invoicing',
      description: 'Create professional invoices for your customers',
      icon: FileText,
      color: 'bg-indigo-500'
    }
  ];

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    const item: InventoryItem = {
      id: Date.now().toString(),
      ...newItem,
      lastUpdated: new Date()
    };
    setInventory([...inventory, item]);
    setNewItem({
      name: '',
      category: '',
      quantity: 0,
      price: 0,
      cost: 0,
      lowStock: 5
    });
    setShowAddItem(false);
  };

  const totalInventoryValue = inventory.reduce((sum, item) => sum + (item.quantity * item.cost), 0);
  const lowStockItems = inventory.filter(item => item.quantity <= item.lowStock);
  const totalSales = sales.reduce((sum, sale) => sum + sale.total, 0);

  const DashboardView = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-off-white p-6 rounded-xl shadow-3d border border-gray-200 animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Package className="h-5 w-5 text-warm-orange" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Inventory Value</h3>
              <p className="text-2xl font-bold text-warm-orange">R{totalInventoryValue.toFixed(2)}</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">{inventory.length} items in stock</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Total Sales</h3>
              <p className="text-2xl font-bold text-purple-600">R{totalSales.toFixed(2)}</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">{sales.length} transactions</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <Package className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Low Stock Alerts</h3>
              <p className="text-2xl font-bold text-red-600">{lowStockItems.length}</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">Items need restocking</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <button
              key={tool.id}
              onClick={() => setActiveTab(tool.id)}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all text-left"
            >
              <div className={`w-12 h-12 ${tool.color} rounded-xl flex items-center justify-center mb-4`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{tool.name}</h3>
              <p className="text-gray-600 text-sm">{tool.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );

  const InventoryView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">Inventory Management</h2>
        <button
          onClick={() => setShowAddItem(true)}
          className="bg-warm-orange text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-400 transition-all duration-300 shadow-3d hover:shadow-lg transform hover:scale-105 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Item
        </button>
      </div>

      {showAddItem && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-4">Add New Item</h3>
          <form onSubmit={handleAddItem} className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
              <input
                type="text"
                required
                value={newItem.name}
                onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-warm-orange focus:border-warm-orange transition-all duration-300 shadow-inner-3d"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <input
                type="text"
                value={newItem.category}
                onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
              <input
                type="number"
                required
                value={newItem.quantity}
                onChange={(e) => setNewItem({...newItem, quantity: parseInt(e.target.value)})}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Selling Price (R)</label>
              <input
                type="number"
                step="0.01"
                required
                value={newItem.price}
                onChange={(e) => setNewItem({...newItem, price: parseFloat(e.target.value)})}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cost Price (R)</label>
              <input
                type="number"
                step="0.01"
                required
                value={newItem.cost}
                onChange={(e) => setNewItem({...newItem, cost: parseFloat(e.target.value)})}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Low Stock Alert</label>
              <input
                type="number"
                value={newItem.lowStock}
                onChange={(e) => setNewItem({...newItem, lowStock: parseInt(e.target.value)})}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div className="md:col-span-2 flex gap-3">
              <button
                type="submit"
                className="bg-warm-orange text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-400 transition-all duration-300 shadow-3d hover:shadow-lg transform hover:scale-105"
              >
                Add Item
              </button>
              <button
                type="button"
                onClick={() => setShowAddItem(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {inventory.length === 0 ? (
          <div className="p-12 text-center">
            <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No items in inventory</h3>
            <p className="text-gray-500">Add your first item to get started</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {inventory.map((item) => (
                  <tr key={item.id} className={item.quantity <= item.lowStock ? 'bg-red-50' : ''}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{item.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{item.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`font-medium ${item.quantity <= item.lowStock ? 'text-red-600' : 'text-gray-900'}`}>
                        {item.quantity}
                      </span>
                      {item.quantity <= item.lowStock && (
                        <span className="ml-2 text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                          Low Stock
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">R{item.price.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">R{(item.quantity * item.cost).toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Business Tools</h1>
        <p className="text-gray-600">Manage your business with our free tools</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'dashboard'
                  ? 'border-warm-orange text-warm-orange'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              } transition-all duration-300`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('inventory')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'inventory'
                  ? 'border-warm-orange text-warm-orange'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              } transition-all duration-300`}
            >
              Inventory
            </button>
            <button
              onClick={() => setActiveTab('sales')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'sales'
                  ? 'border-warm-orange text-warm-orange'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              } transition-all duration-300`}
            >
              Sales
            </button>
          </nav>
        </div>
        
        <div className="p-6">
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'inventory' && <InventoryView />}
          {activeTab === 'sales' && (
            <div className="text-center py-12">
              <TrendingUp className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Sales Tracking</h3>
              <p className="text-gray-500">Sales tracking feature coming soon!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}