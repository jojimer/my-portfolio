import { create } from 'zustand';

export type GameState = 'ready' | 'playing' | 'gameover';

type Bullet = {
  id: string;
  position: [number, number, number];
  direction: [number, number, number];
  character: string;
};

type Enemy = {
  id: string;
  type: 'spider' | 'bee' | 'fly' | 'cockroach' | 'error' | 'warning';
  position: [number, number, number];
  speed: number;
  health: number;
};

interface GameStore {
  // Canvas
  canvasWidth: number;
  canvasHeight: number;
  setCanvasDimensions: (width: number, height: number) => void;
  
  // Game state
  gameState: GameState;
  score: number;
  highScore: number;
  startTime: number;
  timeLeft: number;
  gameIteration: number;
  isPlaying: boolean;
  playerHealth: number;
  playerPosition: [number, number, number];
  
  // Actions
  setPlayerPosition: (position: [number, number, number]) => void;
  startGame: () => void;
  endGame: () => void;
  resetGame: () => void;
  addScore: (points: number) => void;
  updateTimeLeft: () => void;
  damagePlayer: (damage: number) => void;
  
  // Bullet management
  bullets: Bullet[];
  addBullet: (position: [number, number, number], direction: [number, number, number]) => void;
  removeBullet: (id: string) => void;
  updateBullets: () => void;
  
  // Enemy management
  enemies: Enemy[];
  addEnemy: () => void;
  removeEnemy: (id: string) => void;
  updateEnemies: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  // Canvas
  canvasWidth: 1000,
  canvasHeight: 800,
  setCanvasDimensions: (width, height) => set({ canvasWidth: width, canvasHeight: height }),
  
  // Game state
  gameState: 'ready',
  score: 0,
  highScore: 0,
  startTime: Date.now(),
  timeLeft: 30,
  gameIteration: 0,
  isPlaying: false,
  playerHealth: 100,
  playerPosition: [-2, 0, 0],
  
  setPlayerPosition: (position) => set({ playerPosition: position }),
  
  startGame: () => {
    const iteration = get().gameIteration;
    const gameDuration = 30 + (iteration * 30); // Increment by 30 seconds each time
    
    set({ 
      gameState: 'playing',
      score: 0,
      startTime: Date.now(),
      timeLeft: gameDuration,
      bullets: [],
      enemies: [],
      isPlaying: true,
      playerHealth: 100
    });
    
    get().addEnemy();
    
    const enemyInterval = setInterval(() => {
      if (get().gameState !== 'playing') {
        clearInterval(enemyInterval);
        return;
      }
      
      get().addEnemy();
    }, 1000 - Math.min(500, get().gameIteration * 50));
    
    const gameLoop = setInterval(() => {
      if (get().gameState !== 'playing') {
        clearInterval(gameLoop);
        return;
      }
      
      get().updateBullets();
      get().updateEnemies();
      get().updateTimeLeft();
      
      if (get().timeLeft <= 0) {
        get().endGame();
      }
    }, 16);
  },
  
  endGame: () => {
    const { score, highScore } = get();
    const newHighScore = score > highScore ? score : highScore;
    
    set({ 
      gameState: 'gameover',
      highScore: newHighScore,
      gameIteration: get().gameIteration + 1,
      isPlaying: false,
      enemies: [],
      bullets: []
    });
  },
  
  resetGame: () => set({ 
    gameState: 'ready',
    score: 0,
    bullets: [],
    enemies: [],
    isPlaying: false,
    startTime: Date.now(),
    timeLeft: 30,
    playerHealth: 100
  }),
  
  addScore: (points) => set(state => ({ score: state.score + points })),
  
  updateTimeLeft: () => {
    const { startTime, gameState, gameIteration } = get();
    
    if (gameState === 'playing') {
      const gameDuration = 30 + (gameIteration * 30); // Match the duration from startGame
      const elapsedTime = (Date.now() - startTime) / 1000;
      const timeLeft = Math.max(0, gameDuration - elapsedTime);
      
      set({ timeLeft });
    }
  },
  
  damagePlayer: (damage) => {
    const currentHealth = get().playerHealth;
    const newHealth = Math.max(0, currentHealth - damage);
    
    set({ playerHealth: newHealth });
    
    if (newHealth <= 0) {
      get().endGame();
    }
  },
  
  // Bullet management
  bullets: [],
  
