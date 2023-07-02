import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function PrivateRoute({ children }) {
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
  return children;
}
