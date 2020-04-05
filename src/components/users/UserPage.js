import React from "react";
import {useSelector} from "react-redux";


function UserPage() {

    const user = useSelector(state=>state.user);
    return(
        <div>
            Welcome {user.name}

        </div>
    )
}

export default UserPage