import React from 'react';

interface ProgressCircleProps {
  percent: number;
  radius?: number; 
  stroke?: number; 
  color?: string; 
}

export default function ProgressCircle({
  percent,
  radius = 10,
  stroke = 3,
  color = '#1976d2',
}: ProgressCircleProps) {
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <svg height={radius * 2} width={radius * 2}>
      {/* Background circle */}
      <circle
        stroke="#e5e7eb"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      {/* Progress circle */}
      <circle
        stroke={color}
        fill="transparent"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={`${circumference} ${circumference}`}
        transform={`rotate(-90 ${radius} ${radius})`}
        style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.3s' }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
    </svg>
  );
}
