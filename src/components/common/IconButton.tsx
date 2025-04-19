import { ButtonHTMLAttributes } from "react";
import cn from "../../utils/cn";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  className?: string;
}

const IconButton = ({ icon, className, ...props }: IconButtonProps) => {
  return (
    <button
      {...props}
      className={cn(
        "rounded-2xl flex items-center justify-center size-[40px]",
        className
      )}
    >
      {icon}
    </button>
  );
};

export default IconButton;
