import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import checkSubset from 'utils/checkSubset';

export default function PrivateRoute({ requiredPermissions, children }) {
  const user = useSelector((state) => state.auth.user);
  const isAuth = Boolean(useSelector((state) => state.auth.token));
  const location = useLocation();

  if (!(user && isAuth)) {
    return (
      <Navigate
        replace={true}
        state={{
          return_url: location.pathname + location.search,
        }}
        to="/auth/login"
      />
    );
  }

  if (
    requiredPermissions &&
    !checkSubset(user.role.permissions, requiredPermissions)
  ) {
    return (
      <Navigate
        to="/unauthorized"
        state={{
          return_url: location.pathname + location.search,
        }}
        replace={true}
      />
    );
  }

  return children;
}
