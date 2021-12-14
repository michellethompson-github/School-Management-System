import { LOGIN_USER, LOGOUT_USER } from "./types";

const initialState = {
    loggedIn: 0
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case LOGIN_USER:
            console.log('State Changes to Logged In');
            return {
                ...state,
                loggedIn: 1
            }
         case LOGOUT_USER:
             console.log('State Changes to Logged Out');
             return {
                 ...state,
                 loggedIn: 0
             }   
         default: return state    
    }
}

export default reducer