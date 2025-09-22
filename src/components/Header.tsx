import React from 'react';
import { Menu, User, Home, LogOut } from 'lucide-react';

interface HeaderProps {
  currentView: string;
  onMenuToggle: () => void;
  user: {
    isLoggedIn: boolean;
    role: 'buyer' | 'entrepreneur' | null;
    name: string;
  };
  onLogout: () => void;
  onHome: () => void;
  showLogoutButton?: boolean;
}

export default function Header({ currentView, onMenuToggle, user, onLogout, onHome, showLogoutButton = true }: HeaderProps) {

  const getViewTitle = (view: string) => {
    switch (view) {
      case 'home': return 'Dintshang?';
      case 'business': return 'My Business';
      case 'marketplace': return 'Marketplace';
      case 'tools': return 'Business Tools';
      case 'learn': return 'Learning Centre';
      case 'finance': return 'Financial Services';
      default: return 'Dintshang?';
    }
  };

  const getRoleDisplay = (role: 'buyer' | 'entrepreneur' | null) => {
    switch (role) {
      case 'buyer': return 'Buyer';
      case 'entrepreneur': return 'Entrepreneur';
      default: return '';
    }
  };

  const handleButtonClick = () => {
    if (showLogoutButton) {
      onLogout();
    } else {
      onHome();
    }
  };

  return (
    <header className="bg-navy-dark text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onMenuToggle}
              className="p-2 rounded-lg hover:bg-orange-400 transition-all duration-300 lg:hidden shadow-3d hover:shadow-lg transform hover:scale-105"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center font-bold text-warm-orange">
                D?
              </div>
              <h1 className="text-xl font-bold hidden sm:block">
                {getViewTitle(currentView)}
              </h1>
            </div>
          </div>

          {/* User Info and Action Button */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-sm">
              <User className="h-4 w-4" />
              <span className="font-medium">{user.name}</span>
              <span className="text-orange-300">({getRoleDisplay(user.role)})</span>
            </div>
            <button
              onClick={handleButtonClick}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-orange-400 transition-all duration-300 shadow-3d hover:shadow-lg transform hover:scale-105"
              title={showLogoutButton ? "Logout" : "Back to Landing"}
            >
              {showLogoutButton ? (
                <>
                  <LogOut className="h-5 w-5" />
                  <span className="hidden sm:inline text-sm font-medium">Logout</span>
                </>
              ) : (
                <>
                  <Home className="h-5 w-5" />
                  <span className="hidden sm:inline text-sm font-medium">Home</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
