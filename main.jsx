window.onerror = function(msg, url, line) {
  document.body.innerHTML = `<div style="background:white;color:red;padding:20px;font-family:sans-serif;"><h2>Error Found:</h2><p>${msg}</p><p>Line: ${line}</p></div>`;
};

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import LandingPage from './LandingPage'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LandingPage/>
  </React.StrictMode>,
)
