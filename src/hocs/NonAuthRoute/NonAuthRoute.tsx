import React from 'react';

interface NonAuthRouteProps {
  element: any;
}

const NonAuthRoute = ({ element: Component }: NonAuthRouteProps) => {
  return <Component />;
};

export default NonAuthRoute;
