import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './MainSCreen';
import ServicesScreen from './ServicesScreen';
import BookingScreen from './BookingScreen';
import MyBookingsScreen from './MyBookingsScreen'; 
import BookingConfirmationScreen from './BookingConfirmationScreen';

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#C2E0C3', 
          },
        }}
      >
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{ title: 'Фитнес клуб' }}
        />
        <Stack.Screen
          name="Services"
          component={ServicesScreen}
          options={{ title: 'Услуги' }}
        />
        <Stack.Screen
          name="Booking"
          component={BookingScreen}
          options={{ title: 'Запись на тренировку' }}
        />
        <Stack.Screen
          name="MyBookings"
          component={MyBookingsScreen}
          options={{ title: 'Мои записи' }}
        />
        <Stack.Screen
          name="BookingConfirmation"
          component={BookingConfirmationScreen}
          options={{ title: 'Подтверждение бронирования' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;