import { createSlice } from "@reduxjs/toolkit";

export const UserLogin = createSlice({
  name: "userLogin",
  initialState: {
    
    userLogged: false,
    
  },
  reducers: {
    
    setUserLogged: (state, action) => {
      state.userLogged = action.payload;
    },
   
  },
});

export const { setUserLogged } = UserLogin.actions;
export default UserLogin.reducer;
