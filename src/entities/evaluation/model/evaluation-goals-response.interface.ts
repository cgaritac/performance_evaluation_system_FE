import { GoalResponse } from "~/entities/goal/model/goal-response.interface";
import { EvaluationResponse } from "./evaluation-response.interface";

export interface EvaluationWithGoalsResponse extends EvaluationResponse {
    goals: GoalResponse[];
}