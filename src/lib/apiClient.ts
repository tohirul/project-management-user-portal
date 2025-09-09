/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/query/serverFetch.ts
import { makeServerStore, ServerDispatch } from "@/store/serverStore";
import { Api } from "@/types/common.types";
import { IQueryParams } from "@/types/query.types";

export async function fetchList<
  T extends { list: any },
  Q extends { getRunningQueriesThunk: any },
>(
  api: Api<T, Q>,
  params: IQueryParams & Partial<Record<string, string | number>>,
) {
  const store = makeServerStore();

  const dispatch: ServerDispatch = store.dispatch;

  dispatch(api.endpoints.list.initiate(params));
  await Promise.all(dispatch(api.util.getRunningQueriesThunk()));

  // Extract the hydrated state
  const state = store.getState();
  const res = api.endpoints.list.select(params)(state);

  return {
    success: res?.data?.success,
    response: res?.data?.response,
    state,
    result: res?.data,
    meta: res?.data?.meta || ({} as any),
    isLoading: res?.status === "pending",
    isError: res?.status === "rejected",
    isSuccess: res?.status === "fulfilled",
    error: res?.error,
  };
}
