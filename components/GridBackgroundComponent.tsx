import React, { useEffect, useRef } from "react";

const AnimatedGridBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const gridSize = 40;
    const lineWidth = 0.5;

    let animationFrameId: number;

    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    const drawGrid = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = lineWidth;

      const fadeHeight = canvas.height * 0.6;
      const fadeWidth = canvas.width * 0.8;

      for (let x = 0; x <= canvas.width; x += gridSize) {
        const alpha = Math.max(0, 1 - x / fadeWidth);
        const yOffset = Math.sin(x * 0.05 + time * 0.001) * 2;
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 * alpha})`;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, fadeHeight + yOffset);
        ctx.stroke();
      }

      for (let y = 0; y <= fadeHeight; y += gridSize) {
        const alpha = Math.max(0, 1 - y / fadeHeight);
        const xOffset = Math.sin(y * 0.05 + time * 0.001) * 2;
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 * alpha})`;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(fadeWidth + xOffset, y);
        ctx.stroke();
      }
    };

    const animate = (time: number) => {
      drawGrid(time);
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      setCanvasSize();
      drawGrid(0);
    };

    setCanvasSize();
    window.addEventListener("resize", handleResize);
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0" />;
};

export default AnimatedGridBackground;
