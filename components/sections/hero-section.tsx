"use client";

import { GameCanvas } from '@/components/game/game-canvas';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowDownCircle } from 'lucide-react';
import { useGameStore } from '@/lib/stores/game-store';

export function HeroSection() {
  const { gameState } = useGameStore();

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen w-screen overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <GameCanvas />
      </div>
      
      {gameState !== 'gameover' && (
        <div className="absolute bottom-6 left-0 right-0 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <Button
              variant="outline"
              size="lg"
              onClick={scrollToAbout}
              className="rounded-full bg-transparent backdrop-blur-sm border-primary/50 hover:bg-primary/20"
            >
              <ArrowDownCircle className="mr-2 h-4 w-4" />
              Explore Portfolio
            </Button>
          </motion.div>
        </div>
      )}
    </section>
  );
}