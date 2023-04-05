interface AuthRouteProps {
  element: any;
  roles?: string[];
}

function AuthRoute({ element: Component, roles }: AuthRouteProps) {
  return <Component />;
}

export default AuthRoute;
