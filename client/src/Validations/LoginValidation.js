import * as Yup from 'yup'
export const loginValidationSchema=Yup.object().shape({
    email:Yup.string().trim().email('Invalid email').required('Email is required'),
    password:Yup.string().trim().required('Password is required').min(4)
})