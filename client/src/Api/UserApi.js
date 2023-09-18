import axiosInstance from "../axios/axios"

export const signup=(data)=> axiosInstance('userToken').post('/signup',data)
export const login=(data)=> axiosInstance('userToken').post('/login',data)
export const sentOtp=(otp)=> axiosInstance().post(`/verifyOtp/${otp}`)
export const resendOtp=(email)=> axiosInstance().post(`/resendOtp`,email)
export const authenticate=()=> axiosInstance('userToken').get('/check-auth')
export const logout=()=> axiosInstance('userToken').post('/logout')
export const loginWithGoogle=(response)=> axiosInstance('userToken').post('/google-auth',response)
export const getVehicles=(name,page,count,text)=>axiosInstance('userToken').get(`/vehicle?name=${name}&page=${page}&count=${count}&sort=${text}`)
export const checkoutVerification=(data)=> axiosInstance('userToken').post('/checkout',data)