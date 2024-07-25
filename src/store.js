import { configureStore } from "@reduxjs/toolkit";
import UserLogin from "./Slice/UserLogin";


export default configureStore({
    reducer: {
      userLogin: UserLogin,
    },
  });