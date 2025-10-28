import { GoalSummaryVariant } from "../types";
import { VARIANT_STYLES } from "../constants";

interface GoalSummaryProps {
    value: number;
    label: string;
    variant: GoalSummaryVariant;
}

const GoalSummaryCard: React.FC<GoalSummaryProps> = ({ value, label, variant }) => {
    const styles = VARIANT_STYLES[variant];
  
    return (
      <div
        className={`flex flex-col justify-center items-center text-4xl h-48 w-48 rounded-full bg-fk-light-gray
                    gap-2 shadow-md border border-gray-100 transition-all duration-300 ease-in-out 
                    hover:shadow-lg hover:transition-all hover:duration-300 hover:ease-in-out hover:scale-102
                    ${styles}`}
      >
        <span>{value}</span>
        <span className="text-base">{label}</span>
      </div>
    );
  };

export default GoalSummaryCard;