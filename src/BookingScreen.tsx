import React, { useState } from 'react';;
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet } from 'react-native';

// Интерфейс для данных о бронировании
interface Booking {
  id: number;
  fitnessClass: any; 
  date: Date;
  time: Date;
}

const BookingScreen = ({ route, navigation }: any) => {
  // Получаем данные о выбранном классе фитнеса из параметров маршрута
  const { fitnessClass } = route.params; 

  // Состояние для имени
  const [name, setName] = useState('');

  // Состояние для номера телефона
  const [phoneNumber, setPhoneNumber] = useState('+7 (   )   -  -  ');

  // Состояние для даты
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Состояние для времени
  const [selectedTime, setSelectedTime] = useState(new Date());

  // Состояние для отображения даты
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Состояние для отображения времени
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Состояние для модального окна
  const [showModal, setShowModal] = useState(false); 

  // Обработчик изменения имени
  const handleNameChange = (text: string) => {
    // Проверяем длину имени
    if (text.length >= 15) {
      // Показываем модальное окно, если длина имени превышает 15 символов
      setShowModal(true); 
    } else {
      // Скрыть модальное окно, если длина имени меньше или равна 15 символов
      setShowModal(false); 
    }
    
    // Проверяем, содержит ли текст только буквы
    const regex = /^[a-zA-Zа-яА-Я ]+$/;
    if (regex.test(text)) {
      setName(text);
    }
  };

  // Обработчик изменения номера телефона
  const handlePhoneNumberChange = (text: string) => {
    // Очищаем текст от нецифровых символов
    const cleanedText = text.replace(/[^0-9]/g, ''); 
    let formattedText = '+7 ('; // начальный префикс
  
    // Форматируем номер телефона
    if (cleanedText.length > 0) {
      const digits = cleanedText.substring(1); // удаляем первый символ (7)
      formattedText += digits.substring(0, 3).padEnd(3, '_'); // добавляем первые 3 цифры
      formattedText += ') '; // добавляем закрывающую скобку и пробел
  
      if (digits.length > 3) {
        formattedText += digits.substring(3, 6).padEnd(3, '_'); // добавляем следующие 3 цифры
        formattedText += '-'; // добавляем дефис
      }
  
      if (digits.length > 6) {
        formattedText += digits.substring(6, 8).padEnd(2, '_'); // добавляем следующие 2 цифры
        formattedText += '-'; // добавляем дефис
      }
  
      if (digits.length > 8) {
        formattedText += digits.substring(8, 10).padEnd(2, '_'); // добавляем последние 2 цифры
      }
    }
  
    setPhoneNumber(formattedText);
  };

  // Обработчик изменения даты
  const handleDateChange = (event: any, date: any) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  // Обработчик изменения времени
  const handleTimeChange = (event: any, date: any) => {
    setShowTimePicker(false);
    if (date) {
      setSelectedTime(date);
    }
  };

  // Обработчик бронирования
  const handleBooking = async () => {
    // Проверяем на ошибки
    const errors = [];
  
    if (!name.trim()) {
      errors.push('Имя не может быть пустым');
    }
  
    if (phoneNumber === '+7 (   )   -  -  ') {
      errors.push('Номер телефона не может быть пустым');
    }
  
    if (!selectedDate) {
      errors.push('Дата не может быть пустой');
    }
  
    if (!selectedTime) {
      errors.push('Время не может быть пустым');
    }
  
    if (errors.length > 0) {
      Alert.alert('Ошибка', errors.join('\n'));
      return;
    }
  
  // Генерируем уникальный ID для записи
  const newBookingId = Math.floor(Math.random() * 1000000); 
  
  // Создаем объект записи
  const newBooking: Booking = {
    id: newBookingId, 
    fitnessClass, 
    date: selectedDate,
    time: selectedTime,
  };
  
  // Сохраняем запись в AsyncStorage
  try {
    const storedBookings = await AsyncStorage.getItem('bookings');
    const bookings: Booking[] = storedBookings ? JSON.parse(storedBookings) : [];
    bookings.push(newBooking);
    await AsyncStorage.setItem('bookings', JSON.stringify(bookings));
    setName('');
    setPhoneNumber('+7 (   )   -  -  ');
    setSelectedDate(new Date());
    setSelectedTime(new Date());
    navigation.navigate('BookingConfirmation', {
      name,
      phoneNumber: phoneNumber.replace(/[^0-9]/g, ''),
      selectedDate,
      selectedTime,
      fitnessClass, 
    });
  } catch (error) {
    console.error('Error saving booking:', error);
    Alert.alert('Ошибка', 'Не удалось сохранить запись.');
  }
};

return (
  <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Имя:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={handleNameChange}
        placeholder="Введите ваше имя"
        maxLength={15}
        keyboardType="default"
        autoCapitalize="none"
        multiline={true}
      />
      {/* Модальное окно, которое появляется, когда имя превышает 15 символов */}
      <Modal visible={showModal} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Введите имя не более чем 15 символов.
            </Text>
            <TouchableOpacity style={styles.modalButton} onPress={() => setShowModal(false)}>
              <Text style={styles.modalButtonText}>Закрыть</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Номер телефона:</Text>
      <TextInput
        style={styles.input}
        value={phoneNumber}
        onChangeText={handlePhoneNumberChange}
        keyboardType="phone-pad"
        editable={true}
      />
    </View>
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Дата:</Text>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowDatePicker(true)}
      >
        <Text>{selectedDate.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          onChange={handleDateChange}
        />
      )}
    </View>
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Время:</Text>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowTimePicker(true)}
      >
        <Text>{selectedTime.toLocaleTimeString()}</Text>
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker
          value={selectedTime}
          mode="time"
          onChange={handleTimeChange}
        />
      )}
    </View>
    <TouchableOpacity style={styles.button} onPress={handleBooking}>
      <Text style={styles.buttonText}>Забронировать</Text>
    </TouchableOpacity>
    <View style={styles.fitnessClassInfo}>
      <Text style={styles.fitnessClassName}>{fitnessClass.name}</Text>
      <Text style={styles.fitnessClassDescription}>
        {fitnessClass.description}
      </Text>
      <Text style={styles.fitnessClassPrice}>
        Цена: {fitnessClass.price}
      </Text>
    </View>
  </ScrollView>
);
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#C2E0C3',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  fitnessClassInfo: {
    marginTop: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  fitnessClassName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  fitnessClassDescription: {
    marginTop: 5,
  },
  fitnessClassPrice: {
    marginTop: 5,
    fontWeight: 'bold',
  },
  // Стили для модального окна
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 5,
    width: '80%',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 15,
  },
  modalButton: {
    backgroundColor: '#C2E0C3',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'black',
    fontSize: 16,
  },
});

export default BookingScreen;