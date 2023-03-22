import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalItemCount: 0,
  },
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;

      // Check if the item already exists in the cart
      const existingItem = state.items.find(
        (cartItem) => cartItem.id === item.id
      );

      // If the item exists, increase the quantity
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        // If the item doesn't exist, add it to the cart with a quantity of 1
        state.items.push({ ...item, quantity: 1 });
      }

      // Increase the total item count
      state.totalItemCount += 1;
    },

    removeItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find(
        (cartItem) => cartItem.id === item.id
      );
      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.items = state.items.filter(
            (cartItem) => cartItem.id !== item.id
          );
        } else {
          existingItem.quantity--;
        }
        state.totalItemCount--;
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalItemCount = 0;
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
