import { apiRequest } from "@/lib/api-request";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type EndpointState = {
  ok: boolean;
  data?: any;
  error?: string;
  timeStamp: number;
};

type FetchState = {
  [endpoint: string]: EndpointState;
};

const initialState: FetchState = {};

export const Request = createAsyncThunk("apiRequest", apiRequest);

const cryptoSlice = createSlice({
  name: "cryptoApi",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(Request.fulfilled, (state, action) => {
      const endpoint = action.meta.arg.endpoint ?? action.meta.arg.baseUrl;
      state[endpoint] = { ...action.payload, timeStamp: Date.now() };
    });
  },
});

export default cryptoSlice.reducer;
