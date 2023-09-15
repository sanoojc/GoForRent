
import axiosInstance from '../axios/axios'
export const authenticateAdmin=()=>axiosInstance('adminToken').get('/admin/check-auth')
export const adminLogin=(data)=>axiosInstance().post('/admin/login',data)
export const banUser=(id)=>axiosInstance('adminToken').patch(`/admin/ban/${id}`)
export const listVehicle=(id)=>axiosInstance('adminToken').patch(`/admin/vehicles?id=${id}`)
export const addvehicle=(data)=> axiosInstance('adminToken').post('/admin/vehicles',data)
export const getVehicleData=(id)=>axiosInstance('adminToken').get('/admin/getVehicleData',id)
export const addHub=(data)=>axiosInstance('adminToken').post('/admin/hubs',data)
export const listHub=(id)=>axiosInstance('adminToken').patch(`/admin/hubs?id=${id}`)
export const addCategory=(data)=>axiosInstance('adminToken').post('/admin/category',{data})
export const getCategories=()=>axiosInstance('adminToken').get('/admin/category')
