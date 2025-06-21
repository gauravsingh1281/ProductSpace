import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";

const wishlist = createSlice({
  name: "wishlist",
  initialState: [],
  reducers: {
    toggleWishlist: (state, action) => {
      const { userId, id: productId } = action.payload;
      const index = state.findIndex(
        (item) => item.userId === userId && item.productId === productId
      );

      if (index !== -1) {
        state.splice(index, 1);
        toast.success("Product removed from wishlist");
      } else {
        state.push({
          id: `${Date.now()}-${nanoid()}`,
          userId,
          productId,
          ...action.payload,
        });
        toast.success("Product added to the wishlist");
      }
    },
  },
});

export const { toggleWishlist } = wishlist.actions;
// All wishlist item
export const selectWishlist = (state) => state.wishlist;
// wishlist of particular user
export const makeSelectWishlistByUserId = (userId) =>
  createSelector([selectWishlist], (wishlist) =>
    wishlist.filter((item) => item.userId === userId)
  );
// for wishlist toggle
export const isProductInWishlist = (state, userId, productId) =>
  state.wishlist?.some(
    (item) => item.userId === userId && item.productId === productId
  );
export default wishlist.reducer;
