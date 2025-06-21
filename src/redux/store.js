import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/features/user/userSlice";
import productReducer from "../redux/features/product/productSlice";
import cartReducer from "../redux/features/cart/cartSlice";
import wishlistReducer from "../redux/features/wishlist/wishlistSlice";
let savedState;
try {
  const raw = localStorage.getItem("ShoppingCartState");
  if (raw) savedState = JSON.parse(raw);
} catch (err) {
  console.warn("Could not parse persisted state:", err);
  savedState = undefined;
}
const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
  preloadedState: savedState,
});
store.subscribe(() => {
  try {
    localStorage.setItem("ShoppingCartState", JSON.stringify(store.getState()));
  } catch (err) {
    console.warn("Could not save state:", err);
  }
});
export default store;
