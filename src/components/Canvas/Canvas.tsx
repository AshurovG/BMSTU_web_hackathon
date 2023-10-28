import React, { useEffect, useRef } from "react";
import backgroundImage from "assets/icons/backimg.webp"; // путь к вашему изображению

import styles from "./Canvas.module.scss";
import { url } from "inspector";

interface Point {
  x: number;
  y: number;
}

interface CanvasProps {
  point: Point;
}

const Canvas: React.FC<CanvasProps> = ({ point }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }
    context.fillStyle = "red";
    context.fillRect(0, 0, 0, 0);
    // context.strokeRect(100, 100, 50, 50);

    // Draw the point
    context.beginPath();
    context.arc(point.x, point.y, 10, 0, 2 * Math.PI); // 5 is the radius of the point
    context.fillStyle = "black";
    context.fill();
  }, [point]);

  return (
    <div className="canvas_block">
      <canvas className={styles.canvas} ref={canvasRef}></canvas>
    </div>
  );
};

export default Canvas;
