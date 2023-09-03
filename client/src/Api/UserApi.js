import axios from "axios"

export const signup=(data)=> axios.post('/signup',data)
export const login=(data)=>axios.post('/login',data)
export const sentOtp=(otp)=>axios.post(`/verifyOtp/${otp}`)
export const resendOtp=(email)=>axios.post(`/resendOtp`,email)
export const authenticate=()=>axios.get('/check-auth')
export const logout=()=>axios.post('/logout')
