import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orderPlaced: true,  // Default state is true (before placing an order)
  },
  reducers: {
    placeOrder(state) {
      state.orderPlaced = false;  // Set it to false when an order is placed
    },
    maketrue: (state) => {
      state.orderPlaced = true;
  },
  },
});

export const { placeOrder,maketrue } = orderSlice.actions;
export default orderSlice.reducer;
