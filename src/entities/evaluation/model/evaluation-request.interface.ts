import { FeedbackEnum } from "~/entities";

export interface EvaluationRequest {
    id: number;
    employeeId?: number;
    year: number;
    departmentId?: number;
    feedback?: FeedbackEnum;
    feedbackComments?: string;
}