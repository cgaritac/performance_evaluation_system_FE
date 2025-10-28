import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ActivitiesInfoSkeleton = () => {
    return (
        <section className="grid grid-cols-1 gap-4 mt-4">
            {[...Array(3)].map((_, index) => (
                <div key={index} className="border border-dotted border-gray-300 rounded p-4">
                    <Skeleton height={20} width="60%" className="mb-2" />
                    <Skeleton height={16} width="40%" className="mb-2" />
                    <Skeleton height={16} width="30%" />
                </div>
            ))}
        </section>
    );
};

export default ActivitiesInfoSkeleton;