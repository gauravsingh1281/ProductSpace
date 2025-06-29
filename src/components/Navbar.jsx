import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/features/user/userSlice";
import {
  makeSelectCartItemCount,
  makeSelectCartSubtotal,
  makeSelectCartByUserId,
} from "../redux/features/cart/cartSlice";
import { useMemo } from "react";
import { FaBars } from "react-icons/fa";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loggedInUser = useSelector((state) =>
    state.user.find((user) => user.isLogin)
  );

  const selectItemCount = useMemo(
    () => makeSelectCartItemCount(loggedInUser?.id),
    [loggedInUser?.id]
  );

  const selectSubtotal = useMemo(
    () => makeSelectCartSubtotal(loggedInUser?.id),
    [loggedInUser?.id]
  );

  const selectUserCart = useMemo(
    () => makeSelectCartByUserId(loggedInUser?.id),
    [loggedInUser?.id]
  );

  const itemCount = useSelector(selectItemCount);
  const subtotal = useSelector(selectSubtotal);
  const userCart = useSelector(selectUserCart);

  const handleLogout = () => {
    dispatch(logoutUser(loggedInUser.id));
    navigate("/login");
  };

  return (
    <header className="navbar bg-indigo-900 px-4 py-2 text-white shadow-sm">
      <div className="flex-1">
        <NavLink to="/" className="text-xl font-bold hover:underline">
          ProductSpace
        </NavLink>
      </div>

      {/* Mobile Hamburger Menu */}
      <div className="dropdown sm:hidden">
        <div tabIndex={0} role="button" className="btn btn-ghost">
          <FaBars className="text-white" size={20} />
        </div>
        <ul
          tabIndex={0}
          className="menu dropdown-content right-0 z-20 mt-3 w-52 rounded-box bg-white text-black shadow-lg"
        >
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/products">Products</NavLink>
          </li>
          {loggedInUser ? (
            <>
              <li>
                <NavLink to="/wishlist">Wishlist</NavLink>
              </li>
              <li>
                <NavLink to="/profile">Profile</NavLink>
              </li>
              <li>
                <NavLink to="/addProduct">Add Product</NavLink>
              </li>
              <li>
                <NavLink to="/myListedProducts">My Listed Products</NavLink>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          )}
        </ul>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden sm:flex items-center space-x-4">
        <NavLink to="/" className="hover:text-yellow-500">
          Home
        </NavLink>
        <NavLink to="/products" className="hover:text-yellow-500">
          Products
        </NavLink>

        {loggedInUser && (
          <NavLink to="/wishlist" className="hover:text-yellow-500">
            Wishlist
          </NavLink>
        )}

        {/* Cart */}
        {loggedInUser && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">
                  {itemCount}
                </span>
              </div>
            </div>

            <div
              tabIndex={0}
              className="card card-compact dropdown-content bg-base-100 z-20 mt-3 w-52 shadow text-black"
            >
              <div className="card-body">
                <span className="text-lg font-bold">
                  {userCart.length} Items
                </span>
                <span className="text-info">
                  Subtotal: ₹{subtotal.toFixed(2)}
                </span>
                <div className="card-actions">
                  <button
                    onClick={() => navigate("/cart")}
                    className="btn btn-primary btn-block"
                  >
                    View cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Avatar */}
        {loggedInUser ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt={`${loggedInUser.userFullName}-img`}
                  src={loggedInUser.userImage}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 text-black rounded-box z-20 mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink to="/profile">Profile</NavLink>
              </li>
              <li>
                <NavLink to="/addProduct">Add Product</NavLink>
              </li>
              <li>
                <NavLink to="/myListedProducts">My Listed Products</NavLink>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <NavLink to="/login" className="btn btn-outline btn-sm">
            Login
          </NavLink>
        )}
      </div>
    </header>
  );
};

export default Navbar;
