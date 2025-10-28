import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const EvaluationsInfoSkeleton = () => {
    return (
        <section className="flex flex-col gap-1 mt-6">
            <div className="flex justify-between mb-4">
                <Skeleton height={36} width={150} />
                <Skeleton height={36} width={120} />
                <Skeleton height={36} width={200} />
            </div>

            <div className="border rounded-lg overflow-hidden">
                <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50">
                    <Skeleton height={20} />
                    <Skeleton height={20} />
                    <Skeleton height={20} />
                    <Skeleton height={20} />
                </div>

                {[...Array(5)].map((_, index) => (
                    <div key={index} className="grid grid-cols-4 gap-4 p-4 border-t">
                        <Skeleton height={20} />
                        <Skeleton height={20} />
                        <Skeleton height={20} />
                        <Skeleton height={20} width={40} className="mx-auto" />
                    </div>
                ))}
            </div>

            <div className="flex justify-between items-center mt-4">
                <Skeleton height={36} width={200} />
                <Skeleton height={36} width={300} />
            </div>
        </section>
    );
};

export default EvaluationsInfoSkeleton;