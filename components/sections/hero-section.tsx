"use client";

import { GameCanvas } from '@/components/game/game-canvas';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowDownCircle, Lightbulb } from 'lucide-react';
import Lottie from 'lottie-react';
import animationData from '@/public/assets/animation-data.json';
import { useGameStore } from '@/lib/stores/game-store';
import { isMobile } from 'react-device-detect';

export function HeroSection() {
  const { gameState } = useGameStore();

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('btn1');
    if (aboutSection) {
      // aboutSection.scrollIntoView({ behavior: 'smooth' });
      aboutSection.click()
    }
  };

  const scrollToAboutMobile = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen w-screen overflow-hidden">
        { !isMobile && (<div className="absolute inset-0 w-full h-full"><GameCanvas /></div>)}

        { isMobile && (<div className="absolute inset-0 w-full h-full">
          <div id="hero-text-wrap" className="absolute inset-0 w-screen h-screen overflow-hidden flex items-center justify-center flex-col bg-gray-900 text-white">
            <div className="flex flex-col gap-8">
              <h1 className="text-white inline-flex font-bold text-2xl w-10/12 mx-auto text-center flex-col align-top">
                <span className='inline-flex justify-center'><Lightbulb className='mr-1 h-6 w-auto' />Helping Startups</span> Transform Ideas into Powerful WebApps
              </h1>
              <div className="flex justify-center h-3/4 mb-2"><Lottie animationData={ animationData } /></div>
              <p className="text-white text-md font-weight-light w-10/12 mx-auto text-center mb-6">
                I'm a Fullstack Developer crafting modern web applications using React, Next.js, and TypeScript.
              </p>
              <div className="flex justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={scrollToAboutMobile}
                    className="rounded-full bg-transparent backdrop-blur-sm border-primary/50 hover:bg-primary/20"
                  >
                    <ArrowDownCircle className="mr-2 h-4 w-4" />
                    Explore Portfolio
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>	
          </div>
        )}
  
      {gameState !== 'gameover' && (
        <div className={`absolute bottom-6 left-0 right-0 flex justify-center ${isMobile && 'hidden'}`}>
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