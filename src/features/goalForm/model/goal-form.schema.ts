import { z } from "zod";
import { GoalCategory } from "~/entities";
import { GOAL_FORM_TEXTS } from "../constants";

export const GoalFormSchema = z.object({
    title: z.string().min(1, GOAL_FORM_TEXTS.TITLE_ERROR).max(100, GOAL_FORM_TEXTS.TITLE_MAX_ERROR),
    description: z.string().min(1, GOAL_FORM_TEXTS.DESCRIPTION_ERROR).max(500, GOAL_FORM_TEXTS.DESCRIPTION_MAX_ERROR),
    goalCategory: z.string()
        .transform((val) => parseInt(val))
        .refine((val) => Object.values(GoalCategory).includes(val), {
            message: GOAL_FORM_TEXTS.CATEGORY_ERROR,
        }),
    dueDate: z.string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, GOAL_FORM_TEXTS.DATE_FORMAT_ERROR)
        .refine((date) => {
            const selectedDate = new Date(date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            const endOfYear = new Date(today.getFullYear(), 11, 31);
            return selectedDate >= today && selectedDate <= endOfYear;
        }, GOAL_FORM_TEXTS.DATE_ERROR),
});

export type GoalFormData = z.infer<typeof GoalFormSchema>;