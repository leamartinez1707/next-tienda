import React from 'react';

const EmptyState = ({ message = 'No hay datos para mostrar.' }: { message?: string }) => (
  <div className="flex flex-col items-center justify-center py-10" role="status" aria-live="polite">
    <svg className="h-8 w-8 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a4 4 0 018 0v2M9 17a4 4 0 01-8 0v-2a4 4 0 018 0v2zm0 0v2a4 4 0 008 0v-2a4 4 0 00-8 0z" />
    </svg>
    <span className="text-lg text-gray-500 font-semibold">{message}</span>
  </div>
);

export default EmptyState;
