import React from 'react';

interface StatusProps {
  status: 1 | 2;
}

export default function Status({ status }: StatusProps) {
  const isActive = status === 1;
  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
        isActive
          ? 'bg-green-100 text-green-700 border border-green-300'
          : 'bg-red-100 text-red-700 border border-red-300'
      }`}
    >
      {isActive ? 'Active' : 'Inactive'}
    </span>
  );
}
