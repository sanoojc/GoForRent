import axios from 'axios'
export const authenticateAdmin=()=>axios.get('/admin/check-auth')