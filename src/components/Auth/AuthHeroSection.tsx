import { Typography } from '@/components/Form/Typography';
import PremiumRacingDivider from '@/components/Auth/PremiumRacingDivider';
import AuthStats from '@/components/Auth/AuthStats';
import dataJson from '@/locales/en.json';

const AuthHeroSection = () => {
  return (
    <>
      <Typography className="text-center text-foreground-white! break-normal! wrap-break-word! px-1 lg:text-4xl! text-2xl! font-bold! lg:leading-12 -mt-14">
        {dataJson.authLayout.hero.titlePrefix}{' '}
        <span className="text-secondary-dark">{dataJson.authLayout.hero.titleHighlight}</span>{' '}
        {dataJson.authLayout.hero.titleSuffix}
      </Typography>
      <Typography className="text-center px-2 text-placeholder !text-2xl font-medium mt-4 !leading-9">
        {dataJson.authLayout.hero.subtitle}
      </Typography>

      <PremiumRacingDivider />
      <AuthStats />
    </>
  );
};

export default AuthHeroSection;
