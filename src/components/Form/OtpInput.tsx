import { cn } from '@/utils/utils';

interface OtpInputProps {
  length: number;
  values: string[];
  inputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, index: number) => void;
  onPaste: (e: React.ClipboardEvent<HTMLInputElement>, index: number) => void;
  onClick: (index: number) => void;
  className?: string;
}

const inputClassName =
  'w-full xl:h-[75px] lg:h-14 md:h-12 sm:h-16 h-10 text-center xl:text-3xl lg:text-2xl md:text-2xl text-lg bg-primary font-semibold border border-border focus:ring-2 focus:outline-none focus:ring-secondary-dark focus:bg-secondary-dark/10! focus:text-secondary-dark focus:border-transparent xl:rounded-2xl sm:rounded-xl rounded-lg transition-all duration-200';

const OtpInput = ({ length, values, inputRefs, onChange, onKeyDown, onPaste, onClick, className }: OtpInputProps) => {
  return (
    <div className={cn('flex justify-center sm:gap-4 gap-2', className)}>
      {Array.from({ length }).map((_, index) => {
        const digit = values?.[index];
        return (
          <input
            key={index}
            type="text"
            name={`otp.${index}`}
            value={digit ?? ''}
            maxLength={1}
            autoComplete={index === 0 ? 'one-time-code' : 'off'}
            ref={el => (inputRefs.current[index] = el)}
            onChange={e => onChange(e, index)}
            onKeyDown={e => onKeyDown(e, index)}
            onPaste={e => onPaste(e, index)}
            onClick={() => onClick(index)}
            inputMode="numeric"
            pattern="[0-9]*"
            style={{ ...(!digit ? { backgroundColor: '#ffff' } : {}) }}
            className={cn(inputClassName, digit ? 'border-secondary-dark bg-foreground-white text-secondary-dark' : 'focus:border-secondary-dark')}
          />
        );
      })}
    </div>
  );
};

export default OtpInput;
