import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import fire from "../../fire/fire";
import {checkChange, initCollection} from "../../redux/actions/setActions";
import {Link} from "react-router-dom";

function MyCollection() {


    const collection = useSelector(state=>state.collection);
    const dispatch = useDispatch();
    const db = fire.firestore();
    const imageLink = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHcAAAB3CAMAAAAO5y+4AAAAVFBMVEUAAADk5OSgoKD6+vrt7e3p6elCQkI7OzvV1dX9/f3x8fHY2Nizs7OdnZ2ampo+Pj5HR0cuLi7ExMQcHBwQEBC5ubne3t6oqKgmJiY1NTXKysqMjIyDbwctAAACPklEQVRoge3a63aqMBAFYAmZNgkSz6EKp/b937N4qQ00GSY3T3/MfgC/lcts0OVux+FwOBzOb8vb4aVWDm9h1nayXjobYgcjoV6kGQKrNQBNvQAY/4qbmupVbryuqcw2jfGxR1ndlcdf5O6e4HrPl1122WWXXXbZZZdddtllN8mF/ZD/NTXehaHvz9lwtAvnXgihcuFoV11Y0XfPdsU9z3VhEmXgOBf2/RfbT1lHHOXC6cHO8D4HjnFhsMKJPWXAEe5tgpz0Gf0R4SqxTkZ/0N1x6n/A6f1Bd32sECP24ch2UF1nghY7PSHs3oYvANFdTBARnmxvhzwXztbPevsDzCWjukQaf2iuCrIzvB5j016jr2m90eaV4o6BTb5ldYrGTy1Y+eJlV+4oUFdY994CgYU/fnbl+ifI3WpnjLeXG2aXbugqu1F0F2Fdd36d2mad/thyg2e7dv2Fsd7pieiGbnKi+w3jrm7/ImyCe38NANUFRva+2n8Ym+Je+wOUxVxt3lE2yZ37QyqBuVoecDbNnd8/BOZiA5TlXmot7BLYVFcgLoWt4KJ1Uc/F66Kau1EXtdytuqjkbtZFHXe7Lqq4Gig3ubhLmtvybhRbzqXVhc9tOhUVubzJ5Cv1w42MWbDUASrq6pZYF2VdbWjlWNjVkvQoKO3G1EVBN25ui7lpbLarZRKb68bWRSE3ui4eQX8d2nLj6+KRj/QFm4S6+M4pGW4T6sJdsWrS/qM4pt3kR47vryk5JJ8th8PhcDj/NZ9BU0T6mTgnOQAAAABJRU5ErkJggg=="
    const user = useSelector(state=>state.user);
    React.useEffect(()=> {
        let newItems = [];
        console.log("Collection data");
        let user = fire.auth().currentUser;


        db.collection("users")
            .doc(user.uid)
            .collection("myCollection").get().then(function (snapshot) {
            snapshot.forEach(function (doc) {
                const object = doc.data();
                let item = {
                    name: object.name,
                    imgSource: object.imgSource,
                    storeId: object.storeId,
                    id: doc.id
                };
                newItems.push(item);
            });

            dispatch(initCollection(newItems));
        });
    },[db]);







    const deleteFromMyCollection = (id) => {
            db.collection("users")
                .doc(user.id)
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
            <div><img src={it.imgSource?it.imgSource:imageLink} onError={(e)=>{e.target.onerror = null; e.target.src=imageLink}} alt={it.name}/>
            </div>
            <div>
                <button onClick={()=>{deleteFromMyCollection(it.id)}}>Remove from my Collection</button>
                <Link to={"/products/"+it.storeId}><button>View</button></Link>
            </div>
        </div>
    );
    return (
        <div>
            <h1>My Collection</h1>
            <div>{collection.length===0?"No items found":allMyCollection}</div>
        </div>
    )
}

export default MyCollection