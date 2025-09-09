// store/slice/api/index.ts

import { clientConfig } from "@/config/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/**
 * Factory to create a base RTK Query API for a given version
 *
 * @param version - API version, e.g., "v1" | "v2"
 * @param tagTypes - Allowed RTK Query tag types for cache invalidation
 */
export const createBaseApi = (version: "v1" | "v2", tagTypes: string[] = []) =>
  createApi({
    baseQuery: fetchBaseQuery({
      baseUrl: `${clientConfig?.NEXT_PUBLIC_API_BASE_URL}/api/${version}`,
    }),
    reducerPath: `api_${version}`,
    tagTypes,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    endpoints: (build) => ({}),
  });
