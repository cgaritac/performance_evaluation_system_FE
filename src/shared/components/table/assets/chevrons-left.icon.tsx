interface ChevronsLeftIconProps {
    className?: string;
  }
  
  const ChevronsLeftIcon: React.FC<ChevronsLeftIconProps> = ({ className }) => {
    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        xmlns="http://www.w3.org/2000/svg"
        className={`icon icon-tabler icons-tabler-outline icon-tabler-chevrons-left ${className}`}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M11 7l-5 5l5 5" />
        <path d="M17 7l-5 5l5 5" />
      </svg>
    );
  };
  
  export default ChevronsLeftIcon;