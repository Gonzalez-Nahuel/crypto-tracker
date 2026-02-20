import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type AuthState = {
  session: boolean;
  email: string | null;
  username: string | null;
};

const initialState: AuthState = {
  session: false,
  email: null,
  username: null,
};

export const fetchMe = createAsyncThunk(
  "auth/fetchMe",
  async (_, { rejectWithValue }) => {
    const res = await fetch("/api/auth/me", {
      credentials: "include",
    });

    if (!res.ok) return rejectWithValue(null);

    const data = await res.json();

    return data;
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearUser: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMe.fulfilled, (_, action) => ({
        session: true,
        email: action.payload.email,
        username: action.payload.username,
      }))
      .addCase(fetchMe.rejected, () => initialState);
  },
});

export default authSlice.reducer;
export const { clearUser } = authSlice.actions;
