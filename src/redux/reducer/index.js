const initState = {
    change: false, 
    cart: [],
    collection: [],
    user:{
        fName: "Mike",
        lName: "Lock",
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
    return state

};

export default rootReducer;