import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";

const initialState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { userId, id: productId } = action.payload;

      if (!userId) {
        toast.error("Please log in to add products.");
        return;
      }

      const exists = state.find(
        (item) => item.userId === userId && item.productId === productId
      );

      if (exists) {
        toast.error("This product is already in your cart.");
      } else {
        state.push({
          id: `${Date.now()}-${nanoid()}`,
          userId,
          productId,
          quantity: 1,
          ...action.payload,
        });
        toast.success("Product added to cart.");
      }
    },

    incrementQuantity: (state, action) => {
      return state.map((item) =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    },

    decrementQuantity: (state, action) => {
      return state
        .map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);
    },

    removeItem: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addToCart, incrementQuantity, decrementQuantity, removeItem } =
  cartSlice.actions;
const selectCart = (state) => state.cart;

export const makeSelectCartByUserId = (userId) =>
  createSelector([selectCart], (cart) =>
    cart.filter((item) => item.userId === userId)
  );

export const makeSelectCartItemCount = (userId) =>
  createSelector([makeSelectCartByUserId(userId)], (userCart) =>
    userCart.reduce((total, item) => total + item.quantity, 0)
  );

export const makeSelectIsProductInCart = (userId, productId) =>
  createSelector([selectCart], (cart) =>
    cart.some((item) => item.userId === userId && item.productId === productId)
  );
export const makeSelectCartSubtotal = (userId) =>
  createSelector([makeSelectCartByUserId(userId)], (userCart) =>
    userCart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );
export default cartSlice.reducer;
