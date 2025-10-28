interface FooterProps {
    children?: React.ReactNode;
    className?: string;
}

const Footer: React.FC<FooterProps> = ({children, className}) => {
    return (
        <footer className={`flex flex-col justify-center items-center 
                            w-full h-8
                            bg-fk-light-gray 
                            sticky bottom-0 
                            text-fk-text-secondary font-bold 
                            ${className}`
        }>
            <div className="flex items-center justify-center text-sm">
                {children}
            </div>
        </footer>
    );
};

export default Footer;