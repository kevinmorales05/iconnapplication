import React from 'react';
import { Provider } from 'react-redux';
import NavContainer from 'navigation/NavContainer';
import { store } from 'rtk';
import { AlertContextProvider, LoadingContextProvider, ToastContextProvider } from 'context';
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
          <AlertContextProvider>
            <NavContainer />
          </AlertContextProvider>
        </LoadingContextProvider>
      </ToastContextProvider>
    </PersistGate>
  </Provider>
);

export default App;
