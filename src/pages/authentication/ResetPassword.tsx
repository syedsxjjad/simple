import { useState } from 'react';
import FormJson from '@/locales/en.json';
import Button from '@/components/Form/Button';
import SectionHeader from '@/components/SectionHeader';
import FormInput from '@/components/Form/FormInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { ResetPasswordFormData, resetPasswordSchema } from '@/validator/auth-validator';
import { useVerifyResetPassword } from '@/hooks/useAuth';
import { PUBLIC_ROUTES } from '@/constant/url';
import ConfirmationModal from '@/components/ConfirmationModal';

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const verifyResetPasswordMutation = useVerifyResetPassword();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Get query parameters
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get('email') || '';
  const token = searchParams.get('token') || '';


  const methods = useForm<ResetPasswordFormData>({
    resolver: yupResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  const handleCloseSuccessModal=()=>{
    setIsSuccessModalOpen(false);
    navigate(PUBLIC_ROUTES.LOGIN);
  }

  const onSubmit = (data: ResetPasswordFormData) => {
    if (!email || !data.newPassword || !token) return;
    verifyResetPasswordMutation.mutate(
      { email, password: data.newPassword, token },
      {
        onSuccess: res => {
          if (res.status) {
            setIsSuccessModalOpen(true);
          }
        },
      }
    );
  };

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col justify-between h-full">
        <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
          <SectionHeader
            title={FormJson.forgotPassword.setNewPassword.title}
            subtitleText={FormJson.forgotPassword.setNewPassword.subtitle}
          />
          <div className="space-y-7 mt-12">
            <FormInput
              type="password"
              name="newPassword"
              autoComplete="new-password"
              label={FormJson.forgotPassword.setNewPassword.newPasswordLabel}
              placeholder={FormJson.forgotPassword.setNewPassword.newPasswordPlaceholder}
            />

            <FormInput
              type="password"
              name="confirmPassword"
              autoComplete="new-password"
              label={FormJson.forgotPassword.setNewPassword.confirmPasswordLabel}
              placeholder={FormJson.forgotPassword.setNewPassword.confirmPasswordPlaceholder}
            />
          </div>

          <Button
            fullWidth
            type="submit"
            className="mt-12"
            variant="default"
            loading={verifyResetPasswordMutation.isPending}
            label={FormJson.forgotPassword.setNewPassword.buttonLabel}
          />
        </form>
      <ConfirmationModal
        isOpen={isSuccessModalOpen}
        onClose={handleCloseSuccessModal}
        bodyClassName='!gap-y-5'
        title={FormJson.forgotPassword.passwordChanged.title}
        subTitle={FormJson.forgotPassword.passwordChanged.subtitle}
        buttonLabel={FormJson.forgotPassword.passwordChanged.buttonLabel}
      />
      </div>
    </FormProvider>
  );
};

export default ResetPassword;
