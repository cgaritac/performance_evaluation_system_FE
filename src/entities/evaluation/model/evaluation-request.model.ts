import { EvaluationRequest } from "./evaluation-request.interface";
import { FeedbackEnum } from "../enums";

class EvaluationRequestModel implements EvaluationRequest {
  public id: number;
  public employeeId?: number;
  public year: number;
  public companyId?: number;
  public feedback?: FeedbackEnum;
  public feedbackComments?: string;

  private constructor(
    id: number,
    year: number,
    employeeId?: number,
    companyId?: number,
    feedback?: FeedbackEnum,
    feedbackComments?: string
  ) {
    this.id = id;
    this.employeeId = employeeId;
    this.year = year;
    this.companyId = companyId;
    this.feedback = feedback;
    this.feedbackComments = feedbackComments;
  }

  public static create({
    id = 0,
    employeeId,
    year = 0,
    companyId,
    feedback,
    feedbackComments
  }: Partial<EvaluationRequest>): EvaluationRequestModel {
    return new EvaluationRequestModel(id, year, employeeId, companyId, feedback, feedbackComments);
  }

  public toQueryString(): string {
    const params = new URLSearchParams();

    params.append("id", String(this.id));
    params.append("year", String(this.year));

    if (this.employeeId !== undefined) params.append("employeeId", String(this.employeeId));
    if (this.companyId !== undefined) params.append("companyId", String(this.companyId));
    if (this.feedback !== undefined) params.append("feedback", String(this.feedback));
    if (this.feedbackComments !== undefined) params.append("feedbackComments", String(this.feedbackComments));

    return params.toString();
  }
}

export default EvaluationRequestModel;