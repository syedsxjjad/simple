import { Link } from 'react-router-dom';

import FormJson from '@/locales/en.json';
import Button from '@/components/Form/Button';
import { PUBLIC_ROUTES } from '@/constant/url';
import AuthHeader from '@/components/AuthHeader';
import FormInput from '@/components/Form/FormInput';
import FormSelect from '@/components/Form/FormSelect';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';
import { Typography } from '@/components/Form/Typography';
import { SignupFormData, signupSchema } from '@/validator/auth-validator';
import { useSignup } from '@/hooks/useAuth';
import { USER_ROLES } from '@/enums/userRoles.enum';

const Signup = () => {
  const signupMutation = useSignup();
  const methods = useForm<SignupFormData>({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      fullName: '',
      email: '',
      role: undefined,
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: SignupFormData) => {
    if (!data) return;
    signupMutation.mutate({
      fullName: data.fullName,
      email: data.email,
      role: data.role as string,
      password: data.password,
      confirmPassword: data.confirmPassword,
    });
  };

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col justify-between h-full md:pt-2">
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <AuthHeader title={FormJson.signup.title} subtitle={FormJson.signup.subtitle} />
          <div className="space-y-7 mt-12">
            <FormInput
              name="fullName"
              required
              autoComplete="name"
              label={FormJson.signup.fullNameLabel}
              placeholder={FormJson.signup.fullNamePlaceholder}
            />
            <FormInput
              name="email"
              type="email"
              required
              autoComplete="email"
              label={FormJson.signup.emailLabel}
              placeholder={FormJson.signup.emailPlaceholder}
            />
            <FormSelect
              name="role"
              required
              label={FormJson.signup.roleLabel}
              placeholder={FormJson.signup.rolePlaceholder}
              options={[
                { value: USER_ROLES.TRAINER, label: FormJson.signup.trainerRole },
                { value: USER_ROLES.SYNDICATE_MANAGER, label: FormJson.signup.syndicateManagerRole },
              ]}
            />
            <FormInput
              name="password"
              type="password"
              required
              autoComplete="new-password"
              label={FormJson.signup.passwordLabel}
              placeholder={FormJson.signup.passwordPlaceholder}
            />
            <FormInput
              name="confirmPassword"
              type="password"
              required
              autoComplete="new-password"
              label={FormJson.signup.confirmPasswordLabel}
              placeholder={FormJson.signup.confirmPasswordPlaceholder}
            />
          </div>

          <div className="mt-12">
            <Button
              fullWidth
              type="submit"
              variant="default"
              loading={signupMutation.isPending}
              disabled={signupMutation.isPending}
              label={FormJson.signup.signUpButton}
            />
            <Typography className="text-center font-normal text-base! text-placeholder mt-2">{FormJson.signup.termsText}</Typography>
          </div>
        </form>
        <div className="text-center mt-9">
          <Typography variant="span">
            <span className="text-placeholder">{FormJson.signup.hasAccountText}</span>
            <Link to={PUBLIC_ROUTES.LOGIN} className="text-secondary-dark font-medium text-base ms-1 underline cursor-pointer">
              {FormJson.signup.signInLink}
            </Link>
          </Typography>
        </div>
      </div>
    </FormProvider>
  );
};

export default Signup;
