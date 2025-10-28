interface TooltipProps {
  text: React.ReactNode;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  return (
    <div className="relative group">
      {children}
      <div className="absolute z-20 mb-2 hidden group-hover:block p-2 bg-gray-600 text-white 
                      text-sm rounded min-w-20 max-w-96 whitespace-normal break-words 
                      [word-break:break-word] transition-opacity duration-200 opacity-0 
                      group-hover:opacity-100"
      >
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
