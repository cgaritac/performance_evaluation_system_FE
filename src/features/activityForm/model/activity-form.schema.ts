import { z } from "zod";
import { ACTIVITY_FORM_TEXTS } from "../constants";

export const ActivityFormSchema = z.object({
    title: z.string().min(1, ACTIVITY_FORM_TEXTS.TITLE_ERROR).max(100, ACTIVITY_FORM_TEXTS.TITLE_MAX_ERROR),
    description: z.string().min(1, ACTIVITY_FORM_TEXTS.DESCRIPTION_ERROR).max(500, ACTIVITY_FORM_TEXTS.DESCRIPTION_MAX_ERROR),
});

export type ActivityFormData = z.infer<typeof ActivityFormSchema>;