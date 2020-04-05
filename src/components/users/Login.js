import React from "react";
import fire from "../../fire/fire";
import {Link} from "react-router-dom";

function Login() {

    const [value, setValues] = React.useState({
        email: "",
        password: ""
    });

    const handleChange = prop => event => {
        setValues({...value, [prop]: event.target.value});
    };

    const onSubmit = () => {
        console.log(value);
        fire.auth()
            .signInWithEmailAndPassword(value.email,value.password)
            .then(()=>
                setValues({
                    email: "",
                    password: ""
                })
            )
            .catch(function(error) {
                // Handle errors here
                let errorCode = error.code;
                let errorMessage = error.message;
                // ...
            })
    };

    return(
        <div>
            <input value={value.email} type={"email"} placeholder={"Email"} onChange={handleChange("email")}/>
            <br/>
            <input value={value.password} type={"password"} placeholder={"Password"} onChange={handleChange("password")}/>
            <br/>
            <button onClick={onSubmit}><Link to={"/"}>Submit</Link></button>
        </div>
    )
}

export default Login