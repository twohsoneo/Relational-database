export const initCart = (value)=>{
    return {
        type:"INIT_CART",
        value:value
    }
};
export const initCollection = (value)=>{
    return {
        type:"INIT_COLLECTION",
        value:value
    }
};
export const checkChange =()=>{
    return{
        type:"CHECK_CHANGE"
    }
};

export const checkLoggedIn =(check)=>{
    return {
        type: "CHECK_LOGGED_IN",
        loggedIn: check
    }
};

export const currentUser = (user)=>{
    return {
        type: "CURRENT_USER",
        user:user
    }
};


