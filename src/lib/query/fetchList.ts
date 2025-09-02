/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/query/serverFetch.ts
import { makeServerStore, ServerDispatch } from "@/store/serverStore";
import { Api } from "@/types/common.types";

export async function fetchList<
  T extends { list: any },
  Q extends { getRunningQueriesThunk: any },
>(api: Api<T, Q>) {
  const store = makeServerStore();

  const dispatch: ServerDispatch = store.dispatch;

  dispatch(api.endpoints.list.initiate(undefined));
  await Promise.all(dispatch(api.util.getRunningQueriesThunk()));

  // Extract the hydrated state
  const state = store.getState();
  const res = api.endpoints.list.select(undefined)(state);

  return {
    state,
    result: res,
  };
}
