import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import AppContextProvider from './context/AppContext';
import { AuthContextProvider } from './context/AuthContext';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AuthContextProvider>
    <AppContextProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <App />
      </QueryClientProvider>
    </AppContextProvider>
  </AuthContextProvider>
)
