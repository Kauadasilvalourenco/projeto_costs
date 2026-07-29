import { StrictMode } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { MessageProvider } from "./context/MessageProvider.jsx";
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <MessageProvider>
        <App />
      </MessageProvider>
    </Router>
  </StrictMode>,
)
