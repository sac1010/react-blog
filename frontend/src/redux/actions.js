import { REMOVE_USER, SET_LOADING, SET_TOKEN } from "./actionType";
import { SET_USER } from "./actionType";

export const setToken = (token)=>{
return{
    type:SET_TOKEN ,
    payload:token
    }
}

export const setUser = (user)=>{
    return{
        type:SET_USER ,
        payload:user
    }
}

export const removeUser = ()=>{
    return{
        type:REMOVE_USER 
        
    }
}

export const setLoading = (payload)=>{
    return{
        type:SET_LOADING,
        payload:payload 
        
    }
}
