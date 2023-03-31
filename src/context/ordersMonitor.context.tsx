import React, { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { OrderWidgetInterface } from 'rtk/types';
import { useOrders } from 'screens/home/hooks/useOrders';

export interface MonitorInterface {
  monitoring?: boolean;
}

interface MonitorContextInterface {
  start: (data?: MonitorInterface) => void;
  stop: () => void;
  ordersWidgets: OrderWidgetInterface[];
}

interface Props {
  children: ReactNode;
}

export const MonitorContext = React.createContext<MonitorContextInterface>({} as MonitorContextInterface);

const initialState: MonitorInterface = { monitoring: false };

export const OrdersMonitorContextProvider = ({ children }: Props) => {
  const [monitorState, setMonitorState] = useState<MonitorInterface>(initialState);
  const { getOrderWidgets, orderWidgetsList } = useOrders();
  const [intervalId, setIntervalId] = useState<any>();

  const start = useCallback(async () => {
    setMonitorState({ monitoring: true });
  }, []);

  const stop = useCallback(async () => {
    setMonitorState(initialState);
  }, []);

  const value = useMemo(() => ({ start, stop, ordersWidgets: orderWidgetsList! }), [start, stop, orderWidgetsList]);

  useEffect(() => {
    if (monitorState.monitoring === true) {
      let interval = setInterval(() => {
        getOrderWidgets();
      }, 5000); // TODO set seconds to monitor
      setIntervalId(interval);
    } else {
      clearInterval(intervalId);
    }
  }, [monitorState.monitoring]);

  return <MonitorContext.Provider value={value}>{children}</MonitorContext.Provider>;
};

export const useOrdersMonitor = () => React.useContext(MonitorContext);
