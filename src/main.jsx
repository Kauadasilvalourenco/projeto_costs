import { StrictMode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { MessageProvider } from "./context/MessageProvider.jsx";
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider
      client={queryClient}
    >
      <Router>
        <MessageProvider>
          <App />
        </MessageProvider>
      </Router>
    </QueryClientProvider>
  </StrictMode>,
)
