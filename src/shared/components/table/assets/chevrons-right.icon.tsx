interface ChevronsRightIconProps {
  className?: string;
}

const ChevronsRightIcon: React.FC<ChevronsRightIconProps> = ({ className }) => {
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
      className={`icon icon-tabler icons-tabler-outline icon-tabler-chevrons-right ${className}`}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M7 7l5 5l-5 5" />
      <path d="M13 7l5 5l-5 5" />
    </svg>
  );
};

export default ChevronsRightIcon;