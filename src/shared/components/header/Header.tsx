import { ReactNode } from "react";

interface HeaderProps {
  leftChildren?: ReactNode;
  centerChildren?: ReactNode;
  rightChildren?: ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({leftChildren, centerChildren, rightChildren, className}) => {
    return (
        <header className={`flex justify-center items-center 
                            sticky top-0 z-50 bg-fk-light-gray  
                            ${className}`
        }>
            <ul className="flex justify-between items-center responsive-container">
                <li>{leftChildren}</li>
                <li>{centerChildren}</li>
                <li>{rightChildren}</li>
            </ul>
        </header>
    )
};

export default Header;