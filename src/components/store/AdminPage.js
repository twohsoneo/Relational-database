import React from "react";
import {useDispatch} from "react-redux";
import {checkChange} from "../../redux/actions/setActions";
import fire from "../../fire/fire";

function AdminPage() {


    const dispatch = useDispatch();
    const [value, setValues]= React.useState({
        name: "",
        imgSource: ""
    });

    const db = fire.firestore();

    const handleChange = prop => event => {
        setValues({...value, [prop]: event.target.value});
    };

    const submit=()=>{
            db.collection("products").add(value).then(() =>
            {
                setValues({
                    name: "",
                    imgSource: ""
                });
                dispatch(checkChange());
            })

    };



    return (
        <div>
            <h1>Add a new item</h1>
            <input type="text" placeholder="Name" onChange={handleChange("name")} value={value.name}/>
            <input type="text" placeholder="imgSource" onChange={handleChange("imgSource")} value={value.imgSource}/>
            <div>{value.name} {value.imgSource}</div>
            <button onClick={submit}>Submit</button>
        </div>
    )
}

export default AdminPage;