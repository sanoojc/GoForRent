import * as Yup from 'yup'

export const DetailsValidationSchema=Yup.object().shape({
    licenseNumber:Yup.string().required('required'),
    idType:Yup.string('').required('required'),
    idNumber:Yup.string().required('required')
})