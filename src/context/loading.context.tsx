import React, { ReactNode, useMemo, useState } from 'react';
import { LoadingInterface } from 'components/organisms/Loading';
import { StyleSheet, View, Image } from 'react-native';
import { ICONN_LOADER, ICONN_LOADER_ECOMMERCE } from 'assets/images';
import { CustomText } from 'components';

interface Props {
  children: ReactNode;
}

interface LoadingContextInterface {
  show: (message?: string, variant?: string) => void;
  hide: () => void;
}

export const LoadingContext = React.createContext<LoadingContextInterface>({} as LoadingContextInterface);

const initialState: LoadingInterface = { visible: false, variant: 'default' };

export const LoadingContextProvider = ({ children }: Props) => {
  const [loadingState, setLoadingState] = useState<LoadingInterface>(initialState);

  const show = (message?: string, variant?: string) => {
    setLoadingState({ visible: true, message, variant });
  };

  const hide = () => setLoadingState(initialState);

  const value = useMemo(() => ({ show, hide }), [show, hide]);

  return (
    <LoadingContext.Provider value={value}>
      {children}
      {loadingState.visible && (
        <View style={styles.container}>
          {loadingState.variant === 'ecommerce' ? <Image source={ICONN_LOADER_ECOMMERCE} /> : <Image source={ICONN_LOADER} />}
          {loadingState.variant === 'ecommerce' && (
            <View
              style={{
                position: 'absolute',
                bottom: '33%',
                width: 200
              }}
            >
              <CustomText textAlign="center" numberOfLines={3} fontSize={20} fontBold text="Estamos buscando tu 7-Eleven más cercano" />
            </View>
          )}
        </View>
      )}
    </LoadingContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export const useLoading = () => React.useContext(LoadingContext);
