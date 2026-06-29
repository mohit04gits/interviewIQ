// import { createSlice } from "@reduxjs/toolkit";




// const userSlice = createSlice({
//     name:"user",
//     initialState:{
//         userData:null
//     },
//     reducers:{
//         setUserData:(state,action)=>{
//             state.userData = action.payload
//         }
//     }
// })

// export const {setUserData} = userSlice.actions
// export default userSlice

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { setUserData } = userSlice.actions;

export default userSlice.reducer;