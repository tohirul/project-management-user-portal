// state/slices/sidebarSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "@/store/persistStorage";
import { encryptTransform } from "redux-persist-transform-encrypt";

interface SidebarState {
  isSidebarCollapsed: boolean;
}

const initialState: SidebarState = {
  isSidebarCollapsed: false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setIsSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isSidebarCollapsed = action.payload;
    },
  },
});

export const { setIsSidebarCollapsed } = sidebarSlice.actions;

export default persistReducer(
  {
    key: "sidebar",
    storage,
    transforms: [
      encryptTransform({
        secretKey: process.env.NEXT_PUBLIC_ENCRYPT_SECRET || "fallback-secret",
        onError: (error) => console.error("Persist Encryption Error:", error),
      }),
    ],
  },
  sidebarSlice.reducer,
);
