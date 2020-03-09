import firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyCzjofTIXyJe6bFDu6DQw49zMIb9wJsKWk",
    authDomain: "relationaldb-mql.firebaseapp.com",
    databaseURL: "https://relationaldb-mql.firebaseio.com",
    projectId: "relationaldb-mql",
    storageBucket: "relationaldb-mql.appspot.com",
    messagingSenderId: "873806923111",
    appId: "1:873806923111:web:ef958a02fb2afb59dc9bc2"
};

const fire = firebase.initializeApp(firebaseConfig);
    
export default fire;
