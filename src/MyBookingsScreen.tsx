import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { FitnessClasses } from './FitnessClasses';

// Интерфейс для записи
interface Booking {
  id: number; 
  fitnessClass: FitnessClasses; 
  date: Date;
  time: Date;
}

const MyBookingsScreen: React.FC = () => {
  // Состояние для хранения записей
  const [bookings, setBookings] = useState<Booking[]>([]);

  // Эффект для загрузки записей из AsyncStorage
  useEffect(() => {
    const loadBookings = async () => {
      try {
        // Загружаем записи из AsyncStorage
        const storedBookings = await AsyncStorage.getItem('bookings');
        if (storedBookings) {
          // Парсим записи и преобразуем даты в объекты Date
          const parsedBookings = JSON.parse(storedBookings).map((item: any) => ({
            ...item,
            date: new Date(item.date), 
            time: new Date(item.time), 
          }));
          // Обновляем состояние с записями
          setBookings(parsedBookings);
        }
      } catch (error) {
        console.error('Error loading bookings:', error);
      }
    };
    loadBookings();
  }, []);

  // Обработчик для отмены записи
  const handleCancelBooking = async (bookingId: number) => {
    // Удаляем запись из массива bookings
    const updatedBookings = bookings.filter((booking) => booking.id !== bookingId);
    setBookings(updatedBookings);

    // Сохраняем обновленный список в AsyncStorage
    try {
      await AsyncStorage.setItem('bookings', JSON.stringify(updatedBookings));
    } catch (error) {
      console.error('Error saving bookings:', error);
    }
  };

  // Рендерер для элемента списка записей
  const renderBookingItem = ({ item }: { item: Booking }) => (
    <View style={styles.bookingItem}>
      <Text style={styles.bookingName}>{item.fitnessClass.name}</Text>
      <Text style={styles.bookingDate}>{item.date.toLocaleDateString()}</Text>
      <Text style={styles.bookingTime}>{item.time.toLocaleTimeString()}</Text>
      <TouchableOpacity
        style={styles.cancelBookingButton}
        onPress={() => handleCancelBooking(item.id)}
      >
        <Text style={styles.cancelButton}>Отменить</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={bookings}
        renderItem={renderBookingItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={() => (
          <Text style={styles.emptyMessage}>У вас нет записей.</Text>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  bookingItem: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bookingName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bookingDate: {
    fontSize: 16,
    marginBottom: 2,
  },
  bookingTime: {
    fontSize: 16,
    marginBottom: 10,
  },
  cancelBookingButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
  },
  cancelButton: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  emptyMessage: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 50,
  },
});

export default MyBookingsScreen;