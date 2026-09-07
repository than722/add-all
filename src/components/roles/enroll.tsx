import React from 'react';

interface EnrollStatusProps {
  status: 1 | 2 | 3;
}

export default function EnrollStatus({ status }: EnrollStatusProps) {
  const statusStyles = {
    1: 'bg-blue-100 text-blue-700 border border-blue-300',    // Registered
    2: 'bg-yellow-100 text-yellow-700 border border-yellow-300', // Pending
    3: 'bg-green-100 text-green-700 border border-green-300',   // Enrolled
  };

  const statusLabels = {
    1: 'Registered',
    2: 'Pending',
    3: 'Enrolled',
  };

  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[status]}`}
    >
      {statusLabels[status]}
    </span>
  );
}
