import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const GoalsInfoSkeleton = () => {
    return (
        <section className="grid grid-cols-3 gap-4">            
            {[...Array(3)].map((_, index) => (
                <div key={index} className="border border-dotted border-gray-300 rounded h-[300px] p-4">
                    <Skeleton height={16} width="100%" className="mb-2" />
                    <Skeleton height={20} width="40%" className="mb-2" />
                    <Skeleton height={20} width="60%" className="mb-2"/>
                    <Skeleton height={80} width="100%" className="mb-2"/>
                    <Skeleton height={16} width="100%" className="mb-2"/>
                    <Skeleton height={1} width="100%" className="mb-2"/>
                    <Skeleton height={16} width="100%" className="mb-2"/>
                </div>
            ))}
        </section>
    );
};

export default GoalsInfoSkeleton; 