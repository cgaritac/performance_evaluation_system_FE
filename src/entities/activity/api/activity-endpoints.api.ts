export const ACTIVITY_ENDPOINTS = {
    GET_ACTIVITIES_URL: (goalid: number) => `api/Activities/idgoal/${goalid}`,
    POST_ACTIVITY_URL: "api/Activities",
    PUT_ACTIVITY_URL: (id: number) => `api/Activities/${id}`,
    DELETE_ACTIVITY_URL: (id: number) => `api/Activities/${id}`,
}