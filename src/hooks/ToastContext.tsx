import React, { createContext, useContext, useCallback, useState } from 'react';
import { uuid } from 'uuidv4';

import ToastContainer from '../components/ToastContainer';

export interface ToastMessage {
  id: string;
  type?: 'success' | 'error' | 'info';
  title: string;
  drescription: string;
}

interface ToastContextData {
  addToast(message: Omit<ToastMessage, 'id'>): void;
  removeToast(id: string): void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = useCallback(
    ({ type, title, drescription }: Omit<ToastMessage, 'id'>) => {
      const id = uuid();

      const toast = {
        id,
        type,
        title,
        drescription,
      };

      // setMessages([...messages, toast]);
      setMessages((oldMessage) => [...oldMessage, toast]);
    },
    [],
  );

  const removeToast = useCallback((id: string) => {
    setMessages((oldMessage) =>
      oldMessage.filter((message) => message.id !== id),
    );
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
};

function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast mus be used within a ToastProvider');
  }
  return context;
}

export { ToastProvider, useToast };
