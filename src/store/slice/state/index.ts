import { combineReducers } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import sidebarReducer from "./sidebarSlice";

const globalReducer = combineReducers({
  theme: themeReducer,
  sidebar: sidebarReducer,
});

export default globalReducer;
