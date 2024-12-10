import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Асинхронное получение продуктов с API
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get("https://fakestoreapi.com/products");
    return response.data;
  }
);

const productSlice = createSlice({
  name: "products",
  //idle- начальное состояние, когда ничего не происходит
  initialState: { list: [], status: "idle", error: null },
  reducers: {
    toggleLike: (state, action) => {
      const product = state.list.find((p) => p.id === action.payload);
      if (product) product.liked = !product.liked;
    },
    deleteProduct: (state, action) => {
      state.list = state.list.filter((p) => p.id !== action.payload);
    },
    addProduct: (state, action) => {
      state.list.push(action.payload);
    },
    editProduct: (state, action) => {
      const index = state.list.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) state.list[index] = action.payload;
    },
  },
  extraReducers: (builder) => {
    //builder - объект (Redux Toolkit), который помогает описывать логику для разных состояний асинхронного действия
    //addCase - обновляет состояние
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload.map((product) => ({
          ...product,
          liked: false,
        })); // Добавляем поле `liked`
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { toggleLike, deleteProduct, addProduct, editProduct } =
  productSlice.actions;
export default productSlice.reducer;
