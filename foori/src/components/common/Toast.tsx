interface ToastProps {
  type: 'error' | 'info' | 'warning' | 'success';
  message: string;
  onClose: () => void;
}

const Toast = ({ type, message, onClose }: ToastProps) => {
  const STYLES = {
    container: `
      fixed top-4 right-4 z-50
      flex items-center gap-3
      min-w-[320px] p-4
      bg-white rounded-lg shadow-lg
      animate-slideIn
    `,
    bar: {
      error: 'w-1 h-full bg-red-500 absolute left-0 rounded-l-lg',
      info: 'w-1 h-full bg-blue-500 absolute left-0 rounded-l-lg',
      warning: 'w-1 h-full bg-orange-500 absolute left-0 rounded-l-lg',
      success: 'w-1 h-full bg-green-500 absolute left-0 rounded-l-lg',
    },
    icon: {
      error: 'text-red-500',
      info: 'text-blue-500',
      warning: 'text-orange-500',
      success: 'text-green-500',
    },
    title: 'font-semibold text-gray-900',
    message: 'text-gray-600 text-sm',
    closeButton: `
      absolute right-2 top-2
      text-gray-400 hover:text-gray-600
      transition-colors
    `,
  } as const;

  const icons = {
    error: '❌',
    info: 'ℹ️',
    warning: '⚠️',
    success: '✅',
  };

  const titles = {
    error: 'Error',
    info: 'Info',
    warning: 'Warning',
    success: 'Success',
  };

  return (
    <div className={STYLES.container}>
      <div className={STYLES.bar[type]} />
      <span className={STYLES.icon[type]}>{icons[type]}</span>
      <div className="flex-1">
        <h3 className={STYLES.title}>{titles[type]}</h3>
        <p className={STYLES.message}>{message}</p>
      </div>
      <button onClick={onClose} className={STYLES.closeButton}>
        ✕
      </button>
    </div>
  );
};

export default Toast;
