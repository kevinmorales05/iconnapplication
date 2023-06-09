import React, { ReactNode, useMemo, useState } from 'react';
import { LoadingInterface } from 'components/organisms/Loading';
import { StyleSheet, View } from 'react-native';
import { CustomText } from 'components';
import LottieView from 'lottie-react-native'

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
          <LottieView
              style={{width:250, height:250}}
              source={require('../assets/images/iconn-loader-ecommerce.json')}
              autoPlay
              loop
          />
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
