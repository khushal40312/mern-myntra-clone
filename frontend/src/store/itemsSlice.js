import { createSlice } from "@reduxjs/toolkit";
// import { DEFAULT_ITEMS } from "../data/items";

const itemsSlice = createSlice({
    name: 'items',
    initialState:  [
       
      ],
    reducers: {
        addInitialItems: (store,action) => {

            // console.log(action.payload)
            return action.payload
        },

        removeItem: (store, action) => {
            const itemId = action.payload;
            return store.filter(item => item.id !== itemId);
        },
        addItem: (store, action) => {
            store.push(action.payload);
        }
    }

})
export default itemsSlice;//passed to the store side
export const itemsActions = itemsSlice.actions //to the client(Provider) side
