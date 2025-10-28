import { FeedbackEnum } from "~/entities";

const getFeedbackText = (feedback: FeedbackEnum) => {
    switch (feedback) {
        case FeedbackEnum.NotEvaluated:
            return 'Not Evaluated';
        case FeedbackEnum.Outstanding:
            return 'Outstanding';
        case FeedbackEnum.Successful:
            return 'Successful';
        case FeedbackEnum.NeedImprovement:
            return 'Needs Improvement';
        case FeedbackEnum.Unsatisfactory:
            return 'Unsatisfactory';
        default:
            return feedback;
    }
};

export default getFeedbackText;