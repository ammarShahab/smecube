import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';
import { AuthProvider } from './context/AuthContext';
import GlobalVideoCallNotification from './components/notifications/GlobalVideoCallNotification';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <GlobalVideoCallNotification />
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);



