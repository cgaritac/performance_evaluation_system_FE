import { NavLink } from "react-router-dom";
import { ROUTES } from "~/shared";
import { LOGO_REFRESH_TEXTS } from "../constants";

interface LogoRefreshProps {
    className?: string;
    imageRoute?: string;
    imageAlt?: string;
    imageClassName?: string;
}

const LogoRefresh: React.FC<LogoRefreshProps> = ({className, imageClassName, imageRoute, imageAlt}) => {
    return (
        <NavLink 
            to={ROUTES.HOME} 
            end 
            title={LOGO_REFRESH_TEXTS.TITLE}
            className={`${className} `}
            state={{ fromApp: true }}
        >
            <img src={imageRoute} alt={imageAlt} className={imageClassName} />
        </NavLink>
    );
};

export default LogoRefresh;