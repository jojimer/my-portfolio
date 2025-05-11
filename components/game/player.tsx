"use client";

import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGameStore } from '@/lib/stores/game-store';
import { Mesh, PointLight } from 'three';

type PlayerProps = {
  position: [number, number, number];
};

export function Player({ position }: PlayerProps) {
  const meshRef = useRef<Mesh>(null);
  const flameRef = useRef<Mesh>(null);
  const pointLightRef = useRef<PointLight>(null);
  const [isShooting, setIsShooting] = useState(false);
  const [lastShootTime, setLastShootTime] = useState(0);
  const { addBullet, setPlayerPosition } = useGameStore();
  
  useEffect(() => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;

    const handleStart = (e: MouseEvent | TouchEvent) => {
      try {
        e.preventDefault();
        e.stopPropagation();
        setIsShooting(true);
      } catch (error) {
        console.error('Error in start handler:', error);
      }
    };
    
    const handleEnd = (e: MouseEvent | TouchEvent) => {
      try {
        e.preventDefault();
        e.stopPropagation();
        setIsShooting(false);
      } catch (error) {
        console.error('Error in end handler:', error);
      }
    };
    
    // Mouse events
    canvas.addEventListener('mousedown', handleStart, { passive: false });
    canvas.addEventListener('mouseup', handleEnd, { passive: false });
    
    // Touch events
    canvas.addEventListener('touchstart', handleStart, { passive: false });
    canvas.addEventListener('touchend', handleEnd, { passive: false });
    
    return () => {
      canvas.removeEventListener('mousedown', handleStart);
      canvas.removeEventListener('mouseup', handleEnd);
      canvas.removeEventListener('touchstart', handleStart);
      canvas.removeEventListener('touchend', handleEnd);
    };
  }, []);
  
  useFrame(({ clock }) => {
    try {
      if (!meshRef.current || !flameRef.current || !pointLightRef.current) return;
      
      meshRef.current.position.x = position[0];
      meshRef.current.position.y = position[1];
      
      // Update flame position
      flameRef.current.position.x = position[0] - 0.15;
      flameRef.current.position.y = position[1];
      
      // More dynamic flame animation
      const time = clock.getElapsedTime();
      const baseScale = 0.8;
      const pulseScale = Math.sin(time * 30) * 0.2;
      const verticalPulse = Math.sin(time * 20) * 0.1;
      
      flameRef.current.scale.x = baseScale + pulseScale;
      flameRef.current.scale.y = baseScale + verticalPulse;
      flameRef.current.scale.z = baseScale;
      
      // Update point light position and intensity
      pointLightRef.current.position.set(position[0] - 0.2, position[1], 0.5);
      pointLightRef.current.intensity = 1.5 + Math.sin(time * 30) * 0.3;
      
      // Update player position in game store
      setPlayerPosition(position);
      
      if (isShooting) {
        const currentTime = clock.getElapsedTime();
        if (currentTime - lastShootTime > 0.1) {
          const bulletPosition: [number, number, number] = [
            position[0] + 0.4,
            position[1],
            0
          ];
          
          addBullet(bulletPosition, [1, 0, 0]);
          setLastShootTime(currentTime);
        }
      }
    } catch (error) {
      console.error('Error in frame update:', error);
    }
  });
  
  return (
    <group>
      {/* Main ship */}
      <mesh ref={meshRef} position={position}>
        <group scale={[2.5, 2.5, 2.5]}>
          {/* Main body - pointing right */}
          <mesh position={[0, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
            <coneGeometry args={[0.05, 0.2, 3]} />
            <meshStandardMaterial color="#88ccff" emissive="#4488ff" emissiveIntensity={0.5} />
          </mesh>
          
          {/* Wing */}
          <mesh position={[0.05, 0, 0]}>
            <coneGeometry args={[0.04, 0.1, 3]} />
            <meshStandardMaterial color="#6688ff" />
          </mesh>
          
          {/* Engine */}
          <mesh position={[-0.08, 0, 0]}>
            <sphereGeometry args={[0.03, 16, 8]} />
            <meshStandardMaterial color="#ff8866" emissive="#ff4422" emissiveIntensity={1} />
          </mesh>
        </group>
      </mesh>

      {/* Enhanced flame effect with reduced size */}
      <mesh ref={flameRef} position={[position[0] - 0.15, position[1], 0]}>
        <group scale={[2.5, 2.5, 2.5]}>
          {/* Core flame */}
          <mesh position={[-0.04, 0, 0]}>
            <coneGeometry args={[0.015, 0.1, 8]} />
            <meshStandardMaterial 
              color="#ffffff"
              emissive="#ff4400"
              emissiveIntensity={3}
              transparent
              opacity={0.9}
            />
          </mesh>
          
          {/* Inner flame */}
          <mesh position={[-0.06, 0, 0]}>
            <coneGeometry args={[0.02, 0.12, 8]} />
            <meshStandardMaterial 
              color="#ff4400"
              emissive="#ff8800"
              emissiveIntensity={2.5}
              transparent
              opacity={0.8}
            />
          </mesh>
          
          {/* Middle flame */}
          <mesh position={[-0.08, 0, 0]}>
            <coneGeometry args={[0.025, 0.15, 8]} />
            <meshStandardMaterial
              color="#ff8800"
              emissive="#ffaa00"
              emissiveIntensity={2}
              transparent
              opacity={0.6}
            />
          </mesh>
          
          {/* Outer flame */}
          <mesh position={[-0.1, 0, 0]}>
            <coneGeometry args={[0.03, 0.18, 8]} />
            <meshStandardMaterial
              color="#ffaa00"
              emissive="#ffcc00"
              emissiveIntensity={1.5}
              transparent
              opacity={0.4}
            />
          </mesh>
        </group>
      </mesh>

      {/* Enhanced dynamic lighting with reduced intensity */}
      <pointLight
        ref={pointLightRef}
        color="#ff6600"
        intensity={1.5}
        distance={2}
        decay={2}
      />
    </group>
  );
}