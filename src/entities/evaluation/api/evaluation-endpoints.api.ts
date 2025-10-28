export const EVALUATION_ENDPOINTS = {
    GET_EVALUATIONS_URL: "api/Evaluations",
    GET_EVALUATION_GOALS_URL: (employeeId: number) => `api/Evaluations/withgoals/${employeeId}`,
    POST_EVALUATIONS_URL: 'api/Evaluations/all',
    PUT_EVALUATION_URL: (employeeid: number) => `api/Evaluations/idemployee/${employeeid}`,
}