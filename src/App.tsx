import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ServicesScreen from './ServicesScreen';
import BookingScreen from './BookingScreen';
import MainScreen from './MainSCreen'; 

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="Main"> 
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{ 
            title: 'Фитнес клуб', 
            headerStyle: {
              backgroundColor: '#C2E0C3', // измените цвет фона на нужный вам
          }}}
          
        />
        <Stack.Screen
          name="Services"
          component={ServicesScreen}
          options={{ title: 'Услуги',
          headerStyle: {
            backgroundColor: '#C2E0C3', // измените цвет фона на нужный вам
        }}} 
        />
        <Stack.Screen
          name="Booking"
          component={BookingScreen}
          options={{ title: 'Запись на тренировку',
          headerStyle: {
            backgroundColor: '#C2E0C3', // измените цвет фона на нужный вам
        } }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};




export default App;