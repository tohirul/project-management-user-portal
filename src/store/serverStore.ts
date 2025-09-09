// store/serverStore.ts
import { makeStore } from "@/store/store";
import type { Action, ThunkDispatch } from "@reduxjs/toolkit";

export function makeServerStore() {
  return makeStore();
}

const serverStore = makeStore();

export type ServerDispatch = ThunkDispatch<
  ReturnType<typeof serverStore.getState>,
  undefined,
  Action
>;

export default serverStore;
