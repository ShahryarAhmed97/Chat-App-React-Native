import React, { Component } from 'react'
import {logInFb} from '../config/firebase'
import { StyleSheet, Text, View,Button,Image,Alert } from 'react-native';

export default class LogIn extends Component {
    constructor(){
        super()
        this.state={ 

        }
    }

   async logIn(){
    // Alert.alert('btn press ')

        var res=await logInFb()
        console.log('login resposne',res)
        if(res==true){
            this.props.navigation.navigate('AuthNavigator')
        }
        else{
            Alert.alert('error')
        }

    }

    render() {
        return (
            <View style={{flex:1,marginTop:100}}> 

                <Button title='LogIn' onPress={()=>this.logIn()} />
           </View>
            
        )
    }
}
