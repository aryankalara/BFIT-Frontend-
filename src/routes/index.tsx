import { RouteObject } from 'react-router-dom';
import Dashboard from '../NutritionistPages/Dashboard';
import Layout from '../NutritionistComponents/Layout';
import AddDietPlan from '../NutritionistPages/AddDietPlan';
import Clients from '../NutritionistPages/Clients';
import AddResourceForm from '../NutritionistPages/AddResourceForm';
import Profile from '../NutritionistPages/Profile.tsx';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'diet-plans',
        element: <AddDietPlan/>,
      },
      {
        path: 'users',
        element: <Clients/>,
      },
      {
        path: 'profile',
        element: <Profile/>,
      },
      {
        path: 'add-resource',
        element: <AddResourceForm/>,
      },

    ],
  },
];