import { ButtonHTMLAttributes } from "react";
import { ButtonVariant } from "./button-variant.types";
import { DISABLED_STYLES, VARIANT_STYLES } from "./constants";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    children: React.ReactNode;
    variant?: ButtonVariant;
    className?: string;
    title?: string;
}

const Button: React.FC<ButtonProps> = ({
    onClick,
    children,
    variant = 'default',
    className,
    disabled = false,
    title,
  }) => {
    const computedStyles = disabled
              ? DISABLED_STYLES[variant] || DISABLED_STYLES.default
              : VARIANT_STYLES[variant] || VARIANT_STYLES.default;
  
    return (
        <button
            className={`relative transition-all duration-300 ease-in-out rounded-2xl
                        px-4 py-2.5 cursor-pointer
                        focus:outline-none focus:ring-2 focus:ring-offset-2
                        ${computedStyles} 
                        ${className}`}
            onClick={onClick}
            disabled={disabled}
            title={title}
        >
            {children}
        </button>
    );
  };
  
  export default Button;