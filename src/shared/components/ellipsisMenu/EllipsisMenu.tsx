import { useRef, useState } from "react";
import { EllipsisIcon } from "~/shared";
import useEllipsisMenuHook from "./useEllipsisMenuHook";

interface MenuItem {
    icon: React.ReactNode;
    label: string;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
}

interface EllipsisMenuProps {
    items: MenuItem[];
    className?: string;
}

const EllipsisMenu: React.FC<EllipsisMenuProps> = ({ items, className = "" }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEllipsisMenuHook(menuRef, setIsMenuOpen);

    return (
        <div className="relative" ref={menuRef}>
            <button 
                title="More options" 
                aria-label="More options" 
                className={`rounded-full p-1 cursor-pointer hover:bg-gray-100 ${className}`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                <EllipsisIcon />
            </button>
            {isMenuOpen && (
                <div className="absolute right-6 top-[-20px] w-12 bg-white rounded-2xl shadow-md py-1 z-10">
                    {items.map((item, index) => (
                        <button 
                            key={index}
                            title={item.label}
                            aria-label={item.label}
                            className={`w-full text-left px-4 py-2 text-sm text-gray-700
                                    hover:bg-gray-100 flex items-center gap-2 ${item.className}`}
                            onClick={() => {
                                if (item.onClick) {
                                    item.onClick();
                                }
                                setIsMenuOpen(false);
                            }}
                            disabled={item.disabled}
                        >
                            {item.icon}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EllipsisMenu; 