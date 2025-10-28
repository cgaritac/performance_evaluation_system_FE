import { FeedbackEnum } from "~/entities";

export interface FeedbackFormData {
    feedback: FeedbackEnum;
    comment: string;
} 