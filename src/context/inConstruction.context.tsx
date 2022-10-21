import React, { ReactNode, useMemo } from 'react';
import * as RootNavigation from '../navigation/RootNavigation';

interface InConstructionContextInterface {
  show: (isSafeToClose?: boolean) => void;
}

interface Props {
  children: ReactNode;
}

export const InConstructionContext = React.createContext<InConstructionContextInterface>({} as InConstructionContextInterface);

export const InConstructionContextProvider = ({ children }: Props) => {
  const show = async (isSafeToClose?: boolean) => {
    RootNavigation.navigate('InConstruction' as never, { isSafeToClose } as never);
  };

  const value = useMemo(() => ({ show }), [show]);

  return <InConstructionContext.Provider value={value}>{children}</InConstructionContext.Provider>;
};

export const useInConstruction = () => React.useContext(InConstructionContext);
