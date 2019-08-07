import React, { Component } from 'react'

// is folder k tmam files route . kr k access hongi 
import {createBottomTabNavigator,createDrawerNavigator,createMaterialTopTabNavigator,createSwitchNavigator, createStackNavigator, createAppContainer } from "react-navigation";
import * as Routes from '../screens/index'
import { IconButton, Colors } from 'react-native-paper';
import { StyleSheet, Text, View,Button,Image } from 'react-native';


// const camNav=createStackNavigator({
//   Chat:{
//     screen:Routes.Chat

//   },
//   TakeSnap:{
//     screen:Routes.TakeSnap
//   }
// })


const homeTabNavigator= createBottomTabNavigator({
  ChatWith:{
    screen: Routes.Home,
    navigationOptions: () => ({
      tabBarIcon:(
        <IconButton
        icon="chat"
        color={Colors.black}
        size={28}
        onPress={() => console.log('Pressed')}
        style={{alignSelf:'center',marginTop:10}}
        />

      ),
      title:'',

    })
  },
  Friends:{
    screen: Routes.Friends,
    navigationOptions: () => ({
      tabBarIcon:(
        <IconButton
        icon="people"
        color={Colors.black}
        size={28}
        onPress={() => console.log('Pressed')}
        style={{alignSelf:'center', marginTop:10}}

        />

      ),
      title:'',

    })

  }

    }
    

    
)




const authNavigator = createStackNavigator({
   
  Home: {
      screen: homeTabNavigator,
      navigationOptions: () => ({
       headerLeft:(
        <Image 
        source={require('../assets/img1.jpg')}
        style={styles.imgScroll}
        />



       ),
       title:'Chats',
              headerRight: (
          <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',}}>

            <View  style={styles.imgView}>

          <IconButton
          icon="photo-camera"
          color={Colors.black}
          size={24}
          onPress={() => console.log('Pressed')}
          />
          </View>

          <View style={styles.imgView} >


          <IconButton
          icon="create"
          color={Colors.black}
          size={24}
          onPress={() => console.log('Pressed')}
          />
          </View>

        </View>
        ),
             
      }),
    },

    Chat:{
        screen:Routes.Chat,
        navigationOptions: () => ({
// title:'Shahryar',
          headerTitle:(
            <View style={{flex:1,flexDirection:'row',justifyContent:'space-around'}}>

            <Image 
            source={require('../assets/img1.jpg')}
            style={styles.chatImg}
            />
            <View style={{flex:1,flexDirection:'column',marginLeft:10,}}>

            <Text style={{fontSize:16}}>
              Shahryar

            </Text>
            <Text style={{fontSize:11,color:'gray'}}>
              Active Now
            </Text>
            </View>

            </View>

          ),
          
          headerRight: (
            <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',}}>
              <View  >
 

          <IconButton
          icon="call"
          color={Colors.blue500}
          size={26}
          onPress={() => console.log('Pressed')}
          />
          </View>

          <View  >


          <IconButton
          icon="videocam"
          color={Colors.blue500}
          size={26}
          onPress={() => console.log('Pressed')}
          />
          </View>


          <View  >


          <IconButton
          icon="info"
          color={Colors.blue500}
          size={26}
          onPress={() => console.log('Pressed')}
          />
          </View>

        </View>
        ),
        })
    }
  
}
);

const logInNav=createSwitchNavigator({

  LogIn:{
    screen:Routes.LogIn,
  },

  AuthNavigator:{
    screen:authNavigator,

  },

  

})



const styles = StyleSheet.create({

  imgScroll:{
    height:42,
    width:42,
    borderRadius:100,
    margin:20,
   

  },
  imgView:{
    height:35,
    width:35,
    borderRadius:50,
    backgroundColor:'#edebe6',
    margin:7,
    alignItems:'center',
    justifyContent:'space-around'


  },
  chatImg:{
    height:35,
    width:35,
    borderRadius:50,
    backgroundColor:'#edebe6',
    marginLeft:5,
    alignItems:'center',
    justifyContent:'space-around'

  }
})

  // export default createAppContainer(authNavigator);
  export default createAppContainer(logInNav);
