// store/slice/projectApi.ts
import apiV1, { makeCrudEndpoints } from "@/store/slice/api/v1";
import type { Project } from "@/types/data.types";

const ENTITY = "Project";
const ENTITY_PLURAL = "projects";
const PRIMARY_KEY = "id";

const projectApi = apiV1.injectEndpoints({
  endpoints: (build) => ({
    ...makeCrudEndpoints<typeof ENTITY, Project, typeof PRIMARY_KEY, string>(
      ENTITY,
      ENTITY_PLURAL,
      PRIMARY_KEY,
    )(build),
  }),
  overrideExisting: false,
});

// Typed hooks
export const {
  useAddMutation: useAddProjectMutation,
  useListQuery: useListProjectsQuery,
  useGetQuery: useGetProjectQuery,
  useUpdateMutation: useUpdateProjectMutation,
  useRemoveMutation: useRemoveProjectMutation,
} = projectApi;

export interface ProjectApi {
  endpoints: typeof projectApi.endpoints;
  util: typeof projectApi.util;
}
export default projectApi;
