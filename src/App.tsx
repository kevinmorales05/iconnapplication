import React from 'react';
import { Provider } from 'react-redux';
import NavContainer from 'navigation/NavContainer';
import { store } from 'rtk';
import { AlertContextProvider, EnterModalContextProvider, LoadingContextProvider, ToastContextProvider } from 'context';
import { Toast } from 'context';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

let persistor = persistStore(store);

const App: React.FC = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ToastContextProvider>
        <Toast />
        <LoadingContextProvider>
          <EnterModalContextProvider>
            <AlertContextProvider>
              <NavContainer />
            </AlertContextProvider>
          </EnterModalContextProvider>
        </LoadingContextProvider>
      </ToastContextProvider>
    </PersistGate>
  </Provider>
);

export default App;
