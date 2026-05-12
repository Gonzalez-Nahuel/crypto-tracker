import { createSlice } from "@reduxjs/toolkit";

type AuthFormState = {
  isOpen: boolean;
  mode: "login" | "signup";
};

const initialState: AuthFormState = {
  isOpen: false,
  mode: "login",
};

const authFormSlice = createSlice({
  name: "authForm",
  initialState,
  reducers: {
    setMode: (state, action) => {
      state.mode = action.payload;
    },
    openAuthForm: (state, action) => {
      state.isOpen = true;
      state.mode = action.payload;
    },
    closeAuthForm: (state) => {
      state.isOpen = false;
    },
  },
});

export default authFormSlice.reducer;
export const { openAuthForm, closeAuthForm, setMode } = authFormSlice.actions;
