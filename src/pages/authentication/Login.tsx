import { Link } from 'react-router-dom';

import FormJson from '@/locales/en.json';
import { useUserLogin } from '@/hooks/useAuth';
import Button from '@/components/Form/Button';
import AuthHeader from '@/components/AuthHeader';
import FormInput from '@/components/Form/FormInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { Typography } from '@/components/Form/Typography';
import { LoginFormData, loginSchema } from '@/validator/auth-validator';
import { PUBLIC_ROUTES } from '@/constant/url';
import FormCheckbox from '@/components/Form/FormCheckbox';

const Login = () => {
  const loginMutation = useUserLogin();
  const methods = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = (data: LoginFormData) => {
    if (!data) return;
    loginMutation.mutate({
      email: data.email,
      password: data.password,
      rememberMe: data.rememberMe,
    });
  };

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col justify-between h-full md:pt-4">
        <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
          <AuthHeader title={FormJson.login.title} subtitle={FormJson.login.subtitle} />
          <div className="space-y-7 mt-12">
            <FormInput
              name="email"
              type="email"
              required
              autoComplete="email"
              label={FormJson.login.emailLabel}
              placeholder={FormJson.login.emailPlaceholder}
              labelClassName='uppercase'
            />

            <FormInput
              type="password"
              name="password"
              required
              labelClassName='uppercase'
              autoComplete="current-password"
              label={FormJson.login.passwordLabel}
              placeholder={FormJson.login.passwordPlaceholder}
            />
            <div className="flex flex-wrap gap-3 w-full justify-between items-center">
              <FormCheckbox name="rememberMe" label={FormJson.login.keepMeSignedIn} className="text-sm" />
              <Link to={PUBLIC_ROUTES.FORGOT_PASSWORD} className="text-secondary-dark font-medium text-base underline">
                {FormJson.login.forgotPassword}
              </Link>
            </div>
          </div>

          <Button
            fullWidth
            type="submit"
            className="mt-12"
            variant="default"
            loading={loginMutation.isPending}
            label={FormJson.login.signInButton}
          />
        </form>
        <div className="text-center">
          <Typography variant="span">
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

export default Login;
