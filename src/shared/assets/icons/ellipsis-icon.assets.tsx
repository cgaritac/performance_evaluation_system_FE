interface EllipsisIconProps {
    color?: string;
  }
  
  const EllipsisIcon: React.FC<EllipsisIconProps> = ({ color = '#666666' }) => {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 448 512"
        strokeWidth="2"
        fill={color}
      >
        <path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z" />
      </svg>
    );
  };
  
  export default EllipsisIcon;