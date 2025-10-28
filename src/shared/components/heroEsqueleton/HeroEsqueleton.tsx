import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HeroEsqueleton = () => {
    return (
        <div className="border border-dotted border-gray-300 w-1/2">
            <Skeleton height={50} width="100%" />
        </div>
    );
};

export default HeroEsqueleton;