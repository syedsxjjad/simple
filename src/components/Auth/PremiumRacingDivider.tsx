import dataJson from '@/locales/en.json';

const PremiumRacingDivider = () => {
  return (
    <div className="flex items-center justify-center gap-7 w-full mt-12">
      <span
        className="h-px w-16 rounded-full"
        style={{
          background: 'linear-gradient(90deg, rgba(226,166,34,0) 0%, var(--color-secondary-light) 100%)',
          boxShadow: '0 0 10px rgba(226,166,34,0.4)',
        }}
      />
      <span className="text-secondary-light lg:text-base text-sm tracking-[0.25em] font-medium uppercase">
        {dataJson.authLayout.premiumRacing}
      </span>
      <span
        className="h-px w-16 rounded-full"
        style={{
          background: 'linear-gradient(90deg, var(--color-secondary-light) 0%, rgba(226,166,34,0) 100%)',
          boxShadow: '0 0 10px rgba(226,166,34,0.4)',
        }}
      />
    </div>
  );
};

export default PremiumRacingDivider;
