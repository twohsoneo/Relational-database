import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from "./components/Home";
import Storefront from "./components/store/Storefront";
import UserPage from "./components/store/UserPage";
import ItemPage from "./components/store/ItemPage";
import AdminPage from "./components/store/AdminPage";
import {initCart, initCollection} from "./redux/actions/setActions";
import {useDispatch, useSelector} from "react-redux";
import fire from "./fire/fire";

function App() {

    const change = useSelector(state=>state.change);
    const dispatch = useDispatch();
    const db = fire.firestore();

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

    },[db,dispatch,change]);
    React.useEffect(()=> {
        let newItems = [];
        console.log("Collection data");


        db.collection("users")
            .doc("SrCXP8zJ11qnDuJdbDua")
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

    },[db,dispatch,change]);

    return (
      <Router>
          <div className="App">
              <div className="App">
                  <nav>
                      <Link to={"/"}>Home </Link>
                      <Link to={"/storefront"}>Store </Link>
                      <Link to={"/user"}>My Collection </Link>
                      <Link to={"/admin"}>Admin</Link>
                  </nav>
                  <Switch>
                      <Route path={"/"} exact component={Home}/>
                      <Route path={"/products/:id"} component={ItemPage}/>
                      <Route path={"/user"} component={UserPage}/>
                      <Route path={"/storefront"} component={Storefront}/>
                      <Route path={"/admin"} component={AdminPage}/>
                  </Switch>
                </div>
          </div>
      </Router>
  );
}

export default App;
