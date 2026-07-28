import { Check } from 'lucide-react';

import ReusableCard from '@/components/ReusableCard';
import { cn } from '@/utils/utils';

interface PaymentCardProps {
  title: string;
  description: string;
  price: string;
  limitText?: string;
  isSelected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  icon: React.ComponentType<{ className?: string }>;
}

const PaymentCard: React.FC<PaymentCardProps> = ({
  title,
  description,
  price,
  limitText,
  isSelected = false,
  disabled = false,
  onClick,
  icon: Icon,
}) => {
  return (
    <ReusableCard
      onClick={disabled ? undefined : onClick}
      className={cn(
        'relative bg-primary border border-border-grey rounded-3xl p-4 transition-all min-h-36 flex flex-col',
        !disabled && 'cursor-pointer',
        isSelected && 'gold-border-gradient bg-secondary-light/10',
        disabled && 'opacity-50 cursor-not-allowed pointer-events-none'
      )}
      contentClassName="flex flex-1 flex-col w-full gap-3"
      titleStatusClassName="w-full items-start gap-3"
      titleSectionClassName="gap-1"
      firstItem={<Icon className={cn('h-7 w-7 text-placeholder mt-1', isSelected && 'text-secondary-dark')} />}
      title={title}
      titleClassName={cn('text-placeholder! font-sora text-lg! font-normal!', isSelected && 'text-foreground-white!')}
      subTitle={description}
      subTitleClassName="text-placeholder! text-base! break-words! font-medium! leading-6"
      description={
        <div className="mt-auto flex w-full flex-col gap-2 pt-2">
          {limitText ? (
            <span className="text-secondary-light text-sm font-normal">{limitText}</span>
          ) : null}
          <span className="text-secondary-light text-base font-bold">{price}</span>
        </div>
      }
      descriptionClassName="w-full"
    >
      {isSelected ? (
        <div className="absolute top-4 right-4">
          <div className="gold-gradient-button size-6 rounded-full flex items-center justify-center">
            <Check className="size-3 text-foreground-black stroke-3" />
          </div>
        </div>
      ) : null}
    </ReusableCard>
  );
};

export default PaymentCard;
