import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LoginPage from './pages/LoginPage';
import ContactPage from './pages/ContactPage';
import ApplyPage from './pages/ApplyPage';
import EventsPage from './pages/EventsPage';
import NavBar from './components/Navbar/Navbar';



import { AuthProvider } from './components/AuthProvider.jsx';
import HomePage from './pages/HomePage/HomePage.jsx';




const router = createBrowserRouter([
  {
    path:"/",
    element:<NavBar />,
    children: [
      {path:"/",element:<HomePage />},
      // {path:"/about",element:<AboutPage />},
      {path:"/apply",element:<ApplyPage />},
      {path:"/login",element:<LoginPage />},
      {path:"/contact",element:<ContactPage />},
      {path:"/events",element:<EventsPage />},

    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
