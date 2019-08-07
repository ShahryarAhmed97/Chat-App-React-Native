import React, { Component } from 'react'
import { StyleSheet,Alert, Text, View,Button,TextInput,ScrollView,FlatList,Image,Icon,TouchableOpacity } from 'react-native';
// import {} from 'expo'
import {  SearchBar,List, ListItem} from 'react-native-elements';
import img1 from '../assets/img1.jpg'
import img2 from '../assets/img2.jpg'
import img3 from '../assets/img3.png'
import img4 from '../assets/img4.jpg'
import img5 from '../assets/img5.jpg'
import img6 from '../assets/img6.jpg'
import img7 from '../assets/img7.jpg'
import img8 from '../assets/img8.jpg'

// import { Ionicons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Searchbar } from 'react-native-paper';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { IconButton, Colors } from 'react-native-paper';

   
    import {allUserFun, createRoom,sendMessageToDb} from '../config/firebase'

export default class Home extends Component {
  constructor(){
    super()
    this.state={
      // usersArr:[],
      list:[
        {
          name: 'Amy Farha',
          avatar_url: '../assets/img1.jpg',
          subtitle: 'Vice President'
        },
        {
          name: 'Chris Jackson',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
          subtitle: 'Vice Chairman'
        },
        {
          name: 'Amy Farha',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
          subtitle: 'Vice President'
        },
        {
          name: 'Chris Jackson',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
          subtitle: 'Vice Chairman'
        },{
          name: 'Amy Farha',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
          subtitle: 'Vice President'
        },
        {
          name: 'Chris Jackson',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
          subtitle: 'Vice Chairman'
        },{
          name: 'Amy Farha',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
          subtitle: 'Vice President'
        },
        {
          name: 'Chris Jackson',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
          subtitle: 'Vice Chairman'
        },{
          name: 'Amy Farha',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
          subtitle: 'Vice President'
        },
        {
          name: 'Chris Jackson',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
          subtitle: 'Vice Chairman'
        },{
          name: 'Amy Farha',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
          subtitle: 'Vice President'
        },
        {
          name: 'Chris Jackson',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
          subtitle: 'Vice Chairman'
        },{
          name: 'Amy Farha',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
          subtitle: 'Vice President'
        },
        {
          name: 'Chris Jackson',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
          subtitle: 'Vice Chairman'
        },{
          name: 'Amy Farha',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
          subtitle: 'Vice President'
        },
        {
          name: 'Chris Jackson',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
          subtitle: 'Vice Chairman'
        },{
          name: 'Amy Farha',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
          subtitle: 'Vice President'
        },
        {
          name: 'Chris Jackson',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
          subtitle: 'Vice Chairman'
        },{
          name: 'Amy Farha',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
          subtitle: 'Vice President'
        },
        {
          name: 'Chris Jackson',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
          subtitle: 'Vice Chairman'
        },{
          name: 'Amy Farha',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
          subtitle: 'Vice President'
        },
        {
          name: 'Chris Jackson',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
          subtitle: 'Vice Chairman'
        },
     
      ]
    }
  }

    async componentDidMount(){

      const res=await allUserFun()
    if(res){
      
      this.setState({usersArr:[...res]})
      
    }
  }
    


