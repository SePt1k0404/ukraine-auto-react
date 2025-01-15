import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './reset.css';
import App from './App.js';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store.js';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error(
    "Root element not found. Please ensure the element with id 'root' exists in your HTML.",
  );
}

createRoot(rootElement).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
