import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface FeedbackSkeletonProps {
    className?: string;
}

const FeedbackSkeleton: React.FC<FeedbackSkeletonProps> = ({ className }) => {
    return (
        <section className="mt-8">            
            <div className={`border border-dotted border-gray-300 rounded-2xl p-4 ${className}`}>
                <Skeleton height={64} width="100%" className="mb-2" />
                <Skeleton height={140} width="100%" className="mb-2" />
                <Skeleton height={64} width="100%" className="mb-2" />
            </div>
        </section>
    );
};

export default FeedbackSkeleton; 