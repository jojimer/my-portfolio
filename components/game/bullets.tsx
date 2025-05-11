"use client";

import { useGameStore } from '@/lib/stores/game-store';
import { Text } from '@react-three/drei';

export function Bullets() {
  const { bullets } = useGameStore();
  
  return (
    <group>
      {bullets.map((bullet) => (
        <Text
          key={bullet.id}
          position={bullet.position}
          color="#ffffff"
          fontSize={0.2}
          anchorX="center"
          anchorY="middle"
          userData={{ type: 'bullet' }}
        >
          {bullet.character}
        </Text>
      ))}
    </group>
  );
}