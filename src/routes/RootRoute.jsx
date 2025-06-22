import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Spinner from "../components/Spinner";

const RootLayout = lazy(() => import("../layout/RootLayout"));
const Home = lazy(() => import("../pages/Home"));
const Product = lazy(() => import("../pages/Product"));
const Cart = lazy(() => import("../pages/Cart"));
const Register = lazy(() => import("../pages/Register"));
const Login = lazy(() => import("../pages/Login"));
const Wishlist = lazy(() => import("../pages/Wishlist"));
const Profile = lazy(() => import("../pages/Profile"));
const AddProduct = lazy(() => import("../pages/AddProduct"));
const UserListedProduct = lazy(() => import("../pages/UserListedProducts"));
const EditProductDetails = lazy(() => import("../pages/EditProductDetails"));
const ProtectedRoute = lazy(() => import("../components/ProtectedRoute"));

const RootRoute = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<Product />} />
          <Route
            path="/wishlist"
            element={
              <ProtectedRoute>
                <Wishlist />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addProduct"
            element={
              <ProtectedRoute>
                <AddProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute>
                <EditProductDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/myListedProducts"
            element={
              <ProtectedRoute>
                <UserListedProduct />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default RootRoute;
