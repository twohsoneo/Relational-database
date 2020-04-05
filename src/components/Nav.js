import React from "react";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import fire from "../fire/fire";
import {checkLoggedIn} from "../redux/actions/setActions";

function Nav() {

    const loggedIn = useSelector(state=>state.loggedIn);

    const signOut = ()=>{
        fire.auth().signOut().then(function() {
            checkLoggedIn(false);
            // signed out
        }).catch(function(error){
            //an error happened
        })
    };

    return (
        <div>

            {loggedIn ?
                (<nav>
                    <Link to={"/"}>Home </Link>
                    <Link to={"/storefront"}>Store </Link>
                    <Link to={"/collection"}>My Collection </Link>
                    <Link to={"/admin"}>Admin</Link>
                    <br/>
                    <button onClick={signOut}><Link to={"/"}>Logout</Link></button>
                </nav>) :
                (<nav>
                        <Link to={"/"}>Login </Link>
                        <Link to={"/signup"}>Sign Up </Link>
                    </nav>
                )}

        </div>
    )
}






export default Nav;