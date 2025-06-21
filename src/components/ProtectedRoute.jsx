import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) =>
    state.user.some((user) => user.isLogin === true)
  );
  const location = useLocation(); // current route info

  if (!isLoggedIn) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }} // pass original location
      />
    );
  }

  return children;
};

export default ProtectedRoute;
