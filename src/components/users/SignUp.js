import React from "react";
import fire from "../../fire/fire";
import {useDispatch} from "react-redux";
import {checkChange} from "../../redux/actions/setActions";
import {Link} from "react-router-dom";

function SignUp() {
    const db = fire.firestore();
    let user = fire.auth().currentUser;

    const [value, setValues] = React.useState({
        name: "",
        email: "",
        password: "",
        confirmPassword:""
    });

    const dispatch = useDispatch();

    const handleChange = prop => event => {
        setValues({...value, [prop]: event.target.value});
    };

    const onSubmit = () => {
        if(value.password != value.confirmPassword){
            alert("Passwords must match");
            return
        }
        fire.auth()
            .createUserWithEmailAndPassword(value.email, value.password)
            .then(() => {
                let user = fire.auth().currentUser;
                user.updateProfile({
                    displayName: value.name
                }).then(function () {
                    setValues({
                        name: "",
                        email: "",
                        password: "",
                        confirmPassword: ""
                    });
                    dispatch(checkChange());
                    db.collection("users")
                        .set(user.uid)
                        .collection("myCollection")
                        .add({name: user.displayName});
                }).catch(function (error) {
                    // Handle errors here
                    let errorCode = error.code;
                    let errorMessage = error.message;
                    // ...
                })
            })
    };




    return(
        <div>
            <input value={value.name} type={"text"} placeholder={"Name"} onChange={handleChange("name")}/>
            <br/>
            <input value={value.email} type={"email"} placeholder={"Email"} onChange={handleChange("email")}/>
            <br/>
            <input value={value.password} type={"password"} placeholder={"Password"} onChange={handleChange("password")}/>
            <br/>
            <input error={value.password!==value.confirmPassword}   value={value.confirmPassword} type={"password"} placeholder={"Confirm Password"} onChange={handleChange("confirmPassword")}/>
            <br/>
            <button onClick={onSubmit} ><Link to={"/"}>Submit</Link></button>
        </div>
    )

}

export default SignUp