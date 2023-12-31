
import axiosInstance from '../axios/axios'
export const authenticateAdmin=()=>axiosInstance('adminToken').get('/admin/check-auth')
export const adminLogin=(data)=>axiosInstance().post('/admin/login',data)
export const banUser=(id)=>axiosInstance('adminToken').patch(`/admin/ban/${id}`)
export const addvehicleData=(data)=> axiosInstance('adminToken').post('/admin/vehicles',data)
export const listVehicle=(id)=>axiosInstance('adminToken').patch(`/admin/vehicles?id=${id}`)
export const getVehicleData=(id)=>axiosInstance('adminToken').get('/admin/getVehicleData',id)
export const editVehicleDetails=(id,data)=>axiosInstance('adminToken').put(`/admin/vehicles?id=${id}`,data)
export const addHub=(data)=>axiosInstance('adminToken').post('/admin/hubs',data)
export const listHub=(id)=>axiosInstance('adminToken').patch(`/admin/hubs?id=${id}`)
export const addCategory=(data)=>axiosInstance('adminToken').post('/admin/category',{data})
export const getCategories=()=>axiosInstance('adminToken').get('/admin/category')
export const getCategoryItems=(category)=>axiosInstance('adminToken').get('/admin/category',category) //get all categories
export const AddCategoryItem=(id,item)=>axiosInstance('adminToken').get(`/admin/categoryItem?id=${id}&item=${item}`) //add items in a specific category
export const listBooking=(id)=>axiosInstance('adminToken').patch(`/admin/hubs?id=${id}`)
export const getHub=(name)=>axiosInstance('adminToken').get(`/admin/hubs?name=${name}`)
export const changeBookingStatus=(id,status)=>axiosInstance('adminToken').patch(`/admin/bookings?id=${id}`,{status})
export const getDashboardData=()=>axiosInstance('adminToken').get('/admin/dashboard')