 async  chatRoomFun(frndId){
const res=await createRoom(frndId)
if(res){
// Alert.alert(res._id)
  this.props.navigation.navigate('Chat', {
    frndId ,
    roomId:res._id,
    
  })


}

  }


  
    render() {

return (
            <View>

{/* <View style={styles.searchView}> */}

      <Searchbar
        placeholder="Search"
        onChangeText={query => { this.setState({ firstQuery: query }) }}
        // value='text'
        style={styles.SearchBar}
        />
  {/* </View>s */}

  

  <ScrollView
  
        horizontal={true}
        style={styles.contentContainer}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={styles.scrolView}
        >
          
          <View  style={styles.imgScrolView}>

              <IconButton
              icon="add"
              color={Colors.black}
              size={30}
              onPress={() => console.log('Pressed')}
              />
              </View>

          <View style={{flex:1,flexDirection:'column',}}>

           <Image 
           source={require('../assets/img2.jpg')}
           style={styles.imgScroll}
           />
           <Text>
             shary
           </Text>
           </View>
           
            <Image 
           source={require('../assets/img3.png')}
           style={styles.imgScroll}
           />
            <Image 
           source={require('../assets/img4.jpg')}
           style={styles.imgScroll}
           />
            <Image 
           source={require('../assets/img5.jpg')}
           style={styles.imgScroll}
           />
            <Image 
           source={require('../assets/img6.jpg')}
           style={styles.imgScroll}
           />
            <Image 
           source={require('../assets/img7.jpg')}
           style={styles.imgScroll}
           />
             <Image 
           source={require('../assets/img8.jpg')}
           style={styles.imgScroll}

           /> 
            <Image 
           source={require('../assets/img1.jpg')}
           style={styles.imgScroll}

           />
             <Image 
           source={require('../assets/img1.jpg')}
           style={styles.imgScroll}

           />
             <Image 
           source={require('../assets/img1.jpg')}
           style={styles.imgScroll}

           />
             <Image 
           source={require('../assets/img1.jpg')}
           style={styles.imgScroll}

           />
             <Image 
           source={require('../assets/img1.jpg')}
           style={styles.imgScroll}

           />


    </ScrollView>


{/* <View style={{height:10,width:10,flex:1}}>

</View> */}
   

  
      <FlatList
      style={styles.flatView}
        data={this.state.usersArr}
        renderItem={({ item })=> {
              return (
                <TouchableOpacity 
                   onPress={()=>this.chatRoomFun(item.id)}
                >

               
                <View  style={styles.listView}  >

                  <View style={styles.imgView}>
                  <Image 
                  source={require('../assets/img1.jpg')}
                  style={styles.imgs}
                  />
                  </View>

                 <View style={styles.nameView}> 
                    <Text style={{fontSize:16,}}>
                    {item.name}
                    </Text>
                    <Text style={{fontSize:12,color:'gray'}}>
                    {item.id}
                    </Text>
                  </View>
                  {/* <Button 
                  title="Click"
                  onPress={()=>{this.props.navigation.navigate('Chat')}}
                  /> */}
                  {/* <Text>
                    {Alert.alert(item)}
                  </Text> */}
                </View>
                </TouchableOpacity>

              )
            }
        }
        keyExtractor={item => item.name}
      />
   
 </View>     
   )
    }
  }






const styles = StyleSheet.create({
    container: {
    
    },
    inputDiv:{
      flex:1,
      flexDirection:'row',
      justifyContent:'center',
      margin:5,


    },
    scrolView:{
      marginTop:10,
      height:80,
   
    
      // flex:1

      

    },
    imgDiv:{

    },
    imgView:{
      flex:1,
      

    },
    imgScroll:{
      height:55,
      width:55,
      borderRadius:100,
      borderWidth:2,
      borderColor:'blue',
      margin:10,
     

    },
    imgs:{
      height:55,
      width:55,
      borderRadius:100,
      borderWidth:2,
      borderColor:'blue',
      margin:10,
      marginLeft:20,
    

    },
    nameView:{
      flex:3,
      flexDirection:'column',
      justifyContent:'space-around',
      alignItems:'flex-start',
      padding:10,

    },
    listView:{
      flex:1,
      flexDirection:'row',
      justifyContent:'space-around',



    },
    SearchBar:{
      backgroundColor:'#f2f2f2',
      borderRadius:30, 
      alignSelf:'center',
      width:320,
      height:43,
      marginTop:14,

      

    },

    searchView:{
      flex:1,
     


    },
    flatView:{
      marginTop:10,
    },
    imgScrolView:{
      height:55,
      width:55,
      borderRadius:100,
      backgroundColor:'#edebe6',
      margin:10,
      marginLeft:20,
      alignItems:'center',
      justifyContent:'space-around'
  
  
    },
  });



   
 
      


