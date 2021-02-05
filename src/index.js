import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './mock/TestMock'
// import http from "./api/http";
// http.get('api/getVideoList').then(res => {
//   console.log(res);
// })
// console.log(React)
// React.__proto__.$http = http;

ReactDOM.render(
  
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
