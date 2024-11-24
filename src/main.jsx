import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './components/styles/index.css';
import './components/styles/tailwind.css';
import Router from './components/router/Router.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router />
  </StrictMode>
);
