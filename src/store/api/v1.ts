/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BaseQueryFn,
  EndpointBuilder,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query";

import type { ApiResponse } from "@/types/common.types";
import { createBaseApi } from ".";
import { IQueryParams } from "@/types/query.types";

export type FetchBaseQueryType = BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  object,
  FetchBaseQueryMeta
>;

/**
 * Generic CRUD endpoint generator
 *
 * @template N - Entity name (e.g. "User")
 * @template T - Entity type (e.g. User)
 * @template K - Primary key (e.g. "userId")
 * @template TagTypes - Valid tag types (from createApi)
 */
export const makeCrudEndpoints = <
  N extends string,
  T extends Record<string, any>,
  K extends keyof T & string,
  TagTypes extends string,
>(
  entityName: N,
  resourcePath: string,
  primaryKey: K,
  filterKeys: Array<keyof T & string> = [],
) => {
  return (build: EndpointBuilder<FetchBaseQueryType, TagTypes, string>) => ({
    /** Create */
    add: build.mutation<T, Partial<T>>({
      query: (body) => ({ method: "POST", url: resourcePath, body }),
      invalidatesTags: [{ type: entityName as unknown as TagTypes }],
    }),

    /* GET ALL */
    list: build.query<
      ApiResponse<T[]>,
      (IQueryParams & Partial<Record<keyof T & string, string | number>>) | void
    >({
      query: (params) => {
        console.log(`Params: `, params);
        return {
          method: "GET",
          url: resourcePath,
          params: params as Record<string, any> | undefined,
        };
      },
      providesTags: (result) =>
        result?.data?.length
          ? result.data.flatMap((item) =>
              filterKeys.map((key) => ({
                type: entityName as unknown as TagTypes,
                id: item[key],
              })),
            )
          : [{ type: entityName as unknown as TagTypes }],
    }),

    /** Get by ID */
    get: build.query<T, T[K]>({
      query: (id) => ({ method: "GET", url: `${resourcePath}/${id}` }),
      providesTags: (result, error, id) =>
        result
          ? [{ type: entityName as unknown as TagTypes, id }]
          : [{ type: entityName as unknown as TagTypes }],
    }),

    /** Update */
    update: build.mutation<T, Partial<T> & { [P in K]: T[K] }>({
      query: (body) => ({
        method: "PUT",
        url: `${resourcePath}/${body[primaryKey]}`,
        body,
      }),
      invalidatesTags: (result, error, body) => [
        { type: entityName as unknown as TagTypes, id: body[primaryKey] },
      ],
    }),

    /** Remove (single) */
    remove: build.mutation<{ success: boolean; id: T[K] }, T[K]>({
      query: (id) => ({ method: "DELETE", url: `${resourcePath}/${id}` }),
      invalidatesTags: [{ type: entityName as unknown as TagTypes }],
    }),

    /** Optional: Bulk remove */
    removeMany: build.mutation<{ success: boolean; ids: T[K][] }, T[K][]>({
      query: (ids) => ({
        method: "DELETE",
        url: `${resourcePath}/bulk`,
        body: { ids },
      }),
      invalidatesTags: [{ type: entityName as unknown as TagTypes }],
    }),
  });
};
const apiV1 = createBaseApi("v1", [
  "User",
  "Project",
  "Task",
  "Comment",
  "Attachment",
]);

export default apiV1;
