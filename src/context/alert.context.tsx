import React, { ReactNode, useMemo, useState } from 'react';
import { Alert, AlertDataInterface } from 'components/organisms/Alert';
import { modalType } from 'components/types/modal-type';

export interface AlertInterface {
  visible: boolean,
  data: AlertDataInterface,
  dismissible?: boolean,
  type: modalType
}

interface Props {
  children: ReactNode
}

interface AlertContextInterface {
  show: (data: AlertDataInterface, type?: modalType, dismissible?: boolean) => void,
  hide: () => void
}

export const AlertContext = React.createContext<AlertContextInterface>({} as AlertContextInterface);

const initialState: AlertInterface = { visible: false, data: { title: '', message: '' }, type: 'warning' };

export const AlertContextProvider = ({ children }: Props) => {
  const [alertState, setAlertState] = useState<AlertInterface>(initialState);

  const show = async (data: AlertDataInterface, type: modalType = 'warning', dismissible: boolean = true) => {
    setAlertState({ visible: true, data, type, dismissible });
  };

  const hide = () => {
    setAlertState(initialState);
  };

  const value = useMemo(() => ({ show, hide }), [show, hide]);

  return (
    <AlertContext.Provider value={value}>
      {children}
      <Alert
        type={alertState.type}
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
