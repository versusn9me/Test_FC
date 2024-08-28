import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface BookingConfirmationScreenProps {
  route: any; 
}

const BookingConfirmationScreen: React.FC<BookingConfirmationScreenProps> = ({
  route,
}) => {
  const navigation = useNavigation();
  const { name, phoneNumber, selectedDate, selectedTime, fitnessClass } =
    route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Подтверждение бронирования</Text>
      <View style={styles.bookingInfo}>
        <Text style={styles.label}>Имя:</Text>
        <Text style={styles.value}>{name}</Text>
        <Text style={styles.label}>Телефон:</Text>
        <Text style={styles.value}>{phoneNumber}</Text>
        <Text style={styles.label}>Дата:</Text>
        <Text style={styles.value}>
          {selectedDate.toLocaleDateString()}
        </Text>
        <Text style={styles.label}>Время:</Text>
        <Text style={styles.value}>
          {selectedTime.toLocaleTimeString()}
        </Text>
        <Text style={styles.label}>Услуга:</Text>
        <Text style={styles.value}>{fitnessClass.name}</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Main')}
      >
        <Text style={styles.buttonText}>Вернуться на главную</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  bookingInfo: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#C2E0C3',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BookingConfirmationScreen;