import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const GoalSummarySkeleton = () => {
    return (
        <div className="flex flex-col justify-center items-center text-4xl h-48 
                        w-48 rounded-full bg-fk-light-gray gap-2 shadow-md border 
                        border-gray-100">
            <Skeleton height={40} width={60} />
            <Skeleton height={20} width={120} />
        </div>
    );
};

export default GoalSummarySkeleton; 