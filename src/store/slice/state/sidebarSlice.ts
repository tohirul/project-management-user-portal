import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt";

interface initialStateType {
  isSidebarCollapsed: boolean;
}

const initialState: initialStateType = {
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
        onError: function (error) {
          console.error("Persist Encryption Error:", error);
        },
      }),
    ],
  },
  sidebarSlice.reducer,
);
