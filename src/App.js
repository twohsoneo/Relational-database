import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Nav from "./components/Nav";
import Storefront from "./components/store/Storefront";
import MyCollection from "./components/store/MyCollection";
import ItemPage from "./components/store/ItemPage";
import AdminPage from "./components/store/AdminPage";
import {currentUser, checkLoggedIn, initCart} from "./redux/actions/setActions";
import {useDispatch, useSelector} from "react-redux";
import fire from "./fire/fire";
import UserPage from "./components/users/UserPage";
import Login from "./components/users/Login";
import SignUp from "./components/users/SignUp";


function App() {

    const change = useSelector(state=>state.change);
    const dispatch = useDispatch();
    const db = fire.firestore();
    const loggedIn = useSelector(state=>state.loggedIn);


    React.useEffect(()=> {
        let newItems = [];
        console.log("Data got");


        db.collection("products").get().then(function (snapshot) {
            snapshot.forEach(function (doc) {
                const object = doc.data();
                let item = {
                    name: object.name,
                    imgSource: object.imgSource,
                    storeId: doc.id
                };
                newItems.push(item);
            });

            dispatch(initCart(newItems));

        });

        fire.auth().onAuthStateChanged(function(user){
            if(user){
                dispatch(checkLoggedIn(true));
                dispatch(currentUser(user));
            }else{
                dispatch(checkLoggedIn(false));
                dispatch(currentUser({name:""}));
            }
        });
    },[db,dispatch,change]);


    return (
      <Router>
          <div className="App">
              <div className="App">
                    <Nav/>
                  <Switch>
                      <Route path={"/"} exact component={loggedIn?UserPage:Login}/>
                      <Route path={"/products/:id"} component={ItemPage}/>
                      <Route path={"/collection"} component={MyCollection}/>
                      <Route path={"/storefront"} component={Storefront}/>
                      <Route path={"/admin"} component={AdminPage}/>
                      <Route path={"/signup"} component={SignUp}/>

                  </Switch>
                </div>
          </div>
      </Router>
  );
}

export default App;
