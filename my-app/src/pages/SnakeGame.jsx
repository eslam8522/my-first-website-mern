import { useRef, useEffect, useState } from 'react';
import "../App.css"

const GRID_SIZE = 20;
const WIDTH = 400;
const HEIGHT = 400;

function SnakeGame() {
  const canvasRef = useRef(null);
  
  // 1. Use a Ref for direction to prevent "laggy" input or illegal turns
  const directionRef = useRef('RIGHT');
  
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Function to restart the game state
  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 15, y: 15 });
    setScore(0);
    setGameOver(false);
    directionRef.current = 'RIGHT';
  };

  // 1. Handle Key Input (Using Ref to ensure instant direction access)
  useEffect(() => {
    const handleKeyDown = (e) => {
      const currentDir = directionRef.current;
      if (e.key === 'ArrowUp' && currentDir !== 'DOWN') directionRef.current = 'UP';
      else if (e.key === 'ArrowDown' && currentDir !== 'UP') directionRef.current = 'DOWN';
      else if (e.key === 'ArrowLeft' && currentDir !== 'RIGHT') directionRef.current = 'LEFT';
      else if (e.key === 'ArrowRight' && currentDir !== 'LEFT') directionRef.current = 'RIGHT';
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // 2. The Game Loop
  useEffect(() => {
    if (gameOver) return;

    const moveSnake = () => {
      setSnake((prev) => {
        const head = { ...prev[0] };
        const dir = directionRef.current;

        if (dir === 'UP') head.y -= 1;
        if (dir === 'DOWN') head.y += 1;
        if (dir === 'LEFT') head.x -= 1;
        if (dir === 'RIGHT') head.x += 1;

        // Collision Check: Walls
        if (head.x < 0 || head.x >= WIDTH / GRID_SIZE || head.y < 0 || head.y >= HEIGHT / GRID_SIZE) {
          setGameOver(true);
          return prev;
        }

        // Collision Check: Self
        if (prev.some((segment) => segment.x === head.x && segment.y === head.y)) {
          setGameOver(true);
          return prev;
        }

        const newSnake = [head, ...prev];

        // Eating Food
        if (head.x === food.x && head.y === food.y) {
          setScore((s) => s + 1);
          // Generate new food location
          setFood({
            x: Math.floor(Math.random() * (WIDTH / GRID_SIZE)),
            y: Math.floor(Math.random() * (HEIGHT / GRID_SIZE)),
          });
        } else {
          newSnake.pop(); // Remove tail
        }

        return newSnake;
      });
    };

    const interval = setInterval(moveSnake, 100); // 100ms is a good speed
    return () => clearInterval(interval);
  }, [food, gameOver]); // Re-run loop logic when food is eaten or game ends

  // 3. Drawing to the Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = "#1a1a1a";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Food
    ctx.fillStyle = "#ff4d4d";
    ctx.fillRect(food.x * GRID_SIZE, food.y * GRID_SIZE, GRID_SIZE - 2, GRID_SIZE - 2);

    // Snake
    ctx.fillStyle = "#4ade80";
    snake.forEach((segment) => {
      ctx.fillRect(segment.x * GRID_SIZE, segment.y * GRID_SIZE, GRID_SIZE - 2, GRID_SIZE - 2);
    });
  }, [snake, food]);

  return (
    <div className='home' style={{ textAlign: 'center', color: 'white', backgroundColor: '#121212', padding: '20px' }}>
      <h2>Snake Game</h2>
      <p>Score: {score}</p>
      <canvas
        ref={canvasRef}
        width={WIDTH}
        height={HEIGHT}
        style={{ border: '2px solid #333', borderRadius: '8px' }}
      />
      {gameOver && (
        <div style={{ marginTop: '20px' }}>
          <h3 style={{ color: '#ff4d4d' }}>Game Over!</h3>
          <button onClick={resetGame} style={{ padding: '10px 20px', cursor: 'pointer' }}>
            Restart
          </button>
        </div>
      )}
    </div>
  );
}

export default SnakeGame;