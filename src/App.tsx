import React from 'react';
import { Provider } from 'react-redux';
import NavContainer from 'navigation/NavContainer';
import { store } from 'rtk';
import {
  AlertContextProvider,
  EnterModalContextProvider,
  InConstructionContextProvider,
  LoadingContextProvider,
  ToastContextProvider,
  WelcomeModalContextProvider
} from 'context';
import { Toast } from 'context';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
// import Config from 'react-native-config';

// TODO: remove this:
// console.log('Environment variables:', JSON.stringify(Config, null, 3));

let persistor = persistStore(store);

const App: React.FC = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ToastContextProvider>
        <Toast />
        <LoadingContextProvider>
          <EnterModalContextProvider>
            <WelcomeModalContextProvider>
              <InConstructionContextProvider>
                <AlertContextProvider>
                  <NavContainer />
                </AlertContextProvider>
              </InConstructionContextProvider>
            </WelcomeModalContextProvider>
          </EnterModalContextProvider>
        </LoadingContextProvider>
      </ToastContextProvider>
    </PersistGate>
  </Provider>
);

export default App;
