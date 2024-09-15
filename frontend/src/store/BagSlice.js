import { createSlice } from "@reduxjs/toolkit";
// import { DEFAULT_ITEMS } from "../data/items";

const bagSlice = createSlice({
    name: 'bag',
    initialState: [],
    reducers: {
        cartItems: (state, action) => {
state.push(action.payload)
// return state

},
addToBag: (state, action) => {
           
    state[0].push(action.payload)
    console.log(state)
    

        },
        removeToBag: (state, action) => {
          
          state[0] =  state[0].filter(itemId => itemId.id !== action.payload)


        }

    }

})
export default bagSlice;//passed to the store side
export const bagActions = bagSlice.actions //to the client(Provider) side
