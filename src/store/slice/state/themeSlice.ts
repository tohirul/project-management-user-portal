// state/slices/themeSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt";

export type ThemeMode = "light" | "dark";

interface ThemeState {
  mode: ThemeMode;
}

const initialState: ThemeState = {
  mode: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<ThemeMode>) {
      state.mode = action.payload;
    },
    toggleTheme(state) {
      state.mode = state.mode === "dark" ? "light" : "dark";
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
// export default themeSlice.reducer; // without persisted
export default persistReducer(
  {
    key: "theme",
    storage,
    transforms: [
      encryptTransform({
        secretKey: process.env.NEXT_PUBLIC_ENCRYPT_SECRET || "fallback-secret",
        onError: function (error) {
          console.error("Persist Encryption Error:", error);
        },
      }),
    ],
  },
  themeSlice.reducer,
);
