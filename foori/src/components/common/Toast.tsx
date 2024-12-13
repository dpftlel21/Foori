import { memo } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  onClose: () => void;
}

const Toast = memo(({ message, type, onClose }: ToastProps) => {
  const bgColor = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    warning: 'bg-yellow-500',
  }[type];

  return (
    <div
      className={`${bgColor} text-white px-4 py-2 rounded-lg shadow-lg flex justify-between items-center min-w-[200px]`}
      role="alert"
    >
      <p>{message}</p>
      <button
        onClick={onClose}
        className="ml-4 text-white hover:text-gray-200"
        aria-label="닫기"
      >
        ✕
      </button>
    </div>
  );
});

export default Toast;
