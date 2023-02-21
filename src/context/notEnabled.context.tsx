import React, { ReactNode, useMemo, useState } from 'react';
import { NotEnabledModal } from 'components/organisms/NotEnabledModal';
interface NotEnabledModalContextInterface {
  show: () => void;
  hide: () => void;
}

interface Props {
  children: ReactNode;
}

export const NotEnabledModalContext = React.createContext<NotEnabledModalContextInterface>({} as NotEnabledModalContextInterface);

export const NotEnabledModalContextProvider = ({ children }: Props) => {
  const [notEnabledModalState, setNotEnabledModalState] = useState<boolean>(false);

  const show = async () => {
    setNotEnabledModalState(true);
  };

  const hide = () => {
    setNotEnabledModalState(false);
  };

  const value = useMemo(() => ({ show, hide }), [show, hide]);

  return (
    <NotEnabledModalContext.Provider value={value}>
      {children}
      {notEnabledModalState && <NotEnabledModal visible={notEnabledModalState} onPressOut={() => setNotEnabledModalState(false)} />}
    </NotEnabledModalContext.Provider>
  );
};

export const useNotEnabledModal = () => React.useContext(NotEnabledModalContext);
