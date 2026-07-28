import toast from 'react-hot-toast';

const Toast = {
  success: (message: string) => toast.success(message, { duration: 3000 }),
  error: (message: string) => toast.error(message, { duration: 3000 }),
};

export default Toast;
