import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import {Provider} from "react-redux"
import store from "./Redux/store"

ReactDOM.render(
  
    <Provider store={store}>
    <App />
    </Provider>
 ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))

