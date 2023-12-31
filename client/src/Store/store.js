import { createStore } from 'redux'

const initialState={
    admin:{login:null},
    user:{login:null,
         data:null,
        bookings:null},
    refresh:true
}
function reducer(state=initialState,action){
    switch(action.type){
        case 'user': return {...state,user:action.payload}
        case 'admin': return {...state,admin:action.payload}
        case 'employees': return {...state,employees:action.payload}
        case 'refresh': return {...state,refresh:!state.refresh}
        default: return {...state}
    }
}
export default createStore(reducer)