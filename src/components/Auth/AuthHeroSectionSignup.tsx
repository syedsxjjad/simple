import { Typography } from '@/components/Form/Typography';
import dataJson from '@/locales/en.json';

const AuthHeroSectionSignup = () => {
  return (
    <div className='flex flex-col items-center justify-center -mt-20'>
      <Typography className="text-center mt-4 break-normal! wrap-break-word! text-foreground-white! px-1 lg:text-4xl! text-2xl! font-bold! lg:leading-12">
        {dataJson.authLayout.hero.titleSignup}{' '}
        <span className="text-secondary-dark">{dataJson.authLayout.hero.titleHighlightSignup}</span>{' '}
        {dataJson.authLayout.hero.titleSuffixSignup}
      </Typography>

      <Typography className="text-center px-2 text-placeholder !text-2xl font-medium mt-4 !leading-9">
        {dataJson.authLayout.hero.subTitleSignup}
      </Typography>
    </div>
  );
};

export default AuthHeroSectionSignup;
