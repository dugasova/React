import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomeRoute from './routes/HomeRoute';
import CountriesRoute from './routes/CountriesRoute';
import ErrorRoute from './routes/ErrorRoute';
import Layout from './pages/Layout';
import CountryRoute from './routes/CountryRoute';

export default function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout/>,
      children: [
        {
          path: '/',
          element: <HomeRoute/>
        },
        {
          path: 'countries',
          element: <CountriesRoute/>
        },
        {
          path: 'country/:id',
          element: <CountryRoute/>
        },
      ],
      errorElement: <ErrorRoute />
    }
    
  ])
  return <RouterProvider router={router}/>
}
