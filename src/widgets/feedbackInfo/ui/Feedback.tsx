import { FEEDBACK_TEXTS } from "../constants/feedback.constants";
import FeedbackSkeleton from "./FeedbackSkeleton";
interface FeedbackProps {
    children: React.ReactNode;
    result?: string;
    className?: string;
    isLoading?: boolean;
}

const Feedback: React.FC<FeedbackProps> = ({ children, result= FEEDBACK_TEXTS.FEEDBACK_SUBTITLE, className, isLoading }) => {
    if (isLoading) return <FeedbackSkeleton className={className} />;

    return (
        <section className={`flex flex-col justify-start items-center bg-fk-light-gray rounded-2xl shadow-lg 
                            p-4 mt-8 ${className}`}
                            role="form"
                            aria-label="Feedback"
        >
            <h2 className="text-fk-subtitle-size text-fk-text-label font-bold">
                {FEEDBACK_TEXTS.FEEDBACK_TITLE}
                <span className="text-fk-text-secondary">
                    {result}
                </span>
            </h2>
            {children}
        </section>
    );
};

export default Feedback;