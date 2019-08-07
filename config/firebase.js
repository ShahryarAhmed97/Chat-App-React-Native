import * as firebase from 'firebase'
import 'firebase/firestore'
import * as Facebook from 'expo-facebook';
import { StyleSheet, Text, View,Button,Image,Alert } from 'react-native';

// import console = require('console');

 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyDH4cqWj4pXtpZRR6Ja9g_DpXNjBMoZAc4",
    authDomain: "shary-chatapp.firebaseapp.com",
    databaseURL: "https://shary-chatapp.firebaseio.com",
    projectId: "shary-chatapp",
    storageBucket: "shary-chatapp.appspot.com",
    messagingSenderId: "739193686298",
    appId: "1:739193686298:web:11288712ebebc63c"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const storage = firebase.storage();

async function logInFb() {
  // Alert.alert('firebase start ')
    return  new Promise( async (res,rej)=>{

        try {
            
            
            const {
                type,
                token,
                expires,
                permissions,
        declinedPermissions,
    } =
     await Facebook.logInWithReadPermissionsAsync('282146025811517', {
        permissions: ['public_profile'],
    });
    if (type === 'success') {
        
     
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
       firebase.auth().signInWithCredential(credential)
       .then( async(success)=>{
      var id=firebase.auth().currentUser.uid
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}&fields=id,email,name,birthday,picture.type(large)`
      );
      var { picture, name, email } = await response.json();
        //  Alert.alert('Logged in!', `Hi ${name}!`)
        //  Alert.alert('Logged in!', `Hi ${name},${picture}!`)
        

        var obj={
          id,
       email: email ? email :'not found',
         name,
        // profile:picture.data.url,
        
          createdAt:Date.now()
  
        }
// Alert.alert(JSON.stringify(picture))


      db.collection('allusers').doc(id).set(obj)
      .then((suc)=>{
        res(true)
        // allUserFun()
          })
        

        })
        .catch((error) => {
            // Handle Errors here.
            Alert.alert('ye wla'+error.message)
            console.log(error.message)
        });
        
      } else {
        // type === 'cancel'
    }
    } catch ({ message }) {
        alert(`Facebook Login Error: ${message}`);
    }

   })

}


function allUserFun(){
  return new Promise((resolve,reject)=>{
  

    db.collection("allusers")
    .onSnapshot(function(snap) {
        var users = [];
        snap.forEach(function(doc) {
          let obj={
            name:doc.data().name,
            id:doc.id
          }
            users.push(obj);
            resolve(users)
            // Alert.alert(doc.id)
        });
        // Alert.alert("Current cities in CA: ", users.join(", "));
        // Alert.alert(users)
    });


  })
}


function createRoom(frndId){
  const userId=firebase.auth().currentUser.uid
  let chatExists=false

  return new Promise((res,rej)=>{
      db.collection('chatRooms')
      .where('users.'+userId,'==',true)
      .where('users.'+frndId,'==',true)
      .get()
      .then((snap)=>{
          snap.forEach(elem=> {
              chatExists={data:elem.data(),_id:elem.id}
              
          });
          if(!chatExists){
              console.log(frndId)
              // let userUid=localStorage.getItem('userUid')
              const obj={
                  createdAt:Date.now(),
                  users:{
                      [frndId]:true,
                      [firebase.auth().currentUser.uid]:true
                  }

              }

              db.collection('chatRooms').add(obj).then((snap1)=>{
                  // res({data:obj,_id:snap1.id})
                  // res({uid:firebase.auth().currentUser.uid})
                  res({data:obj,_id:snap1.id})
              })
          }
          else{
             console.log('else',frndId)

              res(chatExists)
          }



      })
  })
  

}

function sendMessageToDb(roomId,message){
  const obj={
   msg:message ,
   userId:firebase.auth().currentUser.uid,
   timestamp:Date.now(),
  }

  db.collection('chatRooms').doc(roomId).collection('messeges').add(obj)

}


async function addStory(user, image) {

  const response = await fetch(image);
  const blob = await response.blob();
  let storyName = image.split(/[\\/]/g).pop().split('.')[0];
  var ref = storage.ref().child(`stories/${storyName}`);


  return ref.put(blob);

}


export{
    logInFb,
    allUserFun,
    createRoom,
    sendMessageToDb,
    addStory,
}