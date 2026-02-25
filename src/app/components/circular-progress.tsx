'use client';

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

type CircularProgressProps = {
  value: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
};

export function CircularProgress({ value, size = 140, strokeWidth = 10, className }: CircularProgressProps) {
  const [progress, setProgress] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    // Timeout to ensure the transition is applied
    const timer = setTimeout(() => setProgress(value), 100);
    return () => clearTimeout(timer);
  }, [value]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'stroke-green-400';
    if (score >= 60) return 'stroke-yellow-400';
    return 'stroke-red-400';
  };

  const getScoreTextColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };
  
  const getRatingText = (score: number) => {
    if (score >= 80) return "Excellent Match";
    if (score >= 60) return "Good Match";
    return "Needs Improvement";
  }

  return (
    <div className={cn('relative flex items-center justify-center', className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          className="stroke-muted/20"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className={cn('transform -rotate-90 origin-center transition-[stroke-dashoffset] duration-1000 ease-out', getScoreColor(value))}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <div className="absolute flex flex-col items-center text-center">
        <span className={cn("text-4xl font-bold", getScoreTextColor(value))}>
          {Math.round(value)}
          <span className="text-2xl font-medium text-foreground/50">%</span>
        </span>
        <span className="text-xs font-medium text-foreground/80 mt-1">{getRatingText(value)}</span>
      </div>
    </div>
  );
}
