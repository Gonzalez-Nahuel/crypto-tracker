import { fetchFromCoinGecko } from "@/lib/coingecko-fetch";
import { fetchFromAlternativeMe } from "@/lib/fear-greed-fetch";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/*type FetchParams = {
  path: string;
  params?: string;
};*/

type EndpointState = {
  ok: boolean;
  data?: any;
  error?: string;
};

type FetchState = {
  [endpoint: string]: EndpointState;
};

const initialState: FetchState = {};

export const Coingecko = createAsyncThunk(
  "fectch/coingecko",
  fetchFromCoinGecko
);

export const AlternativeMe = createAsyncThunk(
  "fetch/alternativeMe",
  fetchFromAlternativeMe
);

const cryptoSlice = createSlice({
  name: "cryptoApi",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(Coingecko.fulfilled, (state, action) => {
      const endpoint = action.meta.arg.params
        ? `${action.meta.arg.path}?${action.meta.arg.params}`
        : action.meta.arg.path;

      state[endpoint] = action.payload;
    });

    builder.addCase(AlternativeMe.fulfilled, (state, action) => {
      state["fear-greed"] = action.payload;
    });
  },
});

export default cryptoSlice.reducer;
