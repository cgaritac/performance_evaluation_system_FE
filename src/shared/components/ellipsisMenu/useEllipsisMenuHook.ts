import { useEffect } from "react";

const useEllipsisMenuHook = (
    menuRef: React.RefObject<HTMLDivElement | null>,
    setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuRef, setIsMenuOpen]);
};

export default useEllipsisMenuHook;