import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppContextProvider } from './contexts/AppContext';
import { AuthContextProvider } from './contexts/AuthContext';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <AppContextProvider>
          <Toaster />
          <App />
        </AppContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
