import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';

import App from './app';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <>
    <App />
    <ToastContainer position="bottom-center" />
  </>,
);

if (location.hostname !== 'localhost' && 'serviceWorker' in navigator) {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      if (!navigator.onLine) {
        window.location.href = '/offline.html';
      }

      const url = window.location.origin + '/sw.js';
      navigator.serviceWorker
        .register(url)
        .then(registration => {
          console.log('✅ Service Worker registered with scope:', registration.scope);
        })
        .catch(error => {
          console.error('❌ Service Worker registration failed:', error);
        });
    });
  }
}
