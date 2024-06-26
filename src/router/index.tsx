import Layout from '@/Layout';
import DispatchPage from '@/pages/dispatchPage';
import HomePage from '@/pages/home';
import LoginPage from '@/pages/loginPage';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <HomePage />,
            },
            {
                path: '/login',
                element: <LoginPage />,
            },
            {
                path: '/dispatch',
                element: <DispatchPage />,
            },
        ],
    },
]);
