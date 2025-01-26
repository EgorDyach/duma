import toast, { ToastOptions } from 'react-hot-toast';

export const showErrorNotification = (
  message: string,
  options: ToastOptions = {},
) => toast.error(message, options);

export const showSuccessNotification = (
  message: string,
  options: ToastOptions = {},
) => toast.success(message, options);

export const showInfoNotification = (
  message: string,
  options: ToastOptions = {},
) => toast(message, options);

export const showLoadingNotification = (
  message: string,
  options: ToastOptions = {},
) => toast.loading(message, options);
