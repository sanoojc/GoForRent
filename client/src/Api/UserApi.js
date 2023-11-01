import axiosInstance from "../axios/axios"

export const signup=(data)=> axiosInstance('userToken').post('/signup',data)
export const login=(data)=> axiosInstance('userToken').post('/login',data)
export const sentOtp=(otp)=> axiosInstance().post(`/verifyOtp/${otp}`)
export const resendOtp=(email)=> axiosInstance().post(`/resendOtp`,email)
export const authenticate=()=> axiosInstance('userToken').get('/check-auth')
export const logout=()=> axiosInstance('userToken').post('/logout')
export const loginWithGoogle=(response)=> axiosInstance('userToken').post('/google-auth',response)
export const getVehicles=(name,page,count,text,hub,filter)=>axiosInstance('userToken').post(`/vehicle?name=${name}&page=${page}&count=${count}&sort=${text}&hub=${hub}`,filter)
export const checkoutVerification=(data)=> axiosInstance('userToken').post('/checkout',data)
export const paymentVerification=(data)=>axiosInstance('userToken').post("/verifyPayment",data)
export const filterElements=()=>axiosInstance('userToken').get('/filter')
export const fetchBookings=(id)=>axiosInstance('userToken').get(`/bookingDetails?id=${id}`)
export const getHub=()=>axiosInstance('userToken').get('/getHub')
export const getUser=(id)=>axiosInstance('userToken').get(`/getUser/${id}`)
export const editUser=(details)=>axiosInstance('userToken').put(`/user`,details)
export const fetchBookedDates=(id)=>axiosInstance('userToken').get(`/bookingDates/${id}`)
export const changePassword=(data)=>axiosInstance('userToken').patch(`/password`,data)
export const setNewPassword=(data)=>axiosInstance('userToken').patch(`/changePassword`,data)
export const cancelBooking=(id)=>axiosInstance('userToken').patch(`/refund`,{id})
export const forgotPassword=(email)=>axiosInstance('userToken').post(`/forgotPassword`,{email})
export const verifyMail=(details)=>axiosInstance('userToken').post(`/verifyMail`,details)
export const uploadProof=(data)=>axiosInstance('userToken').post(`/proof`,data)




export const userChats=(id)=>axiosInstance('userToken').get(`/chat/${id}`)
export const getMessages=(id)=>axiosInstance('userToken').get(`/message/${id}`)
export const addMessage=(data)=>axiosInstance('userToken').post(`/message`,data)