import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(
  <React.StrictMode>
    <Routes>
    </Routes>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.register();
