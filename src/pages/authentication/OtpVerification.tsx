import FormJson from '@/locales/en.json';
import Button from '@/components/Form/Button';
import OtpInput from '@/components/Form/OtpInput';
import SectionHeader from '@/components/SectionHeader';
import { useOtpVerification } from '@/hooks/useOtpVerification';
import { Typography } from '@/components/Form/Typography';
import { useNavigate } from 'react-router-dom';
import { PUBLIC_ROUTES } from '@/constant/url';
import ConfirmationModal from '@/components/ConfirmationModal';

const OtpVerification = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    errors,
    onSubmit,
    handleOtpChange,
    handleOtpKeyDown,
    handleOtpPaste,
    handleOtpClick,
    inputRefs,
    timeLeft,
    isTimerActive,
    formatTime,
    handleResendOtp,
    isResending,
    email,
    isFromSignup,
    isLoading,
    OTP_LENGTH,
    otpValues,
    isSignupOtpVerifiedModalOpen,
    closeSignupOtpVerifiedModal,
  } = useOtpVerification();

  const handleLoginModal = () => {
    closeSignupOtpVerifiedModal();
    navigate(PUBLIC_ROUTES.LOGIN);
  };

  const subTitle = isFromSignup
    ? FormJson.forgotPassword.otpVerification.subtitle.replace('{email}', email)
    : FormJson.forgotPassword.otpVerification.resetPasswordSubtitle.replace('{email}', email);

  return (
    <>
      <div className="space-y-6 w-full md:pt-4 h-full flex flex-col justify-between">
        <div>
          <SectionHeader
            title={FormJson.forgotPassword.otpVerification.title}
            subtitleText={subTitle}
          />
          <form className="space-y-7 mt-12" onSubmit={handleSubmit(onSubmit)}>
            <OtpInput
              length={OTP_LENGTH}
              values={otpValues}
              inputRefs={inputRefs}
              onChange={handleOtpChange}
              onKeyDown={handleOtpKeyDown}
              onPaste={handleOtpPaste}
              onClick={handleOtpClick}
            />
            <div>
              {errors.otp && (
                <p className="text-sm -mt-4 text-destructive">
                  {errors.otp.message || FormJson.forgotPassword.otpVerification.otpErrorFallback}
                </p>
              )}
              <div className="flex justify-end items-center -mt-4 gap-2 text-sm">
                {isTimerActive && (
                  <span className="font-semibold text-secondary-dark">{formatTime(timeLeft)}</span>
                )}
              </div>
            </div>
            <Button
              type="submit"
              label={
                isFromSignup
                  ? FormJson.forgotPassword.otpVerification.verifyButton
                  : FormJson.forgotPassword.otpVerification.buttonLabel
              }
              fullWidth
              className="mt-5"
              loading={isLoading}
            />
          </form>
        </div>
        <div className="text-center">
          <Typography variant="span">
            <span className="text-placeholder">{FormJson.forgotPassword.otpVerification.didntGetEmail}</span>
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={isResending || !email || isTimerActive}
              className="text-secondary-dark cursor-pointer ms-1 font-medium text-base underline disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isResending
                ? FormJson.forgotPassword.otpVerification.resending
                : FormJson.forgotPassword.otpVerification.resendOtp}
            </button>
          </Typography>
        </div>
      </div>
      <ConfirmationModal
        isOpen={isSignupOtpVerifiedModalOpen}
        onClose={handleLoginModal}
        title={FormJson.signupOtpSuccess.title}
        subTitle={FormJson.signupOtpSuccess.subtitle}
        buttonLabel={FormJson.signupOtpSuccess.loginButton}
        bodyClassName="!gap-y-5"
      />
    </>
  );
};

export default OtpVerification;
