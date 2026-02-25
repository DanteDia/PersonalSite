"use client";

import { useEffect, useRef } from "react";

export default function CellularAutomataBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Cellular automata setup
    const cellSize = 20;
    const cols = Math.ceil(canvas.width / cellSize);
    const rows = Math.ceil(canvas.height / cellSize);
    
    let grid: number[][] = [];
    
    // Initialize with random cells
    for (let i = 0; i < cols; i++) {
      grid[i] = [];
      for (let j = 0; j < rows; j++) {
        grid[i][j] = Math.random() > 0.85 ? 1 : 0;
      }
    }

    const colors = ["#D1F5D3", "#DCEDE3", "#E8F5E9"];

    let frameCount = 0;
    
    const animate = () => {
      frameCount++;
      
      // Update grid slowly (every 30 frames)
      if (frameCount % 30 === 0) {
        const newGrid: number[][] = [];
        for (let i = 0; i < cols; i++) {
          newGrid[i] = [];
          for (let j = 0; j < rows; j++) {
            const neighbors = countNeighbors(grid, i, j, cols, rows);
            if (grid[i][j] === 1) {
              newGrid[i][j] = neighbors === 2 || neighbors === 3 ? 1 : 0;
            } else {
              newGrid[i][j] = neighbors === 3 ? 1 : 0;
            }
          }
        }
        grid = newGrid;
        
        // Randomly seed new cells
        if (Math.random() > 0.7) {
          const rx = Math.floor(Math.random() * cols);
          const ry = Math.floor(Math.random() * rows);
          grid[rx][ry] = 1;
        }
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw cells with very low opacity
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          if (grid[i][j] === 1) {
            ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
            ctx.globalAlpha = 0.15;
            ctx.fillRect(i * cellSize + 1, j * cellSize + 1, cellSize - 2, cellSize - 2);
          }
        }
      }
      ctx.globalAlpha = 1;

      requestAnimationFrame(animate);
    };

    const countNeighbors = (g: number[][], x: number, y: number, c: number, r: number) => {
      let sum = 0;
      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          const col = (x + i + c) % c;
          const row = (y + j + r) % r;
          sum += g[col][row];
        }
      }
      sum -= g[x][y];
      return sum;
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
