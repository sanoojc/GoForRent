import axios from 'axios'
export const authenticateAdmin=()=>axios.get('/admin/check-auth')
export const adminLogin=(data)=>axios.post('/admin/login',data)
export const banUser=(id)=>axios.patch(`/admin/ban/${id}`)
export const addvehicle=(data)=> axios.post('/admin/vehicles',data)
