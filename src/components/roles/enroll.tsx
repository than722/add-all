import React from 'react';

interface EnrollStatusProps {
  status: 1 | 2;
}

export default function EnrollStatus({ status }: EnrollStatusProps) {
  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
        status === 1
          ? 'bg-green-100 text-green-700 border border-green-300'
          : 'bg-yellow-100 text-yellow-700 border border-yellow-300'
      }`}
    >
      {status === 1 ? 'Enrolled' : 'Pending'}
    </span>
  );
}
