import React from 'react'
import ReactDOM from 'react-dom/client'
import{ createBrowserRouter, RouterProvider }from"react-router-dom";
import HomePage from './assets/components/pages/Home';
import AboutPage from './assets/components/pages/AboutPage';
import ApplyPage from './assets/components/pages/ApplyPage';
import LoginPage from './assets/components/pages/LoginPage';
import ContactPage from './assets/components/pages/ContactPage';
import NavBar from './assets/components/navbar/navbar';

const router =createBrowserRouter([
  {
    path:"/",
    element:<NavBar />,
    children: [
      {path:"/",element:<HomePage />},
      {path:"/about",element:<AboutPage />},
      {path:"/apply",element:<ApplyPage />},
      {path:"/login",element:<LoginPage />},
      {path:"/contact",element:<ContactPage />},
    ],
  },
]);



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <RouterProvider router={router} />
  </React.StrictMode>,
)
