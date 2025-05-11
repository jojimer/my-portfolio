"use client";

import { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { useGameStore } from '@/lib/stores/game-store';
import { GameUI } from './game-ui';
import { SpaceBackground } from './space-background';
import { Player } from './player';
import { Enemies } from './enemies';
import { Bullets } from './bullets';
import { useMousePosition } from '@/hooks/use-mouse-position';
import { useInView } from 'framer-motion';

export function GameCanvas() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const mousePosition = useMousePosition();
  const isInView = useInView(canvasRef);
  const [webGLSupported, setWebGLSupported] = useState(true);
  
  const { 
    gameState,
    startGame, 
    setCanvasDimensions,
    timeLeft,
    isPlaying
  } = useGameStore();

  useEffect(() => {
    // Check WebGL support
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    
    if (!gl) {
      setWebGLSupported(false);
      return;
    }

    const handleResize = () => {
      if (canvasRef.current) {
        const { width, height } = canvasRef.current.getBoundingClientRect();
        setCanvasDimensions(width, height);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    if (gameState === 'ready') {
      startGame();
    }
    
    return () => window.removeEventListener('resize', handleResize);
  }, [setCanvasDimensions, startGame, gameState]);

  if (!webGLSupported) {
    return (
      <div className="absolute inset-0 w-screen h-screen overflow-hidden flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center p-8 max-w-md">
          <h2 className="text-2xl font-bold mb-4">WebGL Not Supported</h2>
          <p className="mb-4">Your browser or device doesn't support WebGL, which is required to play this game.</p>
          <p>Try using a modern browser like Chrome, Firefox, or Edge, and make sure your graphics drivers are up to date.</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={canvasRef} 
      className="absolute inset-0 w-screen h-screen overflow-hidden flex items-center justify-center"
      style={{ 
        cursor: isPlaying ? 'none' : 'auto',
        touchAction: 'none'
      }}
    >
      <Canvas
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          failIfMajorPerformanceCaveat: false
        }}
      >
        <ambientLight intensity={0.5} />
        <SpaceBackground />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <Player position={[mousePosition.x, mousePosition.y, 0]} />
        <Bullets />
        {gameState === 'playing' && <Enemies />}
      </Canvas>
      
      <GameUI />
    </div>
  );
}