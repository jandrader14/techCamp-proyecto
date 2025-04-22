import React from "react";

interface InventoryCardProps {
  imageSrc: string;
  title: string;
  description: string;
  buttonLabel: string;
  onClick: () => void;
  className?: string; // Allows for optional className prop
}

export const InventoryCard: React.FC<InventoryCardProps> = ({
  imageSrc,
  title,
  description,
  buttonLabel,
  onClick,
  className,
}) => {
  return (
    <div className={`${className || ""}`}>
      <img src={imageSrc} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
      <button onClick={onClick}>
        {buttonLabel}
      </button>
    </div>
  );
};
