import React from 'react';
import { Provider } from 'react-redux';
import NavContainer from 'navigation/NavContainer';
import { store } from 'rtk';
import { AlertContextProvider, LoadingContextProvider, ToastContextProvider } from 'context';
import { Toast } from 'context';

const App: React.FC = () => (
  <Provider store={store}>
    <ToastContextProvider>
    <Toast />
      <LoadingContextProvider>
        <AlertContextProvider>
          <NavContainer />
        </AlertContextProvider>
      </LoadingContextProvider>
    </ToastContextProvider>
  </Provider>
);

export default App;
