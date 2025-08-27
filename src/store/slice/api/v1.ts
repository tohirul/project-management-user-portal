// store/slice/v1.ts
import { createBaseApi } from "@/store/slice/api";
import type { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query";
import type {
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query";

/**
 * Exact base query type for fetchBaseQuery
 */
export type FetchBaseQueryType = BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  object, // error:
  FetchBaseQueryMeta
>;

/**
 * Generic CRUD endpoint generator
 *
 * @template N - Entity name (e.g. "User")
 * @template T - Entity type (e.g. User)
 * @template K - Primary key (e.g. "userId")
 * @template TagTypes - Union of tag strings (inferred from api)
 */
export const makeCrudEndpoints = <
  N extends string,
  T extends Record<K, string | number>,
  K extends keyof T,
  TagTypes extends string,
>(
  entityName: N,
  resourcePath: string,
  primaryKey: K,
) => {
  return (build: EndpointBuilder<FetchBaseQueryType, TagTypes, string>) => ({
    add: build.mutation<T, Partial<T>>({
      query: (body) => ({ method: "POST", url: resourcePath, body }),
      invalidatesTags: [{ type: entityName as string as TagTypes }],
    }),

    list: build.query<T[], void>({
      query: () => ({ method: "GET", url: resourcePath }),
      providesTags: (result) =>
        result && result.length
          ? result.map((item) => ({
              type: entityName as string as TagTypes,
              id: item[primaryKey],
            }))
          : [{ type: entityName as string as TagTypes }],
    }),

    get: build.query<T, T[K]>({
      query: (id) => ({ method: "GET", url: `${resourcePath}/${id}` }),
      providesTags: (result, error, id) =>
        result
          ? [{ type: entityName as string as TagTypes, id }]
          : [{ type: entityName as string as TagTypes }],
    }),

    update: build.mutation<T, T>({
      query: (body) => ({
        method: "PUT",
        url: `${resourcePath}/${body[primaryKey]}`,
        body,
      }),
      invalidatesTags: (result, error, body) => [
        { type: entityName as string as TagTypes, id: body[primaryKey] },
      ],
    }),

    remove: build.mutation<{ success: boolean; id: T[K] }, T[K]>({
      query: (id) => ({
        method: "DELETE",
        url: `${resourcePath}/${id}`,
      }),
      invalidatesTags: [{ type: entityName as string as TagTypes }],
    }),
  });
};

/**
 * Base API for v1
 */
export const apiV1 = createBaseApi("v1", [
  "User",
  "Project",
  "Task",
  "Comment",
  "Attachment",
]);

export default apiV1;
