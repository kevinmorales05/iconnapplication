import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import { EnterModal } from 'components/organisms/EnterModal';
import { useOnboarding } from 'screens/auth/hooks/useOnboarding';
import * as RootNavigation from '../navigation/RootNavigation';
import { setIsGuest, store } from 'rtk';

export interface EnterModalInterface {
  visible?: boolean;
  secondaryMessage: string;
}

interface EnterModalContextInterface {
  show: (data: EnterModalInterface) => void;
  hide: () => void;
}

interface Props {
  children: ReactNode;
}

export const EnterModalContext = React.createContext<EnterModalContextInterface>({} as EnterModalContextInterface);

const initialState: EnterModalInterface = { visible: false, secondaryMessage: '' };

export const EnterModalContextProvider = ({ children }: Props) => {
  const [enterModalState, setEnterModalState] = useState<EnterModalInterface>(initialState);
  const { getProvidersLoginEffect, providersAuth, authToken } = useOnboarding();

  const show = async (data: EnterModalInterface) => {
    setEnterModalState({ visible: true, secondaryMessage: data.secondaryMessage });
  };

  const hide = () => {
    setEnterModalState(initialState);
  };

  const value = useMemo(() => ({ show, hide }), [show, hide]);

  const onPressSocialButton = (socialMedia: string) => {
    setEnterModalState(initialState);
    store.dispatch(setIsGuest(false));
    setTimeout(() => {
      RootNavigation.navigate('LoginWhitSocialNetwork' as never, { authenticationToken: authToken, providerLogin: socialMedia } as never);
    }, 300);
  };

  const onContinueWithEmail = () => {
    setEnterModalState(initialState);
    store.dispatch(setIsGuest(false));
    setTimeout(() => {
      RootNavigation.navigate('EnterEmail' as never, undefined as never);
    }, 300);
  };

  useEffect(() => {
    getProvidersLoginEffect();
  }, []);

  return (
    <EnterModalContext.Provider value={value}>
      {children}
      {enterModalState.visible && (
        <EnterModal
          visible={enterModalState.visible}
          secondaryMessage={enterModalState.secondaryMessage}
          onPressOut={() => {
            setEnterModalState(initialState);
          }}
          onPressSocialButton={onPressSocialButton}
          onPressEmail={onContinueWithEmail}
          providers={providersAuth}
        />
      )}
    </EnterModalContext.Provider>
  );
};

export const useEnterModal = () => React.useContext(EnterModalContext);
