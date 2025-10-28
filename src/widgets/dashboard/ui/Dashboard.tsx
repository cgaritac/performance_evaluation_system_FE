import { ReactNode } from "react";

interface DashboardProps {
    leftChildren?: ReactNode;
    centerChildren?: ReactNode;
    rightChildren?: ReactNode;
    className?: string;
  }

const Dashboard: React.FC<DashboardProps> = ({ leftChildren, centerChildren, rightChildren, className }) => {
    return (
        <section className={`grid grid-cols-3 justify-items-center my-8 ${className}`}>
            {leftChildren}
            {centerChildren}
            {rightChildren}
        </section>
    );
};

export default Dashboard;