import React from 'react';
import { Provider } from 'react-redux';
import NavContainer from 'navigation/NavContainer';
import { store } from 'rtk';
import { AlertContextProvider, LoadingContextProvider } from 'context';

const App: React.FC = () => (
  <Provider store={store}>
    <LoadingContextProvider>
      <AlertContextProvider>
        <NavContainer />
      </AlertContextProvider>
    </LoadingContextProvider>
  </Provider>
);

export default App;
