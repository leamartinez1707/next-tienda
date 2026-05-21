import React from 'react';

const ErrorState = ({ message = 'Hubo un error inesperado.' }: { message?: string }) => (
  <div className="flex flex-col items-center justify-center py-10" role="alert" aria-live="assertive">
    <svg className="h-8 w-8 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12A9 9 0 113 12a9 9 0 0118 0z" />
    </svg>
    <span className="text-lg text-red-600 font-semibold">{message}</span>
  </div>
);

export default ErrorState;
