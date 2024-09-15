import { configureStore } from "@reduxjs/toolkit";
import itemsSlice from "./itemsSlice";
import fetchStatusSlice from "./fetchStatusSlice";
import bagSlice from "./BagSlice";
import authSlice from "./authSlice";
import userDetail from "./userDetail";
import alertReducer from './alertSlice';



const myntrastore = configureStore({
  reducer: {
    items: itemsSlice.reducer,
    fetchStatus: fetchStatusSlice.reducer,
    bag: bagSlice.reducer,
    auth: authSlice,
    user:userDetail.reducer,
    alert: alertReducer,
  },
});

export default myntrastore;
