"use client";

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGameStore } from '@/lib/stores/game-store';
import * as THREE from 'three';

// Create a reusable material for meteors
const meteorMaterial = new THREE.MeshStandardMaterial({
  color: '#aaaaaa',
  roughness: 0.7,
  metalness: 0.2,
});

// Create fewer meteors with optimized properties
const createMeteors = (count: number) => {
  return Array.from({ length: count }).map(() => ({
    position: [
      Math.random() * 20 - 10, // Reduced range
      Math.random() * 20 - 10,
      Math.random() * -20 - 5
    ] as [number, number, number],
    rotation: [
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI
    ] as [number, number, number],
    scale: Math.random() * 0.2 + 0.05, // Smaller meteors
    speed: Math.random() * 0.01 + 0.005, // Slower movement
    rotationSpeed: Math.random() * 0.005 - 0.0025, // Slower rotation
    id: Math.random().toString()
  }));
};

export function SpaceBackground() {
  const meteorsRef = useRef(createMeteors(8)); // Reduced number of meteors
  const { gameState } = useGameStore();
  
  useFrame(() => {
    // Update meteor positions with less frequent updates
    meteorsRef.current = meteorsRef.current.map(meteor => {
      const [x, y, z] = meteor.position;
      const newZ = z + meteor.speed;
      
      // Reset meteor if it's too close
      if (newZ > 5) {
        return {
          ...meteor,
          position: [
            Math.random() * 20 - 10,
            Math.random() * 20 - 10,
            -20
          ] as [number, number, number]
        };
      }
      
      // Update position and rotation less frequently
      return {
        ...meteor,
        position: [x, y, newZ] as [number, number, number],
        rotation: [
          meteor.rotation[0] + meteor.rotationSpeed,
          meteor.rotation[1] + meteor.rotationSpeed,
          meteor.rotation[2] + meteor.rotationSpeed
        ] as [number, number, number]
      };
    });
  });
  
  return (
    <group>
      {/* Background color gradient */}
      <mesh position={[0, 0, -10]}>
        <planeGeometry args={[40, 40]} />
        <meshBasicMaterial color="#050a20" />
      </mesh>
      
      {/* Meteors */}
      {meteorsRef.current.map(meteor => (
        <mesh
          key={meteor.id}
          position={meteor.position}
          rotation={meteor.rotation}
          scale={meteor.scale}
        >
          <dodecahedronGeometry args={[1, 0]} />
          <primitive object={meteorMaterial} />
        </mesh>
      ))}
    </group>
  );
}