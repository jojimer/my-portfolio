"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/lib/stores/game-store';
import { Button } from '@/components/ui/button';
import { RefreshCcw, Heart, ArrowDownCircle } from 'lucide-react';

export function GameUI() {
  const { 
    gameState, 
    score, 
    highScore, 
    timeLeft,
    gameIteration,
    startGame,
    playerHealth
  } = useGameStore();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('btn1');
    if (aboutSection) {
      // aboutSection.scrollIntoView({ behavior: 'smooth' });
      aboutSection.click()
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none">
      {gameState === 'playing' && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-4 left-0 right-0 flex justify-between px-4 sm:px-8"
        >
          <div className="flex gap-2 sm:gap-4">
            <div className="bg-black/40 backdrop-blur-sm rounded-lg px-2 sm:px-4 py-2 text-primary flex items-center">
              <span className="text-lg sm:text-xl font-bold mr-1 sm:mr-2">Score:</span>
              <span className="text-xl sm:text-2xl font-bold">{score}</span>
            </div>
            
            <div className="bg-black/40 backdrop-blur-sm rounded-lg px-2 sm:px-4 py-2 text-primary flex items-center">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 mr-1 sm:mr-2 text-red-500" />
              <span className="text-xl sm:text-2xl font-bold">{playerHealth}</span>
            </div>
          </div>
          
          <div className="bg-black/40 backdrop-blur-sm rounded-lg px-2 sm:px-4 py-2 text-primary flex items-center">
            <span className="text-lg sm:text-xl font-bold mr-1 sm:mr-2">Time:</span>
            <span className="text-xl sm:text-2xl font-bold">{formatTime(timeLeft)}</span>
          </div>
        </motion.div>
      )}

      <AnimatePresence>
        {gameState === 'gameover' && (
          <motion.div 
            key="gameover-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-auto px-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-black/70 backdrop-blur-md rounded-2xl p-6 sm:p-8 w-full max-w-md mx-auto text-center"
            >
              <motion.h1 
                className="text-3xl sm:text-4xl font-bold mb-6 text-primary"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              >
                Hello, I'm Joji your WebApp Developer. Welcome to my site!
              </motion.h1>
              
              <motion.p 
                className="text-lg sm:text-xl mb-4 sm:mb-6 text-gray-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                You scored <span className="font-bold text-primary">{score}</span> points
              </motion.p>
              
              <motion.p 
                className="text-base sm:text-lg mb-6 sm:mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                High Score: <span className="font-bold text-primary">{highScore}</span>
              </motion.p>
              
              <motion.p 
                className="text-sm sm:text-md mb-6 text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                {gameIteration > 0 ? 
                  `Next game will last ${30 + (gameIteration * 30)} seconds with more challenges!` : 
                  'Ready for more challenges?'}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <Button 
                  size="lg" 
                  onClick={() => startGame()}
                  className="w-full sm:w-auto bg-primary/80 hover:bg-primary text-black font-bold px-8 py-4 text-lg rounded-full border-2 border-primary pointer-events-auto"
                >
                  <RefreshCcw className="mr-2 h-5 w-5" />
                  Play Again
                </Button>
                
                <Button
                  size="lg"
                  onClick={scrollToAbout}
                  className="w-full sm:w-auto bg-transparent hover:bg-primary/20 text-primary font-bold px-8 py-4 text-lg rounded-full border-2 border-primary pointer-events-auto"
                >
                  <ArrowDownCircle className="mr-2 h-5 w-5" />
                  Explore Portfolio
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}