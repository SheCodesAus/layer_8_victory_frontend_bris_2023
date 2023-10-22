import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { AuthProvider } from './components/AuthProvider.jsx';
import HomePage from './pages/HomePage/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import ApplyPage from './pages/ApplyPage.jsx';
import EventsPage from './pages/EventsPage.jsx';
import NavBar from './components/NavBar/NavBar.jsx';
import Footer from './components/Footer/Footer.jsx';
import AboutPage from './pages/AboutPage/AboutPage.jsx';
import NotFound404Page from './components/NotFound404Page/NotFound404Page.jsx';
import EventDashboard from './components/EventDashboard/EventDashboard.jsx';
import MentorDashboard from './components/MentorDashboard/MentorDashboard.jsx';



const router = createBrowserRouter([
  {
    path:"/",
    element: (
      <div>
        <NavBar />
        <Footer />
      </div>
    ),
    children: [
      {path:"/",element:<HomePage />},
      {path:"/about",element:<AboutPage />},
      {path:"/apply",element:<ApplyPage />},
      {path:"/login",element:<LoginPage />},
      {path:"/contact",element:<ContactPage />},
      {path:"/events",element:<EventsPage />},
      {path:"*",element:<NotFound404Page />},
      {path: "/event-dashboard", element: <EventDashboard />},
      {path: "/mentor-dashboard", element: <MentorDashboard />}
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
