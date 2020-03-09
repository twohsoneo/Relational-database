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