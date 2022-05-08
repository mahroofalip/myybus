import React from "react";
import "./index.css";
import App from "./App";
import { createRoot } from 'react-dom/client';
// import store from './redux/Store'
// import { Provider } from 'react-redux'

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  
        <App />
   
);
