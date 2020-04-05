import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import fire from "../../fire/fire";
import {Link} from "react-router-dom";
import {checkChange} from "../../redux/actions/setActions";



function Storefront() {

    const cart = useSelector(state=>state.cart);
    const collection = useSelector(state=>state.collection);
    const dispatch = useDispatch();
    const imageLink = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHcAAAB3CAMAAAAO5y+4AAAAVFBMVEUAAADk5OSgoKD6+vrt7e3p6elCQkI7OzvV1dX9/f3x8fHY2Nizs7OdnZ2ampo+Pj5HR0cuLi7ExMQcHBwQEBC5ubne3t6oqKgmJiY1NTXKysqMjIyDbwctAAACPklEQVRoge3a63aqMBAFYAmZNgkSz6EKp/b937N4qQ00GSY3T3/MfgC/lcts0OVux+FwOBzOb8vb4aVWDm9h1nayXjobYgcjoV6kGQKrNQBNvQAY/4qbmupVbryuqcw2jfGxR1ndlcdf5O6e4HrPl1122WWXXXbZZZdddtllN8mF/ZD/NTXehaHvz9lwtAvnXgihcuFoV11Y0XfPdsU9z3VhEmXgOBf2/RfbT1lHHOXC6cHO8D4HjnFhsMKJPWXAEe5tgpz0Gf0R4SqxTkZ/0N1x6n/A6f1Bd32sECP24ch2UF1nghY7PSHs3oYvANFdTBARnmxvhzwXztbPevsDzCWjukQaf2iuCrIzvB5j016jr2m90eaV4o6BTb5ldYrGTy1Y+eJlV+4oUFdY994CgYU/fnbl+ifI3WpnjLeXG2aXbugqu1F0F2Fdd36d2mad/thyg2e7dv2Fsd7pieiGbnKi+w3jrm7/ImyCe38NANUFRva+2n8Ym+Je+wOUxVxt3lE2yZ37QyqBuVoecDbNnd8/BOZiA5TlXmot7BLYVFcgLoWt4KJ1Uc/F66Kau1EXtdytuqjkbtZFHXe7Lqq4Gig3ubhLmtvybhRbzqXVhc9tOhUVubzJ5Cv1w42MWbDUASrq6pZYF2VdbWjlWNjVkvQoKO3G1EVBN25ui7lpbLarZRKb68bWRSE3ui4eQX8d2nLj6+KRj/QFm4S6+M4pGW4T6sJdsWrS/qM4pt3kR47vryk5JJ8th8PhcDj/NZ9BU0T6mTgnOQAAAABJRU5ErkJggg=="
    const db = fire.firestore();
    const user = useSelector(state=>state.user);

    const addToMyCollection = (storeItem)=>{
        checkChange();
        let inCollection = false;
        const newItem = {
            name:storeItem.name,
            imgSource:storeItem.imgSource,
            storeId: storeItem.storeId
        };
        for(let item in collection){
            if (collection[item].storeId.includes(newItem.storeId)){
                alert("Card already in collection");
                dispatch(checkChange());
                inCollection = true;
                return false;
            }
        }
        if(!inCollection){
            db.collection("users")
                .doc(user.id)
                .collection("myCollection")
                .add(newItem)
                .then(()=>{
                    alert("Card added to collection");
                    dispatch(checkChange());
                });
        }
    };


    let allStoreItems = cart.map((it,idx)=>
        <div key={idx}>
            <h4>{it.name}</h4>
            <img src={it.imgSource?it.imgSource:imageLink} onError={(e)=>{e.target.onerror = null; e.target.src=imageLink}} alt={it.name}/>
            <div>
                <button onClick={()=>{addToMyCollection(it)}}>Add to my Collection</button>
                <Link to={"/products/"+it.storeId}><button>View</button></Link>
            </div>
        </div>
    );

    return (
        <div>
            <h1>Products</h1>
            <div>{cart.length===0?"No items found":allStoreItems}</div>
        </div>
    )
}

export default Storefront