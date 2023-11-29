'use client'

interface SquareProps {
    value: string;
    onClick: () => void;
  }
  
  const Square: React.FC<SquareProps> = ({ value, onClick }) => {
    return (
      <button
        className="w-40 h-40 text-5xl border-2 border-white focus:outline-none"
        onClick={onClick}
      >
        {value}
      </button>
    );
  };
  
  export default Square;
  