"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useGameStore } from '@/lib/stores/game-store';
import { usePathname, useRouter } from 'next/navigation';

const menuItems = [
  { label: 'PLAY' , href: 0 },
  { label: 'ABOUT', href: 1 },
  { label: 'SKILLS', href: 2 },
  { label: 'PROJECTS', href: 3 },
  { label: 'CONTACT', href: 4 }
];

// const mobileURL = {
//   PLAY: '#hero',
//   ABOUT: '#about',
//   SKILLS: '#skills',
//   PROJECTS: '#projects',
//   CONTACT: '#contact'
// }

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { startGame, gameState } = useGameStore();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsScrolled(window.scrollY > 50);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleResize);
    };
  }, []);

  const handleNavigation = (index: number) => {
    if (pathname === '/') {
      const emblaApi = (window as any).emblaApi;
      if (emblaApi) {
        emblaApi.scrollTo(index);
        if (index === 0) {
          startGame();
        }
      }
    } else {
      router.push('/');
      // Add a small delay to allow for the navigation to complete
      setTimeout(() => {
        const emblaApi = (window as any).emblaApi;
        if (emblaApi) {
          emblaApi.scrollTo(index);
          if (index === 0) {
            startGame();
          }
        }
      }, 100);
    }
    setIsMobileMenuOpen(false);
  };

  // Hide header on mobile during gameplay
  // if (isMobile && gameState === 'playing') {
  //   return null;
  // }

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-24">
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-foreground hover:bg-primary/5"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center justify-center flex-1 space-x-12">
            {menuItems.map((item, index) => (
              <motion.button
                key={item.label}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`text-sm tracking-[0.2em] font-medium transition-all duration-300 hover:text-primary hover:scale-110 ${
                  isScrolled ? 'text-foreground' : 'text-foreground/80'
                }`}
                onClick={() => handleNavigation(item.href)}
              >
                {item.label}
              </motion.button>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-lg border-t border-primary/10"
          >
            <nav className="px-4 py-2">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  className="block w-full text-left px-4 py-3 text-sm tracking-[0.2em] font-medium text-foreground hover:text-primary transition-colors"
                  onClick={() => handleNavigation(item.href)}
                  onTouchEnd={() => handleNavigation(item.href)}
                >
                  {isMobile && item.label==='PLAY' ? 'HOME' :item.label}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}