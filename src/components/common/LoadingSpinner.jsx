export default function LoadingSpinner({ size = 'md', message = 'Loading...' }) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div
        className={`${sizeClasses[size]} border-4 border-primary-100 border-t-primary-500 rounded-full animate-spin`}
      />
      {message && (
        <p className="mt-4 text-gray-500 text-sm">{message}</p>
      )}
    </div>
  );
}
