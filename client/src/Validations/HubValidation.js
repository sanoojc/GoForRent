import * as Yup from 'yup'
export const HubValidationSchema=Yup.object().shape({
    hubName:Yup.string().trim().required('please fill this field'),

})