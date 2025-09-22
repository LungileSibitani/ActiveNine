import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import LandingView from './components/views/LandingView';
import HomeView from './components/views/HomeView';
import BusinessView from './components/views/BusinessView';
import MarketplaceView from './components/views/MarketplaceView';
import ToolsView from './components/views/ToolsView';
import LearnView from './components/views/LearnView';
import FinanceView from './components/views/FinanceView';
import LoginView from './components/views/LoginView';
import RegisterView from './components/views/RegisterView';

type UserRole = 'buyer' | 'entrepreneur' | null;

function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<{
    isLoggedIn: boolean;
    role: UserRole;
    name: string;
  }>({
    isLoggedIn: false,
    role: null,
    name: ''
  });

  // Check if user is already logged in on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('dintshang_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setCurrentView('home'); // Skip landing page if already logged in
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('dintshang_user');
      }
    }
  }, []);

  // Register service worker
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    }
  }, []);

  const handleViewChange = (view: string) => {
    setCurrentView(view);
    setIsMenuOpen(false);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogin = (role: UserRole, name: string) => {
    const userData = {
      isLoggedIn: true,
      role: role,
      name: name
    };
    setUser(userData);
    // Save user data to localStorage
    localStorage.setItem('dintshang_user', JSON.stringify(userData));
    setCurrentView('home');
  };

  const handleLogout = () => {
    setUser({
      isLoggedIn: false,
      role: null,
      name: ''
    });
    localStorage.removeItem('dintshang_user');
    setCurrentView('landing');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingView onViewChange={handleViewChange} />;
      case 'home':
        return <HomeView onViewChange={handleViewChange} userRole={user.role} />;
      case 'business':
        return <BusinessView onViewChange={handleViewChange} />;
      case 'marketplace':
        return <MarketplaceView />;
      case 'tools':
        return <ToolsView />;
      case 'learn':
        return <LearnView />;
      case 'finance':
        return <FinanceView />;
      case 'login':
        return <LoginView onViewChange={handleViewChange} onLogin={handleLogin} />;
      case 'register':
        return <RegisterView onViewChange={handleViewChange} onLogin={handleLogin} />;
      default:
        return <LandingView onViewChange={handleViewChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-custom-gradient">
      {/* Hide Header and Navigation completely on login, register, and landing pages */}
      {!['login', 'register', 'landing'].includes(currentView) && (
        <Header
          currentView={currentView}
          onMenuToggle={handleMenuToggle}
          user={user}
          onLogout={handleLogout}
          onHome={handleLogout}
          showLogoutButton={true}
        />
      )}

      <div className="container mx-auto px-4 py-6">
        {/* Hide Navigation completely on login, register, and landing pages */}
        {!['login', 'register', 'landing'].includes(currentView) && (
          <>
            {/* Desktop Navigation */}
            <div className="hidden lg:block mb-8">
              <Navigation
                currentView={currentView}
                onViewChange={handleViewChange}
                isOpen={false}
                onClose={() => {}}
                userRole={user.role}
              />
            </div>

            {/* Mobile Navigation */}
            <div className="lg:hidden">
              <Navigation
                currentView={currentView}
                onViewChange={handleViewChange}
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                userRole={user.role}
              />
            </div>
          </>
        )}

        {/* Main Content */}
        <main className="max-w-7xl mx-auto">
          {renderCurrentView()}
        </main>
      </div>

      {/* Install prompt for PWA */}
      <div id="install-prompt" className="hidden fixed bottom-4 right-4 bg-warm-orange text-white p-4 rounded-lg shadow-lg shadow-3d">
        <div className="flex items-center gap-3">
          <div>
            <div className="font-semibold">Install Dintshang?</div>
            <div className="text-sm text-orange-100">Get the full app experience</div>
          </div>
          <button
            id="install-button"
            className="bg-white text-warm-orange px-3 py-2 rounded font-semibold hover:bg-orange-50 transition-all duration-300 shadow-3d hover:shadow-lg transform hover:scale-105"
          >
            Install
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
