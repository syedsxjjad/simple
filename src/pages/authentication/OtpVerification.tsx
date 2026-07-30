import FormJson from '@/locales/en.json';
import Button from '@/components/Form/Button';
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

  const inputClassName =
    'w-full xl:h-[75px] lg:h-14 md:h-12 sm:h-16 h-10 text-center xl:text-3xl lg:text-2xl md:text-2xl text-lg bg-primary font-semibold border border-border focus:ring-2 focus:outline-none focus:ring-secondary-dark focus:bg-secondary-dark/10! focus:text-secondary-dark focus:border-transparent xl:rounded-2xl sm:rounded-xl rounded-lg transition-all duration-200';

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
            <div className="flex justify-center sm:gap-4 gap-2">
              {Array.from({ length: OTP_LENGTH }).map((_, index) => {
                const digit = otpValues?.[index];
                return (
                  <input
                    key={index}
                    type="text"
                    name={`otp.${index}`}
                    value={digit ?? ''}
                    maxLength={1}
                    autoComplete={index === 0 ? 'one-time-code' : 'off'}
                    ref={el => (inputRefs.current[index] = el)}
                    onChange={e => handleOtpChange(e, index)}
                    onKeyDown={e => handleOtpKeyDown(e, index)}
                    onPaste={e => handleOtpPaste(e, index)}
                    onClick={() => handleOtpClick(index)}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    style={{ ...(!digit ? { backgroundColor: '#161E37' } : {}) }}
                    className={`${inputClassName} ${digit ? 'border-secondary-dark bg-background! text-secondary-dark' : 'focus:border-secondary-dark'}`}
                  />
                );
              })}
            </div>
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
