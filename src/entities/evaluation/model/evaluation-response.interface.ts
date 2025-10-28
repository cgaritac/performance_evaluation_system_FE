import { FeedbackEnum } from "~/entities/evaluation/enums";

export interface EvaluationResponse {
    id: number;
    employeeId: number;
    employeeFullName: string;
    year: number;
    feedback?: FeedbackEnum | null;
    feedbackComments?: string | null;
}