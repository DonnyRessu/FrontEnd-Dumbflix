import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import { BrowserRouter as Router } from 'react-router-dom';
import { ModalContextProvider } from './Context/ModalContext';
import { UserContextProvider } from './Context/UserContext';
import { QueryClient, QueryClientProvider } from 'react-query';

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ModalContextProvider>
      <UserContextProvider>
        <QueryClientProvider client={client}>
          <Router>
            <App />
          </Router>
        </QueryClientProvider>
      </UserContextProvider>
    </ModalContextProvider>
  </React.StrictMode>
);
