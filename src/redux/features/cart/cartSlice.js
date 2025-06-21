import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";
const initialState = [];
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const isExisted = state.find(
        (product) => product.productId === action.payload.id
      );
      if (isExisted) {
        toast.error("This product is already added to cart.");
      } else {
        state.push({
          id: Date.now() + nanoid(),
          ...action.payload,
          productId: action.payload.id,
          quantity: 1,
        });
        toast.success("Product added to cart.");
      }
    },
    incrementQuantity: (state, action) => {
      const product = state.find((product) => product.id === action.payload);
      if (product) product.quantity++;
    },
    decrementQuantity: (state, action) => {
      const productIndex = state.findIndex(
        (product) => product.id === action.payload
      );
      if (productIndex !== -1) {
        if (state[productIndex].quantity > 1) {
          state[productIndex].quantity--;
        } else {
          state.splice(productIndex, 1);
        }
      }
    },
    removeItem: (state, action) => {
      return state.filter((product) => product.id !== action.payload);
    },
  },
});
export const { addToCart, incrementQuantity, decrementQuantity, removeItem } =
  cartSlice.actions;
export default cartSlice.reducer;
