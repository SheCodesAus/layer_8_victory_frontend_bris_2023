import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { AuthProvider } from './components/AuthProvider.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import ApplyPage from './pages/ApplyPage.jsx';
import EventsPage from './pages/EventsPage.jsx';
import NavBar from './components/NavBar/NavBar.jsx';



const router = createBrowserRouter([
  {
    path:"/",
    element:<NavBar />,
    children: [
      // {path:"/",element:<HomePage />},
      // {path:"/about",element:<AboutPage />},
      {path:"/apply",element:<ApplyPage />},
      {path:"/login",element:<LoginPage />},
      {path:"/contact",element:<ContactPage />},
      {path:"/events",element:<EventsPage />},
    ],
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
