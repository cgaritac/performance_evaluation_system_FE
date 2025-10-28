interface ChevronLeftIconProps {
    className?: string;
  }
  
  const ChevronLeftIcon: React.FC<ChevronLeftIconProps> = ({ className }) => {
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
        className={`icon icon-tabler icons-tabler-outline icon-tabler-chevron-left ${className}`}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M15 6l-6 6l6 6" />
      </svg>
    );
  };
  
  export default ChevronLeftIcon;