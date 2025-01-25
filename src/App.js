import React from 'react';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { store } from './redux/store';
import AdminDashboard from './components/AdminDashboard';
import CategoryManagement from './components/CategoryManagement';
import RecipeManagement from './components/RecipeManagement';
import OrderManagement from './components/OrderManagement';
import Header from './components/Header';
import Log from './components/Log';
import AdminHeader from './components/AdminHeader';
const logNavbar = <Header/>
const adminheader = <AdminHeader/>
const router = createBrowserRouter([
  {
    path: "/",
    element: <div>{logNavbar}<Log/></div>,
  },
  {
    path: "/dashboard",
    element: <div>{adminheader}<AdminDashboard/></div>,
  },
  {
    path: "/categories",
    element: <div>{adminheader}<CategoryManagement /></div>,
  },
  {
    path: "/recipes",
    element: <div>{adminheader}<RecipeManagement /></div>,
  },
  {
    path: "/orders",
    element: <div>{adminheader}<OrderManagement /></div>,
  },
]);

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
