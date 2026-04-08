import { WatchlistType } from "@/interfaces";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type AuthState = {
  session: boolean;
  id: number | null;
  email: string | null;
  username: string | null;
  watchlist: WatchlistType[];
};

const initialState: AuthState = {
  session: false,
  id: null,
  email: null,
  username: null,
  watchlist: [],
};

export const fetchMe = createAsyncThunk(
  "auth/fetchMe",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/auth/me", {
        credentials: "include",
      });

      if (!res.ok) throw new Error();

      const user = await res.json();

      const watchlistRes = await fetch("/api/bd/watchlist");
      const watchlist = watchlistRes.ok ? await watchlistRes.json() : [];

      return { user, watchlist };
    } catch {
      return rejectWithValue(null);
    }
  },
);

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setUser: (_, action) => ({
      session: true,
      id: action.payload.session.sub,
      email: action.payload.session.email,
      username: action.payload.session.username,
      watchlist: action.payload.watchlist,
    }),
    clearUser: () => initialState,
    refreshWatchlist: (state, action) => {
      state.watchlist = state.watchlist.filter(([id]) => id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMe.fulfilled, (_, action) => ({
        session: true,
        id: action.payload.user.sub,
        email: action.payload.user.email,
        username: action.payload.user.username,
        watchlist: action.payload.watchlist,
      }))
      .addCase(fetchMe.rejected, () => initialState);
  },
});

export default sessionSlice.reducer;
export const { clearUser, setUser, refreshWatchlist } = sessionSlice.actions;
