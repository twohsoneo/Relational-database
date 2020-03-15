import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import fire from "../../fire/fire";
import {checkChange} from "../../redux/actions/setActions";
import {Link} from "react-router-dom";

function UserPage() {


    const collection = useSelector(state=>state.collection);
    const dispatch = useDispatch();
    const db = fire.firestore();

    const deleteFromMyCollection = (id) => {
            db.collection("users")
                .doc("SrCXP8zJ11qnDuJdbDua")
                .collection("myCollection")
                .doc(id)
                .delete()
                .then(()=>{
                    alert("Card removed from collection");
                    dispatch(checkChange());
                })

        };

    let allMyCollection = collection.map((it,idx)=>
        <div key={idx}>
            <h4>{it.name}</h4>
            <div><img src={it.imgSource} alt={it.name}/>
            </div>
            <div>
                <button onClick={()=>{deleteFromMyCollection(it.id)}}>Remove from my Collection</button>
                <Link to={"/products/"+it.storeId}><button>View</button></Link>
            </div>
        </div>
    );
    return (
        <div>
            <h1>UserPage</h1>
            <div>{collection.length===0?"No items found":allMyCollection}</div>
        </div>
    )
}

export default UserPage