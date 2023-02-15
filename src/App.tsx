import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import NavContainer from 'navigation/NavContainer';
import { store } from 'rtk';
import {
  AlertContextProvider,
  EnterModalContextProvider,
  InConstructionContextProvider,
  LoadingContextProvider,
  ToastContextProvider,
  WelcomeModalContextProvider,
  Toast
} from 'context';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { PermissionsProvider } from 'context/permissions.context';
import { enableLatestRenderer } from 'react-native-maps';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { NotificationListener, requestUserPermission } from 'utils/notification-helper';

enableLatestRenderer();

let persistor = persistStore(store);

const App: React.FC = () => {
  useEffect(() => {
    requestUserPermission();
    NotificationListener();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <PermissionsProvider>
          <ToastContextProvider>
            <Toast />
            <LoadingContextProvider>
              <EnterModalContextProvider>
                <WelcomeModalContextProvider>
                  <InConstructionContextProvider>
                    <AlertContextProvider>
                      <BottomSheetModalProvider>
                        <NavContainer />
                      </BottomSheetModalProvider>
                    </AlertContextProvider>
                  </InConstructionContextProvider>
                </WelcomeModalContextProvider>
              </EnterModalContextProvider>
            </LoadingContextProvider>
          </ToastContextProvider>
        </PermissionsProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;