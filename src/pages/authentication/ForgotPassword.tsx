import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useForgotPassword } from '@/hooks/useAuth';
import FormInput from '@/components/Form/FormInput';
import { PUBLIC_ROUTES } from '@/constant/url';
import FormJson from '@/locales/en.json';
import Button from '@/components/Form/Button';
import SectionHeader from '@/components/SectionHeader';
import { Typography } from '@/components/Form/Typography';
import { ForgotPasswordFormData, forgotPasswordSchema } from '@/validator/auth-validator';

const ForgotPassword = () => {
  const forgotPasswordMutation = useForgotPassword();
  const methods = useForm<ForgotPasswordFormData>({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (data: ForgotPasswordFormData) => {
    if (data.email) {
      forgotPasswordMutation.mutate({ email: data.email });
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col justify-between h-full md:pt-4">
        <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
          <SectionHeader
            title={FormJson.forgotPassword.resetPassword.title}
            subtitleText={FormJson.forgotPassword.resetPassword.subtitle}
          />
          <div className="space-y-5 mt-12">
            <FormInput
              name="email"
              type="email"
              required
              autoComplete="email"
              label={FormJson.forgotPassword.resetPassword.emailLabel}
              placeholder={FormJson.forgotPassword.resetPassword.emailPlaceholder}
            />
          </div>

          <Button
            fullWidth
            type="submit"
            className="mt-12"
            size='lg'
            variant="default"
            loading={forgotPasswordMutation.isPending}
            label={FormJson.forgotPassword.resetPassword.buttonLabel}
          />
        </form>
        <div className="text-center">
          <Typography>
            <span className="text-placeholder">{FormJson.login.noAccountText}</span>
            <Link to={PUBLIC_ROUTES.SIGNUP} className="text-secondary-dark font-medium text-base ms-1 underline cursor-pointer">
              {FormJson.login.signUpLink}
            </Link>
          </Typography>
        </div>
      </div>
    </FormProvider>
  );
};

export default ForgotPassword;
