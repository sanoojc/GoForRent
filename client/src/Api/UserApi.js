import axios from "axios"

export const signup=(data)=>{
    return axios.post('/signup',data)
}
export const login=(data)=>{
   return  axios.post('/login',data)
}
export const sentOtp=(otp,data)=>axios.post(`/sentOtp/${otp}`,data)
export const authenticate=()=>axios.get('/check-auth')