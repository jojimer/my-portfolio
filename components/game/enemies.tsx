"use client";

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGameStore } from '@/lib/stores/game-store';
import { Text } from '@react-three/drei';

export function Enemies() {
  const { enemies } = useGameStore();
  
  return (
    <group>
      {enemies.map((enemy) => (
        <Enemy key={enemy.id} enemy={enemy} />
      ))}
    </group>
  );
}

type EnemyProps = {
  enemy: {
    id: string;
    type: 'spider' | 'bee' | 'fly' | 'cockroach' | 'error' | 'warning';
    position: [number, number, number];
    health: number;
  };
};

function Enemy({ enemy }: EnemyProps) {
  const textRef = useRef<any>(null);
  
  const getEnemyConfig = () => {
    // Base size variation for each type
    const baseScales = {
      spider: 1.3,
      bee: 1.1,
      fly: 0.9,
      cockroach: 1.2,
      error: 1.4,
      warning: 1.3
    };
    
    // Random size variation (±20% of base size)
    const randomScale = 0.8 + Math.random() * 0.4;
    
    switch (enemy.type) {
      case 'spider':
        return {
          text: "🕷️",
          color: "#ff5555",
          emissive: "#ff5555",
          scale: baseScales.spider * randomScale,
          health: 2
        };
      case 'bee':
        return {
          text: "🐝",
          color: "#ffb86c",
          emissive: "#ffb86c",
          scale: baseScales.bee * randomScale,
          health: 1
        };
      case 'fly':
        return {
          text: "🪰",
          color: "#8be9fd",
          emissive: "#8be9fd",
          scale: baseScales.fly * randomScale,
          health: 1
        };
      case 'cockroach':
        return {
          text: "🪳",
          color: "#bd93f9",
          emissive: "#bd93f9",
          scale: baseScales.cockroach * randomScale,
          health: 3
        };
      case 'error':
        return {
          text: "⚠️",
          color: "#ff5555",
          emissive: "#ff5555",
          scale: baseScales.error * randomScale,
          health: 2
        };
      case 'warning':
        return {
          text: "⚡",
          color: "#f1fa8c",
          emissive: "#f1fa8c",
          scale: baseScales.warning * randomScale,
          health: 1
        };
      default:
        return {
          text: "UNKNOWN",
          color: "#ffffff",
          emissive: "#888888",
          scale: 1.0,
          health: 1
        };
    }
  };
  
  const config = getEnemyConfig();
  
  useFrame(({ clock }) => {
    if (textRef.current) {
      // Base movement
      const baseY = enemy.position[1];
      
      // Enemy-specific movement patterns
      let additionalY = 0;
      let additionalX = 0;
      
      switch (enemy.type) {
        case 'spider':
          // Spiders move in a web-like pattern
          additionalY = Math.sin(clock.getElapsedTime() * 3) * 0.1;
          break;
        case 'bee':
          // Bees move in quick, zigzag patterns
          additionalY = Math.sin(clock.getElapsedTime() * 8) * 0.05;
          additionalX = Math.cos(clock.getElapsedTime() * 6) * 0.03;
          break;
        case 'fly':
          // Flies move erratically
          additionalY = Math.sin(clock.getElapsedTime() * 10) * 0.08;
          additionalX = Math.cos(clock.getElapsedTime() * 12) * 0.04;
          break;
        case 'cockroach':
          // Cockroaches move in quick bursts
          additionalY = Math.sin(clock.getElapsedTime() * 4) * 0.15;
          break;
        default:
          // Default floating movement
          additionalY = Math.sin(clock.getElapsedTime() * 2) * 0.05;
          additionalX = Math.cos(clock.getElapsedTime() * 1.5) * 0.03;
      }
      
      textRef.current.position.y = baseY + additionalY;
      textRef.current.position.x = enemy.position[0] + additionalX;
      
      // Dynamic rotation based on movement
      textRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 1.5) * 0.15;
      
      // Pulsing scale effect
      const baseScale = config.scale - ((enemy.health - 1) * 0.2);
      const pulseScale = baseScale + Math.sin(clock.getElapsedTime() * 4) * 0.1;
      textRef.current.scale.set(pulseScale, pulseScale, pulseScale);
      
      // Subtle glow effect
      if (textRef.current.material) {
        const glowIntensity = 0.5 + Math.sin(clock.getElapsedTime() * 6) * 0.1;
        textRef.current.material.emissiveIntensity = glowIntensity;
      }
    }
  });
  
  return (
    <Text
      ref={textRef}
      position={enemy.position}
      color={config.color}
      fontSize={0.25}
      maxWidth={1}
      lineHeight={1}
      letterSpacing={0.02}
      textAlign="center"
      anchorX="center"
      anchorY="middle"
      // emissive={config.emissive}
      // emissiveIntensity={0.5}
    >
      {config.text}
    </Text>
  );
}