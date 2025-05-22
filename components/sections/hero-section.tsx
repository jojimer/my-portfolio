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
  const { gameState } = isMobile ? {gameState: 'gameover'} : useGameStore();

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // const scrollToContact = () => {
  //   const contactSection = document.getElementById('contact');
  //   if (contactSection) {
  //     contactSection.scrollIntoView({ behavior: 'smooth' });
  //   }
  // };

  return (
    <section className="relative h-screen w-screen overflow-hidden">
      <div className={`absolute inset-0 w-full`}>
        { !isMobile && (<GameCanvas />)}
        { isMobile && (
          <div id="hero-text-wrap" className="absolute gap-4 inset-0 w-screen h-screen overflow-hidden flex items-center justify-center flex-col bg-gray-900 text-white">
            <div className="flex flex-col gap-6">
              <h1 className="text-white inline-flex font-bold text-3xl w-10/12 mx-auto text-center flex-col align-top">
              <span className='inline-flex justify-center'><Lightbulb className='mr-1 h-10 w-auto' />Helping Startups</span> Transform Ideas into Powerful WebApps
              </h1>
              <div className="flex justify-center h-3/4"><Lottie animationData={ animationData } /></div>
              <p className="text-white text-md font-weight-light w-10/12 mx-auto text-center">
                I'm a Fullstack Developer crafting modern web applications using React, Next.js, and TypeScript.
              </p>
            </div>
            {/* <Button 
              variant="outline"
              size="lg"
              onClick={scrollToContact}
              className="text-sm tracking-[0.2em] font-medium transition-all duration-300 hover:text-primary hover:scale-110 text-foreground/80"
            >
              <Mail className="mr-2 h-4 w-4" />
              CONTACT
            </Button> */}
          </div>	
        )}
      </div>
      
      {gameState !== 'gameover' || isMobile && (
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