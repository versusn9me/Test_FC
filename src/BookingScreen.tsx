import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker'; // Import DateTimePicker

interface BookingScreenProps {
  route: any; // The route object from React Navigation
}

const BookingScreen: React.FC<BookingScreenProps> = ({ route }) => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('+7 (   )   -  -  '); // Initial mask
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showNameErrorModal, setShowNameErrorModal] = useState(false); // State for modal

  const handleNameChange = (text: string) => {
    setName(text); // Update the name state immediately

    // Show modal only when the length is equal to or greater than the limit
    if (text.length >= 15) { 
      setShowNameErrorModal(true); 
    } else {
      setShowNameErrorModal(false); 
    }
  };

  const handlePhoneNumberChange = (text: string) => {
    // Allow only numbers and +
    let cleanedText = text.replace(/[^0-9+]/g, '');

    // Ensure +7 at the start (if not already present)
    if (!cleanedText.startsWith('+7')) {
      cleanedText = '+7' + cleanedText;
    }

    // Apply mask +7 (___) ___-__-__
    let maskedText = cleanedText.replace(/(\+7)(\d{1,3})(\d{1,3})(\d{1,2})(\d{1,2})/, '$1 ($2) $3-$4-$5');

    // Limit input to the mask's length
    if (maskedText.length > 18) { // 18 is the length of the complete mask
      maskedText = maskedText.slice(0, 18); // Keep only the first 18 characters
    }

    setPhoneNumber(maskedText);
  };

  const handleDateChange = (event: any, date: any) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleTimeChange = (event: any, date: any) => {
    setShowTimePicker(false);
    if (date) {
      setSelectedTime(date);
    }
  };

  const handleBooking = () => {
    // Basic validation (add more comprehensive validation)
    if (!name || !phoneNumber || !selectedDate || !selectedTime) {
      Alert.alert('Error', 'Please fill all the fields');
      return;
    }

    // Remove mask from phone number for better handling
    const unmaskedPhoneNumber = phoneNumber.replace(/[^0-9]/g, ''); // Remove all non-numeric characters

    console.log('Booking data:', {
      name,
      phoneNumber: unmaskedPhoneNumber, // Use unmasked phone number
      selectedDate,
      selectedTime,
    });

    // Reset the form after successful booking
    setName('');
    setPhoneNumber('+7 (   )   -  -  ');
    setSelectedDate(new Date());
    setSelectedTime(new Date());

    // Optionally, navigate to a confirmation screen
    navigation.navigate('BookingConfirmation', {
      name,
      phoneNumber: unmaskedPhoneNumber, // Pass unmasked phone number
      selectedDate,
      selectedTime,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name:</Text>
        <TextInput 
          style={styles.input}
          value={name}
          onChangeText={handleNameChange}
          placeholder="Enter your name"
          maxLength={15}
          keyboardType="default" // Use the default keyboard
          autoCapitalize="none" // Prevent automatic capitalization
          multiline={true} // Enable multiline input
        />
      </View>


      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone Number:</Text>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={handlePhoneNumberChange}
          keyboardType="phone-pad"
          editable={true} // Make it editable
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Date:</Text>
        <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
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
        <Text style={styles.label}>Time:</Text>
        <TouchableOpacity style={styles.input} onPress={() => setShowTimePicker(true)}>
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
        <Text style={styles.buttonText}>Book Now</Text>
      </TouchableOpacity>

      {/* Modal for Name Error */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showNameErrorModal}
        onRequestClose={() => setShowNameErrorModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Cannot exceed 15 characters</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowNameErrorModal(false)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    marginBottom: 5,
    
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    
  },
  button: {
    backgroundColor: '#C2E0C3',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 5,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: '#C2E0C3',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default BookingScreen;