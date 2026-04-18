"use client";

import { useEffect, useRef } from "react";

type ProgressChartProps = {
  progress: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  showLabel?: boolean;
  label?: string;
  color?: string;
};

export default function ProgressChart({
  progress,
  size = 120,
  strokeWidth = 8,
  className = "",
  showLabel = true,
  label = "Complete",
  color = "#3b82f6"
}: ProgressChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const centerX = size / 2;
    const centerY = size / 2;
    const radius = (size - strokeWidth) / 2;

    // Clear canvas
    ctx.clearRect(0, 0, size, size);

    // Background circle with gradient
    const bgGradient = ctx.createLinearGradient(0, 0, size, size);
    bgGradient.addColorStop(0, "#f8fafc");
    bgGradient.addColorStop(1, "#f1f5f9");

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = bgGradient;
    ctx.lineWidth = strokeWidth;
    ctx.stroke();

    // Progress arc with gradient
    const progressGradient = ctx.createLinearGradient(0, 0, size, size);
    if (progress >= 100) {
      progressGradient.addColorStop(0, "#10b981");
      progressGradient.addColorStop(1, "#059669");
    } else {
      const secondaryColor = color === "#3b82f6" ? "#6366f1" : color;
      progressGradient.addColorStop(0, color);
      progressGradient.addColorStop(1, secondaryColor);
    }

    const startAngle = -Math.PI / 2; // Start from top
    const endAngle = startAngle + (progress / 100) * 2 * Math.PI;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.strokeStyle = progressGradient;
    ctx.lineWidth = strokeWidth;
    ctx.lineCap = "round";
    ctx.stroke();

    // Add glow effect for completed progress
    if (progress >= 100) {
      ctx.shadowColor = "#10b981";
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.strokeStyle = "#10b981";
      ctx.lineWidth = strokeWidth;
      ctx.lineCap = "round";
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    // Center text
    if (showLabel) {
      ctx.fillStyle = "#1e293b"; // slate-800
      ctx.font = `bold ${size * 0.18}px system-ui`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`${progress}%`, centerX, centerY - size * 0.06);

      ctx.fillStyle = "#64748b"; // slate-500
      ctx.font = `${size * 0.08}px system-ui`;
      ctx.fillText(label, centerX, centerY + size * 0.08);
    } else {
      ctx.fillStyle = "#1e293b"; // slate-800
      ctx.font = `bold ${size * 0.25}px system-ui`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`${progress}%`, centerX, centerY);
    }
  }, [progress, size, strokeWidth, showLabel, label, color]);

  return (
    <div className={`inline-block ${className}`}>
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className="block drop-shadow-sm"
      />
    </div>
  );
}