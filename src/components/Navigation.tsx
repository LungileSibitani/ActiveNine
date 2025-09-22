import React from 'react';
import {
  Home,
  Store,
  Wrench,
  BookOpen,
  CreditCard,
  ShoppingCart,
  X
} from 'lucide-react';

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
  isOpen: boolean;
  onClose: () => void;
  userRole: 'buyer' | 'entrepreneur' | null;
}

export default function Navigation({ currentView, onViewChange, isOpen, onClose, userRole }: NavigationProps) {
  // Navigation items for buyers
  const buyerNavItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingCart },
  ];

  // Navigation items for entrepreneurs
  const entrepreneurNavItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'business', label: 'My Business', icon: Store },
    { id: 'tools', label: 'Business Tools', icon: Wrench },
    { id: 'learn', label: 'Learning Centre', icon: BookOpen },
    { id: 'finance', label: 'Financial Services', icon: CreditCard },
  ];

  // Choose navigation items based on user role
  const navItems = userRole === 'buyer' ? buyerNavItems : entrepreneurNavItems;

  const handleNavClick = (viewId: string) => {
    onViewChange(viewId);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <nav className={`
        fixed left-0 top-0 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:shadow-none lg:bg-transparent
        w-64 lg:w-auto
      `}>
        <div className="p-4 lg:hidden">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="px-4 pb-4 lg:p-0">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-2 lg:gap-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`
                    flex items-center gap-3 p-3 rounded-lg transition-all duration-200
                    lg:flex-col lg:gap-1 lg:text-center lg:p-4
                    ${isActive
                      ? 'bg-orange-100 text-warm-orange shadow-3d'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                    }
                  `}
                >
                  <Icon className="h-6 w-6 lg:h-8 lg:w-8" />
                  <span className="font-medium text-sm lg:text-xs">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}
