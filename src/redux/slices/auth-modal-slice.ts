import { createSlice } from "@reduxjs/toolkit";

type AuthModalState = {
  isOpen: boolean;
  mode: "login" | "signup";
};

const initialState: AuthModalState = {
  isOpen: false,
  mode: "login",
};

const authModalSlice = createSlice({
  name: "authModal",
  initialState,
  reducers: {
    openAuthModal: (state, action) => {
      state.isOpen = true;
      state.mode = action.payload;
    },
    closeAuthModal: (state) => {
      state.isOpen = false;
    },
  },
});

export default authModalSlice.reducer;
export const { openAuthModal, closeAuthModal } = authModalSlice.actions;
