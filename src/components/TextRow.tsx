import { cn } from "@/utils/utils";
import { Typography } from "./Form/Typography";

type TextRowProps = {
    label: string;
    price: string;  
    className?: string;
    labelClassName?: string;
    priceClassName?: string;
  };
  
  export const TextRow = ({ label, price, labelClassName, priceClassName ,className}: TextRowProps) => {
    return (
      <div className={cn('flex flex-wrap items-center justify-between gap-1', className)}>
        <Typography className={cn("text-base! !font-normal text-placeholder!", labelClassName)}>
          {label}
        </Typography>
        <Typography className={cn("text-xl! font-semibold! text-foreground-white!", priceClassName)}>
          {price}
        </Typography>
      </div>
    );
  };