import { modalType } from 'components/types/modal-type';
import React, { useState, useEffect, useRef, useCallback } from 'react';

export interface ToastInterface {
  message: string;
  type?: modalType;
  visible?: boolean;
  timeToShow?: number;
}

interface ToastContextInterface {
  show: (toast: ToastInterface) => void;
  hide: () => void;
  toast: ToastInterface;
}

export const ToastContext = React.createContext<ToastContextInterface>({} as ToastContextInterface);

const initialState: ToastInterface = { message: '', visible: false, type: undefined, timeToShow: 0 };

export const ToastContextProvider = ({ children }) => {
  const [toast, setToast] = useState<ToastInterface>(initialState);
  const timeout = useRef();

  const show = useCallback((args: ToastInterface) => {
    setToast({ ...args, visible: true });
  }, []);

  const hide = useCallback(() => {
    setToast(initialState);
  }, [toast]);

  useEffect(() => {
    if (toast.visible) {
      timeout.current = setTimeout(hide, toast.timeToShow ? toast.timeToShow : 4000);
      return () => {
        if (timeout.current) {
          clearTimeout(timeout.current);
        }
      };
    }
  }, [hide, toast]);

  return (
    <ToastContext.Provider
      value={{
        hide,
        show,
        toast
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => React.useContext(ToastContext);
