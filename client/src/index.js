import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { CartProvider } from './components/CartContext';

ReactDOM.render(
  <React.StrictMode>
  <CartProvider>
    <App />
  </CartProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
