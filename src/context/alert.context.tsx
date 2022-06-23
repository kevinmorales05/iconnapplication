import React, { ReactNode, useMemo, useState } from 'react';
import { Alert, AlertDataInterface } from 'components/organisms/Alert';

export interface AlertInterface {
  visible: boolean,
  data: AlertDataInterface,
  dismissible?: boolean
}

interface Props {
  children: ReactNode
}

interface AlertContextInterface {
  show: (data: AlertDataInterface, dismissible?: boolean) => void,
  hide: () => void
}

export const AlertContext = React.createContext<AlertContextInterface>({} as AlertContextInterface);

const initialState: AlertInterface = { visible: false, data: { title: '', message: '' } };

export const AlertContextProvider = ({ children }: Props) => {
  const [alertState, setAlertState] = useState<AlertInterface>(initialState);

  const show = async (data: AlertDataInterface, dismissible: boolean = true) => {
    setAlertState({ visible: true, data, dismissible });
  };

  const hide = () => {
    setAlertState(initialState);
  };

  const value = useMemo(() => ({ show, hide }), [show, hide]);

  return (
    <AlertContext.Provider value={value}>
      {children}
      <Alert
        visible={alertState.visible}
        data={alertState.data}
        onDismiss={alertState.dismissible ? () => {
          setAlertState(initialState);
        } : undefined}
      />
    </AlertContext.Provider>
  );
};

export const useAlert = () => React.useContext(AlertContext);
