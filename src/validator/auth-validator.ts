import * as yup from 'yup';

const passwordValidation = yup
  .string()
  .min(8, 'Password must be at least 8 characters')
  .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
  .matches(/[0-9]/, 'Password must contain at least one number')
  .matches(/[^A-Za-z0-9]/, 'Password must contain at least one special character')
  .max(50, 'Password must be less than 50 characters')
  .required('Password is required');

export const emailValidation = yup.string().email('Please enter a valid email address').required('Email Address is required');

export const signupSchema = yup.object({
  fullName: yup
    .string()
    .required('Full name is required')
    .min(2, 'Full name must be at least 2 characters')
    .max(50, 'Full name must be less than 50 characters')
    .matches(/^[a-zA-Z\s'-]+$/, 'Full name can only contain letters, spaces, hyphens, and apostrophes'),
  email: emailValidation,
  role: yup
    .string()
    .oneOf(['TRAINER', 'SYNDICATE_MANAGER'], 'Please select a role')
    .required('Role is required'),
  password: passwordValidation,
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

export const loginSchema = yup.object({
  email: emailValidation,
  password: passwordValidation,
  rememberMe: yup.boolean().optional(),
});

export const otpSchema = yup.object({
  otp: yup.array().of(yup.string().required()).length(6, 'OTP must be 6 digits').required('OTP is required'),
});

export const forgotPasswordSchema = yup.object({
  email: emailValidation,
});

export const setNewPasswordSchema = yup.object({
  currentPassword: yup
    .string()
    .required('Current password is required')
    .min(8, 'Current password must be at least 8 characters')
    .max(50, 'Current password must be less than 50 characters'),
  newPassword: passwordValidation,
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Passwords must match')
    .required('Confirm password is required'),
});

export const resetPasswordSchema = yup.object({
  newPassword: passwordValidation,
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Passwords must match')
    .required('Confirm password is required'),
});

export const settingsSchema = yup.object({
  fullName: yup
    .string()
    .required('Full name is required')
    .min(2, 'Full name must be at least 2 characters')
    .max(50, 'Full name must be less than 50 characters')
    .matches(/^[a-zA-Z\s]+$/, 'Full name can only contain letters and spaces'),
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address')
    .max(50, 'Email must be less than 50 characters'),
});

export const selectPlanSchema = yup.object({
  role: yup
    .string()
    .oneOf(['trainer', 'syndicateManager'], 'Please select package')
    .required('Please select a Package'),
});

export const inviteSyndicateMemberSchema = yup.object({
  email: emailValidation,
});

export const inviteSignupSchema = yup.object({
  fullName: yup
    .string()
    .required('Full name is required')
    .min(2, 'Full name must be at least 2 characters')
    .max(50, 'Full name must be less than 50 characters')
    .matches(/^[a-zA-Z\s'-]+$/, 'Full name can only contain letters, spaces, hyphens, and apostrophes'),
  password: passwordValidation,
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

const phoneValidation = yup
  .string()
  .optional()
  .test('phone-no-letters', 'Phone number should not contain letters', val => {
    if (!val) return true;
    return /^[\d+\-.\s()]+$/.test(val);
  })
  .test('phone-length', 'Please enter a valid phone number (10–15 digits)', val => {
    if (!val) return true;
    const digits = val.replace(/\D/g, '');
    return digits.length >= 10 && digits.length <= 15;
  });

export const settingProfileSchema = yup.object({
  fullName: yup
    .string()
    .required('Full name is required')
    .min(2, 'Full name must be at least 2 characters')
    .max(50, 'Full name must be less than 50 characters')
    .matches(/^[a-zA-Z\s'-]+$/, 'Full name can only contain letters, spaces, hyphens, and apostrophes'),
  email: yup.string().optional(),
  phone: phoneValidation,
});


export type LoginFormData = yup.InferType<typeof loginSchema>;
export type SignupFormData = yup.InferType<typeof signupSchema>;
export type SelectPlanFormData = yup.InferType<typeof selectPlanSchema>;
export type InviteSyndicateMemberFormData = yup.InferType<typeof inviteSyndicateMemberSchema>;
export type InviteSignupFormData = yup.InferType<typeof inviteSignupSchema>;
export type OtpFormData = yup.InferType<typeof otpSchema>;
export type ForgotPasswordFormData = yup.InferType<typeof forgotPasswordSchema>;
export type SetNewPasswordFormData = yup.InferType<typeof setNewPasswordSchema>;
export type ResetPasswordFormData = yup.InferType<typeof resetPasswordSchema>;
export type SettingsFormData = yup.InferType<typeof settingsSchema>;
export type SettingProfileFormData = yup.InferType<typeof settingProfileSchema>;
