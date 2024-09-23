import { createSlice } from "@reduxjs/toolkit";
// import { DEFAULT_ITEMS } from "../data/items";

const userDetail = createSlice({
    name: 'user',
    initialState:  [
       
      ],
    reducers: {
        addUserDetail: (state,action) => {


            state.push(action.payload)
            


        }

    }

})
export default userDetail;//passed to the store side
export const userAction = userDetail.actions //to the client(Provider) side
