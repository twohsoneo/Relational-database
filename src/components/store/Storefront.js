import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import fire from "../../fire/fire";
import {Link} from "react-router-dom";
import {checkChange} from "../../redux/actions/setActions";

function Storefront() {

    const cart = useSelector(state=>state.cart);
    const collection = useSelector(state=>state.collection);
    const dispatch = useDispatch();

    const db = fire.firestore();

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
                .doc("SrCXP8zJ11qnDuJdbDua")
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
            <img src={it.imgSource} alt={it.name}/>
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