  addBullet: (position, direction) => {
    const bullet = {
      id: Math.random().toString(36),
      position,
      direction,
      character: '.'
    };
    
    set(state => ({ bullets: [...state.bullets, bullet] }));
  },
  
  removeBullet: (id) => {
    set(state => ({
      bullets: state.bullets.filter(bullet => bullet.id !== id)
    }));
  },
  
  updateBullets: () => {
    set(state => {
      const updatedBullets = state.bullets.map(bullet => {
        const [x, y, z] = bullet.position;
        const [dx, dy, dz] = bullet.direction;
        
        const newPosition: [number, number, number] = [
          x + dx * 0.1,
          y + dy * 0.1,
          z + dz * 0.1
        ];
        
        return {
          ...bullet,
          position: newPosition
        };
      });
      
      const filteredBullets = updatedBullets.filter(bullet => {
        const [x, y] = bullet.position;
        return x >= -3 && x <= 3 && y >= -1.5 && y <= 1.5;
      });
      
      return { bullets: filteredBullets };
    });
    
    const { bullets, enemies } = get();
    
    bullets.forEach(bullet => {
      const [bx, by] = bullet.position;
      
      // Check collision with enemies
      enemies.forEach(enemy => {
        const [ex, ey] = enemy.position;
        const dist = Math.sqrt((bx - ex) ** 2 + (by - ey) ** 2);
        
        if (dist < 0.2) {
          get().removeBullet(bullet.id);
          enemy.health -= 1;
          
          if (enemy.health <= 0) {
            get().removeEnemy(enemy.id);
            get().addScore(
              enemy.type === 'cockroach' ? 15 :
              enemy.type === 'spider' ? 10 :
              enemy.type === 'bee' ? 8 :
              enemy.type === 'fly' ? 5 :
              enemy.type === 'error' ? 10 : 5
            );
          }
        }
      });
    });
  },
  
  // Enemy management
  enemies: [],
  
  addEnemy: () => {
    const iteration = get().gameIteration;
    const enemyTypes = ['spider', 'bee', 'fly', 'cockroach', 'error', 'warning'] as const;
    const type = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
    
    const { enemies } = get();
    
    let yPosition: number;
    let attempts = 0;
    const maxAttempts = 10;
    
    do {
      yPosition = Math.random() * 3 - 1.5;
      const isFreePosition = enemies.every(enemy => {
        const [, enemyY] = enemy.position;
        return Math.abs(enemyY - yPosition) > 0.4;
      });
      
      if (isFreePosition || attempts >= maxAttempts) break;
      attempts++;
    } while (true);
    
    const enemy = {
      id: Math.random().toString(36),
      type,
      position: [
        3,
        yPosition,
        0
      ] as [number, number, number],
      speed: 0.005 + Math.random() * 0.005 * iteration,
      health: type === 'cockroach' ? 3 :
             type === 'spider' ? 2 :
             type === 'error' ? 2 : 1
    };
    
    set(state => ({ enemies: [...state.enemies, enemy] }));
  },
  
  removeEnemy: (id) => {
    set(state => ({
      enemies: state.enemies.filter(enemy => enemy.id !== id)
    }));
  },
  
  updateEnemies: () => {
    const { enemies, playerPosition, gameState } = get();
    
    if (gameState !== 'playing') return;
    
    set(state => {
      const updatedEnemies = state.enemies.map(enemy => {
        const [x, y, z] = enemy.position;
        
        const newPosition: [number, number, number] = [
          x - enemy.speed,
          y,
          z
        ];
        
        // Check collision with player
        const dist = Math.sqrt(
          (newPosition[0] - playerPosition[0]) ** 2 + 
          (newPosition[1] - playerPosition[1]) ** 2
        );
        
        if (dist < 0.3) {
          const damage = enemy.type === 'cockroach' ? 20 :
                        enemy.type === 'spider' ? 15 :
                        enemy.type === 'error' ? 12 :
                        enemy.type === 'bee' ? 10 : 8;
          get().damagePlayer(damage);
          get().removeEnemy(enemy.id);
          get().addScore(enemy.type === 'error' ? 3 : 2);
          return enemy;
        }
        
        return {
          ...enemy,
          position: newPosition
        };
      });
      
      const filteredEnemies = updatedEnemies.filter(enemy => {
        const [x] = enemy.position;
        return x >= -3;
      });
      
      return { enemies: filteredEnemies };
    });
  }
}));