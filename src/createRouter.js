import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import Calculator from './pages/Calculator';
import About from './pages/About';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Calculator />,
      },
      {
        path: 'about',
        element: <About />,
      },
    ],
  },
]);

export default router;
