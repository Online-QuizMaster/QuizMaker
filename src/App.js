import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import CreateAccount from './components/CreateAccount';
import Login from './components/Login';         
import QuizDashboard from './components/QuizDashboard';

const BlankLayout = () => {
  return (
    <>
      <Header />
      <main>
        <div className="bg-overlay"></div>
        <Outlet />
      </main>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      { path: '/', element: <Home /> },
      {path: '/quiz', element:<QuizDashboard/>}
    ],
  },
  {
    path: '/signup',
    element: <CreateAccount />,
  },
  {path:'/login',
    element:<Login/>
  },
  
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;