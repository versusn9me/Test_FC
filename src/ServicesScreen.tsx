import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FitnessClasses } from './FitnessClasses'; // Import from your FitnessClasses component

interface FitnessClass {
  id: number;
  name: string;
  description: string;
  duration: string;
  price: string;
  category: string; 
}
interface ServicesScreenProps {
  route: any;
}

const ServicesScreen: React.FC<ServicesScreenProps> = ({ route }) => {
  const navigation = useNavigation();
  const { category } = route.params;
  const [searchTerm, setSearchTerm] = useState('');

  

  const filteredClasses = FitnessClasses.filter(
    (fitnessClass) =>
      fitnessClass.category === category || category === 'Все услуги'
  );

  const filteredAndSearchedClasses = filteredClasses.filter(
    (fitnessClass) =>
      fitnessClass.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchTermChange = (text: string) => {
    setSearchTerm(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Поиск..."
          onChangeText={handleSearchTermChange}
        />
      </View>

      <ScrollView>
        <View style={styles.viewWrapper}>
          {filteredAndSearchedClasses.map((fitnessClass) => (
            <TouchableOpacity
              key={fitnessClass.id}
              style={styles.fitnessClassContainer}
              onPress={() => navigation.navigate('Booking', { fitnessClass })} 
            >
              <Text style={styles.fitnessClassName}>{fitnessClass.name}</Text>
              <Text style={styles.fitnessClassPrice}>{fitnessClass.price}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
  },
  viewWrapper: {
    padding: 20,
  },
  fitnessClassContainer: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#C2E0C3',
    borderRadius: 10,
    elevation: 5,
  },
  fitnessClassName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black'
  },
  fitnessClassPrice: {
    fontSize: 16,
    color: '#88880',
  },
  searchContainer: {
    padding: 20,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
});

export default ServicesScreen;