import React from 'react';
import { Provider } from 'react-redux';
import NavContainer from 'navigation/NavContainer';
import { store } from 'rtk';

const App: React.FC = () => (
  <Provider store={store}>
    <NavContainer />
  </Provider>
);

export default App;
