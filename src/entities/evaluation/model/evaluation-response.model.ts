import { FeedbackEnum } from "../enums/feecback.enum";
import { EvaluationResponse } from "./evaluation-response.interface";

class EvaluationResponseModel implements EvaluationResponse {
  public id: number;
  public employeeId: number;
  public employeeFullName: string;
  public year: number;
  public feedback?: FeedbackEnum | null;
  public feedbackComments?: string | null;

  private constructor(
    id: number,
    employeeId: number,
    employeeFullName: string,
    year: number,
    feedback?: FeedbackEnum | null,
    feedbackComments?: string | null
  ) {
    this.id = id;
    this.employeeId = employeeId;
    this.employeeFullName = employeeFullName;
    this.year = year;
    this.feedback = feedback;
    this.feedbackComments = feedbackComments;
  }

  public static create({
    id = 0,
    employeeId = 0,
    employeeFullName = '',
    year = 0,
    feedback = FeedbackEnum.Outstanding,
    feedbackComments = ''
  }: Partial<EvaluationResponse>): EvaluationResponseModel {
    return new EvaluationResponseModel(id, employeeId, employeeFullName, year, feedback, feedbackComments);
  }
}

export default EvaluationResponseModel;