import React from 'react';
import { debugContextDevtool } from 'react-context-devtool';
import ReactDOM from 'react-dom';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import {GOOGLE_API_KEY} from './env'

const container = document.getElementById('root')
ReactDOM.render(
  //<React.StrictMode>
    <>
      <script src={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`} ></script>
      <App />
    </>
  //</React.StrictMode>
  ,
  container
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// Attach root container
debugContextDevtool(container);

