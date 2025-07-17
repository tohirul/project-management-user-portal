import { combineReducers } from "@reduxjs/toolkit";
import globalReducer from "@/store/slice/state";
import { api } from "@/store/slice/api";

const rootReducer = combineReducers({
  global: globalReducer,
  [api.reducerPath]: api.reducer,
});
// const rootReducer = persistReducer(persistConfig, reducer);

export type RootReducerType = ReturnType<typeof rootReducer>;
export default rootReducer;
