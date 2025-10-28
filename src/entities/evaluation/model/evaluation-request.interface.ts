import { FeedbackEnum } from "~/entities";

export interface EvaluationRequest {
    id: number;
    employeeId?: number;
    year: number;
    companyId?: number;
    feedback?: FeedbackEnum;
    feedbackComments?: string;
}