export const GOAL_ENDPOINTS = {
    POST_GOAL_URL: "api/Goals",
    PUT_GOAL_URL: (id: number) => `api/Goals/${id}`,
    DELETE_GOAL_URL: (id: number) => `api/Goals/${id}`,
}