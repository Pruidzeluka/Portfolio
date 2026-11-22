import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Users, Code, Sparkles, FolderGit2 } from 'lucide-react';
import Button from '../common/Button';

export default function Navbar({ currentPage, onNavigate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Home', target: 'hero', page: 'home' },
    { label: 'About', target: 'about', page: 'home' },
    { label: 'Skills', target: 'skills', page: 'home' },
    { label: 'Projects', target: 'projects', page: 'home' },
    { label: 'Community', target: null, page: 'community', isNewPage: true },
    { label: 'Contact', target: 'contact', page: 'home' },
  ];

  const handleLinkClick = (link) => {
    setMobileMenuOpen(false);

    if (link.page !== currentPage) {
      onNavigate(link.page);
      if (link.target) {
        setTimeout(() => {
          const el = document.getElementById(link.target);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (link.target) {
      const el = document.getElementById(link.target);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header 
        className={`fixed top-0 inset-x-0 z-40 h-20 transition-all duration-300 ${
          isScrolled 
            ? 'bg-dark-900/90 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/40' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <button 
            onClick={() => handleLinkClick({ page: 'home', target: 'hero' })}
            className="flex items-center gap-2.5 group cursor-pointer text-left"
          >
            <span className="font-mono text-xs font-bold text-accent-cyan bg-accent-cyan/10 border border-accent-cyan/30 px-2 py-1 rounded-lg group-hover:bg-accent-cyan group-hover:text-dark-900 transition-all duration-200">
              &lt;LF&gt;
            </span>
            <span className="text-xl font-extrabold text-white tracking-tight">
              Luka<span className="text-accent-cyan">.dev</span>
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-7">
              {navLinks.map((link) => {
                const isActive = (currentPage === link.page && !link.target) || 
                  (currentPage === 'home' && link.target === 'hero');

                return (
                  <li key={link.label}>
                    <button
                      onClick={() => handleLinkClick(link)}
                      className={`text-sm font-medium transition-colors cursor-pointer relative py-1 ${
                        isActive || (currentPage === link.page && link.isNewPage)
                          ? 'text-white'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {link.label}
                      {link.isNewPage && (
                        <span className="ml-1.5 px-1.5 py-0.5 text-[10px] font-mono bg-accent-emerald/20 text-accent-emerald border border-accent-emerald/30 rounded-md">
                          NEW
                        </span>
                      )}
                      {(currentPage === link.page && link.isNewPage) && (
                        <span className="absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-r from-accent-cyan to-accent-emerald rounded-full" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handleLinkClick({ page: 'home', target: 'contact' })}
            >
              Get In Touch
            </Button>
          </nav>

          {/* Mobile Burger Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-200 hover:text-white hover:border-accent-cyan/40 hover:bg-accent-cyan/10 transition-all duration-200 z-50 cursor-pointer"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-accent-cyan" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation Backdrop */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-dark-900/80 backdrop-blur-md md:hidden animate-in fade-in duration-200"
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer Menu */}
      <div 
        className={`fixed top-20 inset-x-0 z-40 bg-dark-900/98 backdrop-blur-2xl border-b border-accent-cyan/20 shadow-2xl p-6 md:hidden transition-all duration-300 max-h-[calc(100vh-5rem)] overflow-y-auto ${
          mobileMenuOpen ? 'translate-y-0 opacity-100 visible' : '-translate-y-full opacity-0 invisible'
        }`}
      >
        <ul className="flex flex-col gap-2 mb-6">
          {navLinks.map((link) => (
            <li key={link.label}>
              <button
                onClick={() => handleLinkClick(link)}
                className="w-full flex items-center justify-between p-3.5 rounded-xl text-base font-semibold text-gray-300 hover:text-white hover:bg-accent-cyan/10 hover:border hover:border-accent-cyan/25 transition-all text-left cursor-pointer"
              >
                <span>{link.label}</span>
                {link.isNewPage ? (
                  <span className="px-2 py-0.5 text-xs font-mono bg-accent-emerald/20 text-accent-emerald border border-accent-emerald/30 rounded-md">
                    NEW PAGE
                  </span>
                ) : (
                  <ArrowRight className="w-4 h-4 opacity-40" />
                )}
              </button>
            </li>
          ))}
        </ul>

        <div className="pt-4 border-t border-white/10">
          <Button
            variant="primary"
            size="md"
            className="w-full"
            onClick={() => handleLinkClick({ page: 'home', target: 'contact' })}
          >
            Get In Touch
          </Button>
        </div>
      </div>
    </>
  );
}

