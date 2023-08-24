import * as Yup from 'yup';

export const SignupValidationSchema = Yup.object().shape({
  name: Yup.string().trim().required('Name is required'),
  email: Yup.string().trim().email('Invalid email').required('Email is required'),
  number: Yup.string()
    .trim()
    .matches(/^\d{10}$/, 'Number must be exactly 10 digits')
    .required('Number is required'),
  password: Yup.string().trim().min(4).required('Password is required'),
  confirmPassword: Yup.string()
    .trim()
    .oneOf([Yup.ref('password'), null], 'Passwords do not match')
    .required('Password confirmation is required'),
});
