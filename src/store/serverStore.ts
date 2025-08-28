// store/serverStore.ts
import { makeStore } from "@/store/store";
import type { Action, ThunkDispatch } from "@reduxjs/toolkit";

export function makeServerStore() {
  return makeStore();
}
// Create a single instance for the server
const serverStore = makeStore();

// Typed dispatch that can handle RTK Query thunks
export type ServerDispatch = ThunkDispatch<
  ReturnType<typeof serverStore.getState>,
  undefined,
  Action // ✅ replaces deprecated AnyAction
>;

export default serverStore;
