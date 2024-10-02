import React, { useEffect, useRef } from "react";

const AnimatedGridBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const gridSize = 15;
  const baseWaveAmplitude = 1; // Reduced base amplitude
  const hoverWaveAmplitude = 8; // Slightly reduced hover amplitude
  const waveFrequency = 0.05; // Reduced frequency
  const hoverRadius = 150;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const drawWavyLine = (
        start: { x: number; y: number },
        end: { x: number; y: number },
        vertical: boolean
      ) => {
        ctx.beginPath();

        const steps = 100;
        for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          const x = vertical ? start.x : start.x + (end.x - start.x) * t;
          const y = vertical ? start.y + (end.y - start.y) * t : start.y;

          const distToMouse = Math.hypot(
            x - mousePos.current.x,
            y - mousePos.current.y
          );

          const hoverIntensity = Math.max(0, 1 - distToMouse / hoverRadius);

          // Reduced global wave effect
          const globalWave =
            Math.sin((x + y) * 0.03 + Date.now() * 0.001) * baseWaveAmplitude;

          // Adjusted mouse-based wave effect
          const mouseWave =
            hoverIntensity *
            Math.sin(distToMouse * 0.03 - Date.now() * 0.003) *
            hoverWaveAmplitude;

          const totalOffset = globalWave + mouseWave;

          const alpha = 0.1 + hoverIntensity * 0.3; // Reduced maximum opacity
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;

          ctx.lineTo(
            x + (vertical ? totalOffset : 0),
            y + (vertical ? 0 : totalOffset)
          );
        }

        ctx.stroke();
      };

      // Draw vertical lines
      for (let x = 0; x <= canvas.width; x += gridSize) {
        drawWavyLine({ x, y: 0 }, { x, y: canvas.height }, true);
      }

      // Draw horizontal lines
      for (let y = 0; y <= canvas.height; y += gridSize) {
        drawWavyLine({ x: 0, y }, { x: canvas.width, y }, false);
      }
    };

    const animate = () => {
      drawGrid();
      requestAnimationFrame(animate);
    };

    const handleMouseMove = (event: MouseEvent) => {
      mousePos.current = { x: event.clientX, y: event.clientY };
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", setCanvasSize);

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0" />;
};

export default AnimatedGridBackground;
