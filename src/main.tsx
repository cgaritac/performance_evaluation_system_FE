import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Modal from 'react-modal';
import '~/shared/styles/index.css';
import App from '~/app';

Modal.setAppElement('#root');

const rootElement = document.getElementById('root');

createRoot(rootElement!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
