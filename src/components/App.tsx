import React from 'react';
import 'components/App.scss';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Routes from 'routes/index';
import { store } from 'src/store';

const App: React.FC = function () {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes/>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
