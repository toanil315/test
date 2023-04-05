import loadable from '@loadable/component';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';
import { DefaultLayout } from '@/layouts';
import { ROUTES, prefixPath, prefixPathAdmin } from '@/constants';
import { NonAuthRoute } from '@/hocs';
import { NotFound } from '@/pages';

const Home = loadable(() => import('@/pages/Home'));

const routeList: RouteObject[] = [
  {
    path: prefixPath,
    element: <DefaultLayout />,
    children: [
      // PUBLIC routes
      {
        path: ROUTES.HOME,
        element: <NonAuthRoute element={Home} />,
      },
    ],
  },

  {
    path: prefixPathAdmin,
    element: <DefaultLayout />,
    children: [
      // ADMIN routes
    ],
  },

  {
    path: ROUTES.ERROR,
    element: <NotFound />,
  },

  {
    path: '*',
    element: (
      <Navigate
        to={ROUTES.ERROR}
        replace
      />
    ),
  },
];

const Routes = () => {
  const element = useRoutes(routeList);
  return element;
};

export default Routes;
