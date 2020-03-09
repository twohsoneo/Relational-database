import React from "react";
import {useSelector} from 'react-redux';
import {Link} from "react-router-dom";

function ItemPage(props) {

    const cart = useSelector(state=>state.cart);

/*    const returnStoreItem = (storeItem) => {
        // might need to change to storeItem.storeID
        return storeItem.storeId === props.match.params.id;
    };
*/
    const item = cart.find(storeItem=>storeItem.storeId === props.match.params.id);

    return (
        <div>
            <h1>Card Name: {item.name}</h1>
            <img src={item.imgSource} alt={item.name}/>
            <div>
                <Link to={"/storefront"}><button>Store</button></Link>
                <Link to={"/user"}><button>My Collection</button></Link>
            </div>
        </div>

    )
}

export default ItemPage