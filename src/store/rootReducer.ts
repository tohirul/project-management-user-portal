// rootReducer.ts
import { combineReducers } from "@reduxjs/toolkit";
import globalReducer from "@/store/slices";
import apiV1 from "@/store/api/v1";

const rootReducer = combineReducers({
  global: globalReducer,
  [apiV1.reducerPath]: apiV1.reducer,
});

export type RootReducerType = ReturnType<typeof rootReducer>;
export default rootReducer;
