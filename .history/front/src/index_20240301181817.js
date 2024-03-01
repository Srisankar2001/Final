import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
  //  </React.StrictMode> oru network request sariya pochutha illya endratha sothikka 2 thadava request anuppum
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
