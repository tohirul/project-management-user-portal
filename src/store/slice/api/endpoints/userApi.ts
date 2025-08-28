// store/slice/userApi.ts
import apiV1, { makeCrudEndpoints } from "@/store/slice/api/v1";
import type { User } from "@/types/data.types";

const ENTITY = "User";
const ENTITY_PLURAL = "users";
const PRIMARY_KEY = "userId";

const userApi = apiV1.injectEndpoints({
  endpoints: (build) => ({
    ...makeCrudEndpoints<typeof ENTITY, User, typeof PRIMARY_KEY, string>(
      ENTITY,
      ENTITY_PLURAL,
      PRIMARY_KEY,
    )(build),

    // Custom endpoint example
    getCurrentUser: build.query<User, void>({
      query: () => ({ method: "GET", url: `/${ENTITY_PLURAL}/current` }),
      providesTags: [`${ENTITY_PLURAL}`],
    }),
  }),
  overrideExisting: false,
});

// Typed hooks
export const {
  useAddMutation: useAddUserMutation,
  useListQuery: useListUsersQuery,
  useGetQuery: useGetUserQuery,
  useUpdateMutation: useUpdateUserMutation,
  useRemoveMutation: useRemoveUserMutation,
  useGetCurrentUserQuery,
} = userApi;

export interface UserApi {
  endpoints: typeof userApi.endpoints;
  util: typeof userApi.util;
}
export default userApi;
