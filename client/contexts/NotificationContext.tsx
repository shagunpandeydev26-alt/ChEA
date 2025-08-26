import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { toast } from 'sonner';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  duration?: number;
  autoRemove?: boolean;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
  showToast: (type: NotificationType, title: string, message?: string) => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const generateId = () => `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const addNotification = useCallback((notification: Omit<Notification, 'id'>) => {
    const id = generateId();
    const newNotification: Notification = {
      id,
      duration: 2500, // Default 2.5 seconds
      autoRemove: true,
      ...notification,
    };

    setNotifications(prev => [...prev, newNotification]);

    // Auto-remove after specified duration
    if (newNotification.autoRemove) {
      setTimeout(() => {
        removeNotification(id);
      }, newNotification.duration);
    }
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  // Enhanced toast function with auto-remove
  const showToast = useCallback((type: NotificationType, title: string, message?: string) => {
    const duration = 2500; // 2.5 seconds as requested

    switch (type) {
      case 'success':
        toast.success(title, {
          description: message,
          duration,
          className: 'bg-green-50 border-green-200 text-green-800',
        });
        break;
      case 'error':
        toast.error(title, {
          description: message,
          duration,
          className: 'bg-red-50 border-red-200 text-red-800',
        });
        break;
      case 'warning':
        toast.warning(title, {
          description: message,
          duration,
          className: 'bg-yellow-50 border-yellow-200 text-yellow-800',
        });
        break;
      case 'info':
        toast.info(title, {
          description: message,
          duration,
          className: 'bg-blue-50 border-blue-200 text-blue-800',
        });
        break;
      default:
        toast(title, {
          description: message,
          duration,
        });
    }

    // Also add to notifications array for admin panel management
    addNotification({
      type,
      title,
      message,
      duration,
      autoRemove: true,
    });
  }, [addNotification]);

  const value: NotificationContextType = {
    notifications,
    addNotification,
    removeNotification,
    clearAll,
    showToast,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;