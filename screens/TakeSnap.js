import React, { Component } from 'react'
import { Camera } from 'expo-camera';
import { StyleSheet, Text, View,Button,TextInput,ScrollView,FlatList,Image,Icon,TouchableOpacity } from 'react-native';


export default class TakeSnap extends Component {
    constructor(){
        super()
        this.state={
            hasCameraPermission: null,

    type: Camera.Constants.Type.back,
    modalVisible: false,
        }
    }

    async componentDidMount() {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      this.setState({ hasCameraPermission: status === 'granted' });
    }
    async capture() {
        const photo = await this.camera.takePictureAsync();
        this.setState({photo: photo})
        console.log('photo *********', photo);
        let objTd={
          key:this.state.index.toString(),
          uri:this.state.photo.uri,
        }
        
        this.state.picsArr.push(objTd)
        this.setState({picsArr:this.state.picsArr,home:true,index:this.state.index+1})
        console.log(this.state.picsArr)
        // this.setState({photo: photo.uri})
      }
    render() {
        const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
    


    <View style={{ flex: 1 }}>
          <Camera
            ref={ref => {
              this.camera = ref;
            }} 
            style={{ flex: 1 }} 
            type={this.state.type}>

                {/* back home */}

        <View style={{flex:0.1,marginTop:50}}>

           <Button title='go to Home' style={{flex:0.1,marginTop:50}}  onPress={()=>{this.props.navigation.navigate('Chat')}} />  
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
{
  this.state.editBool ? 
  <Button title='Replace' style={{flex:0.1,marginTop:100,color:'yellow'}} onPress={()=>this.editFun()} />  
  :

 <Button title='Take Snap' style={{flex:0.1,marginTop:100, color:'green'}} onPress={()=>this.capture()} />  
}
</View>


          {/* <View>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'flex-end',
                }}
                onPress={() => this.capture()}>
                  <Image 
                    source={{uri: 'http://expertizo.pk/cowmandii/img/logo.png'}}
                    style={{width: 100, height: 100}}
                     />
              </TouchableOpacity>
            </View> */}
          </Camera>
        </View> 
      );

        }
    }
      
}
