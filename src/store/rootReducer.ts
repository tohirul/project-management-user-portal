import { combineReducers } from "@reduxjs/toolkit";
import globalReducer from "@/store/slice/state";
import { api } from "@/store/slice/api";
// import { persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import { encryptTransform } from "redux-persist-transform-encrypt";
// Persist config for global state
// const persistConfig = {
//   key: "root",
//   storage,
//   whitelist: ["theme", "sidebar"],
//   transforms: [
//     encryptTransform({
//       secretKey: process.env.NEXT_PUBLIC_ENCRYPT_SECRET || "fallback-secret",
//       onError: function (error) {
//         console.error("Persist Encryption Error:", error);
//       },
//     }),
//   ],
// };
const rootReducer = combineReducers({
  global: globalReducer,
  [api.reducerPath]: api.reducer,
});
// const rootReducer = persistReducer(persistConfig, reducer);

export type RootReducerType = ReturnType<typeof rootReducer>;
export default rootReducer;
