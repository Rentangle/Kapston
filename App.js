import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './Login&Register/login';
import Register from './Login&Register/register';
import Home from './Screen/Home';
import Schedules from './Screen/Schedules';
import Profiles from './Screen/Profile';
import Settings from './Screen/Settings';
import Index from './Screen';
import Carousel from './Components/Carousel';
import { SafeAreaView } from 'react-native';
import Slider from './Components/Slides'

const Stack = createStackNavigator();

export default function App (){
  return (
     <NavigationContainer independent={true}>
    <Stack.Navigator initialRouteName='Auth'>
      <Stack.Screen name="Login" component={LoginPage} options={{headerShown:false}} />
      <Stack.Screen name="Register" component={Register} options={{headerShown:false}} />
      <Stack.Screen name="Main" component={Index} options={{headerShown:false}}/>
    </Stack.Navigator>
  </NavigationContainer> 
  );
};

