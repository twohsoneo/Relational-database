const initState = {
    change: false, 
    cart: [],
    collection: [],
    loggedIn: true,
    user:{
        email: "",
        password: "",
        }
};

const rootReducer = (state=initState, action) =>{
    if(action.type ==="INIT_CART"){
        return{
            ...state,
            cart:action.value
        }
    }
    if(action.type ==="INIT_COLLECTION"){
        return{
            ...state,
            collection:action.value
        }
    }
    if(action.type==="CHECK_CHANGE") {
        return {
            ...state,
            change : !state.change

        }
    }
    if(action.type==="CHECK_LOGGED_IN") {
        return {
            ...state,
            loggedIn:action.loggedIn
        }
    }
    if(action.type==="CURRENT_USER") {
        return {
            ...state,
            user: {
                name: action.user.displayName,
                email: action.user.email,
                password: action.user.password,
                id: action.user.uid
            }
        }
    }
    return state
};

export default rootReducer;