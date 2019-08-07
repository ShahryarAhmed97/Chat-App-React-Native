
// is folder k tmam files route . kr k access hongi 
import {createBottomTabNavigator,createDrawerNavigator,createMaterialTopTabNavigator,createSwitchNavigator, createStackNavigator, createAppContainer } from "react-navigation";
import * as Routes from '../screens/index'



const homeTabNavigator= createBottomTabNavigator({
  ChatWith:{
    screen: Routes.Home
  },
  Friends:{
    screen: Routes.Friends

  }

    }
    ,

    {
      tabBarOptions:{
        style:{
          // backgroundColor:'blue',
          // color:'white'
          height:60,
        }
      }

    }
)


const authNavigator = createStackNavigator({
   
  Home: {
      screen: homeTabNavigator
    },
    Chat:{
        screen:Routes.Chat
    }
  
}

,
{

  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }
}
);

  export default createAppContainer(authNavigator);
