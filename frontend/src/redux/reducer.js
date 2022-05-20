import { REMOVE_USER, SET_LOADING, SET_TOKEN } from "./actionType";
import { SET_USER } from "./actionType";

const initState = {
    token:"",
    userId:"",
    loading:false
}

export const reducer = (state = initState, {type, payload})=>{
    switch (type) {
        case SET_TOKEN:
            return {
                ...state,
                token:payload
            }

            case SET_USER:
                return{
                    ...state,
                    userId:payload.user._id
                }

                case REMOVE_USER:
                    return{
                        ...state,
                        userId:""
                    }

                    case SET_LOADING:
                        return{
                            ...state,
                            loading:payload
                        }
            
    
        default:
            return state
    }
}