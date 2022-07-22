import React, { ReactNode, useMemo, useState } from 'react';
import { LoadingInterface } from 'components/organisms/Loading';
import { ActivityIndicator, StyleSheet, View, Image } from 'react-native';
import theme from 'components/theme/theme';

interface Props {
  children: ReactNode
}

interface LoadingContextInterface {
  show: (message?: string) => void,
  hide: () => void
}

export const LoadingContext = React.createContext<LoadingContextInterface>({} as LoadingContextInterface);

const initialState: LoadingInterface = { visible: false };

export const LoadingContextProvider = ({ children }: Props) => {
  const [loadingState, setLoadingState] = useState<LoadingInterface>(initialState);

  const show = (message?: string) => {
    setLoadingState({ visible: true, message });
  };

  const hide = () => setLoadingState(initialState);

  const value = useMemo(() => ({ show, hide }), [show, hide]);

  return (
    <LoadingContext.Provider value={value}>
      {children}
      { loadingState.visible
        && (
          <View style={styles.container}>
            <Image source={require("../assets/videos/iconn-loader.gif")}/>
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
