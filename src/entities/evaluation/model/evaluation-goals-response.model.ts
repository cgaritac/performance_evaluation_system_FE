import { GoalResponseModel } from "~/entities";
import { EvaluationWithGoalsResponse } from "./evaluation-goals-response.interface";
import EvaluationResponseModel from "./evaluation-response.model";
import { FeedbackEnum } from "../enums";
class EvaluationWithGoalsResponseModel implements EvaluationWithGoalsResponse {
    public goals: GoalResponseModel[];
    private evaluation: EvaluationResponseModel;
  
    get id() { return this.evaluation.id; }
    get employeeId() { return this.evaluation.employeeId; }
    get employeeFullName() { return this.evaluation.employeeFullName; }
    get year() { return this.evaluation.year; }
    get feedback() { return this.evaluation.feedback; }
    get feedbackComments() { return this.evaluation.feedbackComments; }
  
    private constructor(
      id: number,
      employeeId: number,
      employeeFullName: string,
      year: number,
      feedback: FeedbackEnum | null,
      feedbackComments: string | null,
      goals: GoalResponseModel[]
    ) {
      this.evaluation = EvaluationResponseModel.create({ id, employeeId, employeeFullName, year, feedback, feedbackComments });
      this.goals = goals;
    }
  
    public static create({
      id = 0,
      employeeId = 0,
      employeeFullName = '',
      year = 0,
      feedback = FeedbackEnum.Outstanding,
      feedbackComments = '',
      goals = []
    }: Partial<EvaluationWithGoalsResponse>): EvaluationWithGoalsResponseModel {
      return new EvaluationWithGoalsResponseModel(
        id,
        employeeId,
        employeeFullName,
        year,
        feedback,
        feedbackComments,
        goals.map(goal => GoalResponseModel.create(goal))
      );
    }
  }

export default EvaluationWithGoalsResponseModel;