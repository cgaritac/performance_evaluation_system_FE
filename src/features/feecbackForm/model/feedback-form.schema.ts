import { z } from "zod";
import { FeedbackEnum } from "~/entities";
import { FEEDBACK_FORM_TEXTS } from "../constants";

export const FeedbackFormSchema = z.object({
    feedback: z.string()
        .transform((val) => parseInt(val))
        .refine((val) => Object.values(FeedbackEnum).includes(val), {
            message: FEEDBACK_FORM_TEXTS.FEEDBACK_ERROR,
        }),
    comment: z.string().min(1, FEEDBACK_FORM_TEXTS.COMMENT_ERROR).max(500, FEEDBACK_FORM_TEXTS.COMMENT_MAX_ERROR),
});

export type FeedbackFormData = z.infer<typeof FeedbackFormSchema>;