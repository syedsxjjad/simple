import { useRef, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { OtpFormData, otpSchema } from '@/validator/auth-validator';
import { useVerifyForgotPasswordOtp, useVerifySignupOtp, useForgotPassword, useResendSignupOtp } from '@/hooks/useAuth';

const OTP_LENGTH = 6;
const TIMER_DURATION = 120;

export const useOtpVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const verifyForgotOtpMutation = useVerifyForgotPasswordOtp();
  const verifySignupOtpMutation = useVerifySignupOtp();
  const resendForgotPasswordOtpMutation = useForgotPassword();
  const resendSignupOtpMutation = useResendSignupOtp();

  const [isSignupOtpVerifiedModalOpen, setIsSignupOtpVerifiedModalOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [isTimerActive, setIsTimerActive] = useState(true);

  const searchParams = new URLSearchParams(location.search);
  const isSignup = searchParams.get('isSignup') === 'true';
  const isForgotPassword = searchParams.get('isForgotPassword') === 'true';
  const email = searchParams.get('email') || '';
  const otpToken = searchParams.get('token') || '';
  const isFromSignup = isSignup;

  const {
    handleSubmit,
    getValues,
    watch,
    setValue,
    formState: { errors },
  } = useForm<OtpFormData>({
    resolver: yupResolver(otpSchema),
    defaultValues: { otp: new Array(OTP_LENGTH).fill('') },
  });

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (!isTimerActive || timeLeft <= 0) {
      setIsTimerActive(false);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsTimerActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isTimerActive, timeLeft]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleResendOtp = () => {
    if (!email || !otpToken) return;
    const onResendSuccess = () => {
      setTimeLeft(TIMER_DURATION);
      setIsTimerActive(true);
      setValue('otp', new Array(OTP_LENGTH).fill(''));
      inputRefs.current[0]?.focus();
    };
    if (isFromSignup) {
      resendSignupOtpMutation.mutate({ email }, { onSuccess: onResendSuccess });
      return;
    }
    resendForgotPasswordOtpMutation.mutate({ email }, { onSuccess: onResendSuccess });
  };

  const fillOtpDigits = (digits: string, startIndex = 0) => {
    const start = digits.length >= OTP_LENGTH ? 0 : startIndex;
    const newOtp = [...getValues('otp')];
    const chars = digits.slice(0, OTP_LENGTH - start).split('');
    if (digits.length >= OTP_LENGTH) {
      for (let i = 0; i < OTP_LENGTH; i++) newOtp[i] = chars[i] ?? '';
    } else {
      chars.forEach((digit, i) => { newOtp[start + i] = digit; });
    }
    setValue('otp', newOtp, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
    const lastFilledIndex = Math.min(start + chars.length - 1, OTP_LENGTH - 1);
    inputRefs.current[lastFilledIndex]?.focus();
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value.replace(/\D/g, '');
    if (val.length > 1) { fillOtpDigits(val, index); return; }
    setValue(`otp.${index}`, val, { shouldValidate: true, shouldDirty: true });
    if (val.length === 1 && index < OTP_LENGTH - 1) inputRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)) {
      if (e.key === 'Backspace' || e.key === 'Delete') {
        const current = getValues(`otp.${index}`);
        if (e.key === 'Backspace') {
          if (current) {
            setValue(`otp.${index}`, '', { shouldValidate: true, shouldDirty: true });
          } else if (index > 0) {
            inputRefs.current[index - 1]?.focus();
          }
        } else if (current) {
          setValue(`otp.${index}`, '', { shouldValidate: true, shouldDirty: true });
        }
      }
      return;
    }
    if (!/^[0-9]$/.test(e.key)) e.preventDefault();
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>, index: number) => {
    e.preventDefault();
    const digits = e.clipboardData.getData('text').replace(/\D/g, '');
    if (!digits) return;
    fillOtpDigits(digits, index);
  };

  const handleOtpClick = (index: number) => {
    const currentValues = getValues('otp');
    const firstEmptyIndex = currentValues.findIndex((value: string) => !value || value === '');
    if (firstEmptyIndex !== -1 && firstEmptyIndex < index) {
      inputRefs.current[firstEmptyIndex]?.focus();
    }
  };

  const onSubmit = (data: OtpFormData) => {
    if (!data) return;
    const otpString = data.otp.join('');
    if (isFromSignup && email) {
      verifySignupOtpMutation.mutate({ email, otp: otpString, otpToken }, {
        onSuccess: () => setIsSignupOtpVerifiedModalOpen(true),
      });
    } else if (isForgotPassword && email) {
      verifyForgotOtpMutation.mutate({ email, otp: otpString, otpToken });
    }
  };

  return {
    handleSubmit,
    otpValues: watch('otp'),
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
    isResending: isFromSignup ? resendSignupOtpMutation.isPending : resendForgotPasswordOtpMutation.isPending,
    email,
    isFromSignup,
    isForgotPassword,
    otpToken,
    isSignupOtpVerifiedModalOpen,
    closeSignupOtpVerifiedModal: () => setIsSignupOtpVerifiedModalOpen(false),
    isLoading: isFromSignup ? verifySignupOtpMutation.isPending : verifyForgotOtpMutation.isPending,
    OTP_LENGTH,
  };
};
