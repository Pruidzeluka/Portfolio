import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import CommunityPage from './pages/CommunityPage';
import Toast from './components/common/Toast';

export default function App() {
  // Simple, robust client-side routing ('home' | 'community')
  const [currentPage, setCurrentPage] = useState('home');
  const [toast, setToast] = useState({ isVisible: false, message: '', type: 'success' });

  // Sync with window.location.hash for direct linking/bookmarking
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'community') {
        setCurrentPage('community');
      } else if (hash === '' || hash === 'home' || ['hero', 'about', 'skills', 'projects', 'contact'].includes(hash)) {
        setCurrentPage('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : page;
  };

  const showToast = (message, type = 'success') => {
    setToast({ isVisible: true, message, type });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, isVisible: false }));
    }, 3200);
  };

  return (
    <div className="min-h-screen bg-dark-900 text-gray-100 font-sans selection:bg-accent-cyan/25 selection:text-white relative overflow-x-hidden">
      
      {/* Ambient background glow orbs */}
      <div 
        className="fixed -top-40 -right-40 w-[550px] h-[550px] rounded-full bg-accent-cyan/15 blur-[130px] pointer-events-none z-0 animate-float-slow"
        aria-hidden="true" 
      />
      <div 
        className="fixed top-1/3 -left-40 w-[600px] h-[600px] rounded-full bg-accent-emerald/10 blur-[140px] pointer-events-none z-0 animate-float-slow" 
        style={{ animationDelay: '-5s' }}
        aria-hidden="true" 
      />
      <div 
        className="fixed bottom-10 right-10 w-[500px] h-[500px] rounded-full bg-accent-cyan/10 blur-[130px] pointer-events-none z-0 animate-float-slow" 
        style={{ animationDelay: '-10s' }}
        aria-hidden="true" 
      />

      {/* Sticky Navigation Header */}
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Main Page Content */}
      <main className="relative z-10">
        {currentPage === 'home' ? (
          <HomePage onNavigate={handleNavigate} onShowToast={showToast} />
        ) : (
          <CommunityPage onNavigate={handleNavigate} onShowToast={showToast} />
        )}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Toast Notification Container */}
      <Toast 
        isVisible={toast.isVisible} 
        message={toast.message} 
        type={toast.type} 
      />
    </div>
  );
}

