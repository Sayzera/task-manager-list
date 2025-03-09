import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  userData: Cookies.get("userData")
    ? JSON.parse(Cookies.get("userData") as string)
    : null,
};

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
      Cookies.set("userData", JSON.stringify(action.payload));
    },
    removeUserData: (state) => {
      state.userData = null;
      Cookies.remove("userData");
    },
  },
});



export const { setUserData, removeUserData } = mainSlice.actions;
export default mainSlice.reducer;


// selector 
export const selectUserData = (state: any) => state.main.userData;