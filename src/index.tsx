import React from 'react';
import ReactDOM from 'react-dom';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { Provider } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { App } from './App';
import { store, persistor } from './reducers';
import {PersistGate} from "redux-persist/integration/react";

library.add(fas);

ReactDOM.render(
  <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
  </Provider>,
  document.getElementById('root'),
);
