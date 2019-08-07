import React, { Component } from 'react'
import { StyleSheet,Alert, Text, View,Button,ScrollView,FlatList,Image,Icon,TouchableOpacity } from 'react-native';
import { IconButton, Colors } from 'react-native-paper';
import { Searchbar } from 'react-native-paper';
import {KeyboardAvoidingView} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import {allUserFun, createRoom,sendMessageToDb} from '../config/firebase'


import * as firebase from 'firebase'
import 'firebase/firestore'
// var firebaseConfig = {
//   apiKey: "AIzaSyDH4cqWj4pXtpZRR6Ja9g_DpXNjBMoZAc4",
//   authDomain: "shary-chatapp.firebaseapp.com",
//   databaseURL: "https://shary-chatapp.firebaseio.com",
//   projectId: "shary-chatapp",
//   storageBucket: "shary-chatapp.appspot.com",
//   messagingSenderId: "739193686298",
//   appId: "1:739193686298:web:11288712ebebc63c"
// };

// firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();


export default class Chat extends Component {

    constructor(){
        super()
        this.state={
            hasCameraPermission: null,
            type: Camera.Constants.Type.back,
            camBol:false,
            text:'',
            messages:[], 
            currentUser:''


        }
    }

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });

        const { navigation } = this.props;
        const roomId= navigation.getParam('roomId');
        const frndId=navigation.getParam('frndId')
        this.getAllMessages()
        
        
       
      }

     getAllMessages(){
      const { navigation } = this.props;

        const roomId= navigation.getParam('roomId')
        db.collection('chatRooms').doc(roomId).collection('messeges')
        .orderBy('timestamp')
        .onSnapshot(snapshot=>{
          const msgArr=[]
          snapshot.forEach(elem=>{
            msgArr.push({data:elem.data(),_id:elem.id})
            // msgArr.push(elem.id)

            
          })
          this.setState({messages:[...msgArr],currentUser:firebase.auth().currentUser.uid})

          // Alert.alert('allmsgsfun wala wala',firebase.auth().currentUser.uid)
          // Alert.alert(JSON.stringify(this.state.messages[0].data))

          


          // this.setState({messages},()=>{
          //   const scrollHeight=this.messageList.scrollHeight
          //   const height=this.messageList.clientHeight
          //   const maxScrollTop=scrollHeight-height
          //   this.messageList.scrollTop=maxScrollTop > 0 ? maxScrollTop :0
          // })

        })

        
        
      }

      sendMessage(){
        const { navigation } = this.props;

        const roomId= navigation.getParam('roomId');
        console.log(this.state.text)
        sendMessageToDb(roomId,this.state.text)
        this.setState({text:''})
      }

      async imagePickerFun(){
       const imgPick=await ImagePicker.launchImageLibraryAsync()

      }

      async audioFun(){
        const recording = new Audio.Recording();
        try {
            
            const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);

          await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
          await recording.startAsync();
          // You are now recording!
        } catch (error) {
          // An error occurred!
        }
      }

      async capture() {
          const photo = await this.camera.takePictureAsync();
          this.setState({photo: photo})
          console.log('photo *********', photo);
          let objTd={
            key:this.state.index.toString(),
            uri:this.state.photo.uri,
          }
        }
   
          


    render() {
        const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
        return (

this.state.camBol ?
//camera

<View style={{ flex: 1 }}>
<Camera
  ref={ref => {
    this.camera = ref;
    this.ImagePicker=ref;
  }} 
  style={{ flex: 1 }} 
  type={this.state.type}>

      {/* back home */}

{/* <View style={{flex:0.1,marginTop:50}}>

 <Button title='go to Home' style={{flex:0.1,marginTop:50}}  onPress={()=>{this.setState({camBol:false})}} />  
</View> */}
<View style={{flex:0.1,marginTop:50,width:100,alignSelf:'flex-start'}}>
    <Button title='go to Chats' style={{flex:0.1,marginTop:100, color:'green'}} color='green' onPress={()=>{this.setState({camBol:false})}} />  
</View>



  <View
    style={{
      flex: 1,
      backgroundColor: 'transparent',
      flexDirection: 'row',
    }}>
    <TouchableOpacity
      style={{
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center',
      }}
      onPress={() => {
        this.setState({
          type:
            this.state.type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back,
        });
      }}>
      <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
    </TouchableOpacity>

  
  </View>
          
  <View style={{flex:0.1,marginTop:50,width:100,alignSelf:'center'}}>
    <Button title='Take Snap' style={{flex:0.1,marginTop:100, color:'green'}} onPress={()=>this.capture()} />  
</View>


</Camera>
</View>

://camera
<View  style={{flex:1,margin:2,}}>

             <View  style={styles.msgsView}>

               {/* {
                 this.state.messages.map((val,inx)=>{
                   Alert.alert(JSON.stringify(val.userId))
                  const sty=firebase.auth().currentUser.uid==val._id ? styles.rMsgs : styles.lMsgs
                  const tx=firebase.auth().currentUser.uid==val._id ? {color:'black',fontSize:15} : {color:'white',fontSize:15}
                  return(

                //     <View style={styles.lMsgs}>

                //     <Text style={{color:'black',fontSize:15}}>
                //       {console.log(val.data)}
                //     </Text>

                // </View>
                    )

                 })
               } */}

<FlatList
      // style={}
        data={this.state.messages}
        renderItem={({ item })=> {
          // var sty=this.state.currentUser==item._id ? styles.rMsgs : styles.lMsgs
          // var tx=this.state.currentUser==item._id ?  {color:'white',fontSize:15} :  {color:'black',fontSize:15} 
          // <View style={this.state.currentUser.toString()==item._id ? styles.rMsgs : styles.lMsgs}>
          //          <Text style={this.state.currentUser.toString()==item._id ?  {color:'white',fontSize:15} :  {color:'black',fontSize:15}}>
          //         {item.data.message }
          //       </Text>
          //     </View>

              return (
                <View>

                  {
                    this.state.currentUser==item.data.userId  ?
                <View style={styles.rMsgs}>
                <Text style={ {color:'white',fontSize:15}} >
                  {item.data.msg }
                </Text>
                <Text>
                  {/* {Alert.alert('left'+(this.state.currentUser==item.data.userId).toString())} */}
                </Text>
              </View>
              :

              <View style={styles.lMsgs}>
              <Text style={{color:'black',fontSize:15}}>
             {item.data.msg }
           </Text>
           {/* <Text>
                  {Alert.alert('right'+(this.state.currentUser==item.data.userId).toString())}
                </Text> */}
                </View>

                  
              
              
              }

            </View>
              )
            }
        }
        keyExtractor={item => item._id}
      />

                

                {/* <View style={styles.lMsgs}>
                <Text style={{color:'black',fontSize:15}}>
                        I m fine ! 123
                    </Text>

                </View> */}

                

      </View> 
 
    <View  style={styles.iconsView} >


             <IconButton
            icon="widgets"
            color={Colors.blue500}
            size={25}
            
            onPress={() => console.log('Pressed')}
            style={{flex:1}}
            />

            <IconButton
            icon="photo-camera"
            color={Colors.blue500}
            size={25}
            onPress={()=>{this.setState({camBol:true})}}
                        style={{flex:1}}

            />

            <IconButton
            icon="image"
            color={Colors.blue500}
            size={25}
            onPress={() => this.imagePickerFun()}
            style={{flex:1,justifyContent:'flex-start'}}

            />

            <IconButton
            icon="mic"
            color={Colors.blue500}
            size={25}
            onPress={() => console.log('Pressed')}
            style={{flex:1}}

            />

                <View  style={styles.SearchBar}>
                    <TextInput 
                    value={this.state.text}
                    onChangeText={(text)=>this.setState({text})}
                    multiline={true}
                    
                    
                    />



      
             <IconButton
            icon="insert-emoticon"
            color={Colors.blue500}
            size={25}
            onPress={() => this.sendMessage()}
            style={{marginLeft:51,marginTop:-8}}
            />
        
</View>



        



<IconButton
            icon="thumb-up"
            color={Colors.blue500}
            size={25}
            onPress={() => console.log('Pressed')}
            style={{flex:1}}
            
            />        

             </View>
     </View> 
            
        )
    }
}
}


const styles = StyleSheet.create({
    
    iconsView:{
        flex:1,
        flexDirection:'row',
        // justifyContent:'space-around',
        alignItems:'flex-end',
        // margin:1,
        

    },
    SearchBar:{
        flex:5,
        flexDirection:'row',
        
        backgroundColor:'#f2f2f2',
        borderRadius:30, 
        // alignSelf:'center',
        // width:200,
        
        height:100,
        // marginTop:14,
        padding:10,
        marginBottom:10,
  
        
  
    },

    msgsView:{
        // flex:1,
        // height:00,
        height:400,


    },
    rMsgs:{
        // flex:0.5,
        height:50,
        width:170,
        backgroundColor:'#305ef2',
        color:'white',
        padding:15,
        margin:5,
        borderRadius:50,
        alignSelf:'flex-end'

    },
    lMsgs:{
     
        // flex:0.5,
        height:50,
        width:170,
        backgroundColor:'#e4e5ed',
        color:'white',
        padding:15,
        margin:5,
        borderRadius:50,
        alignSelf:'flex-start'
    }
})



        