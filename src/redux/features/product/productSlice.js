import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import axios from "axios";
import { nanoid } from "nanoid";

// Async thunk to fetch initial products data
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    const { data } = await axios.get("https://fakestoreapi.com/products");
    return data.map((product) => ({
      id: product.id,
      name: product.title,
      price: product.price,
      category: product.category,
      description: product.description,
      imageUrl: [product.image],
      date: new Date().toISOString().split("T")[0],
    }));
  }
);

const initialState = {
  items: [],
  status: "idle",
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addNewProduct: {
      reducer(state, action) {
        state.items.unshift(action.payload);
      },
      prepare(product) {
        return {
          payload: {
            id: `${Date.now()}-${nanoid()}`,
            ...product,
          },
        };
      },
    },

    // Update existing product
    updateProduct: (state, action) => {
      const index = state.items.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = {
          ...state.items[index],
          ...action.payload,
        };
      }
    },

    // Delete a product
    deleteProduct: (state, action) => {
      state.items = state.items.filter((p) => p.id !== action.payload);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        const existingIds = new Set(state.items.map((p) => p.id));
        const incoming = action.payload.filter(
          (product) => !existingIds.has(product.id)
        );
        state.items = [...state.items, ...incoming].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addNewProduct, updateProduct, deleteProduct } =
  productSlice.actions;

// Selectors
export const selectProducts = (state) => state.product.items;
export const selectProductStatus = (state) => state.product.status;
export const selectProductError = (state) => state.product.error;
export const makeSelectProductsByUserId = (userId) =>
  createSelector([(state) => state.product.items], (items) =>
    items.filter((p) => p.userId === userId)
  );

export default productSlice.reducer;
