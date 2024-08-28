import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FitnessClasses } from './FitnessClasses'; // Import from your FitnessClasses component

interface FitnessCategory {
  id: number;
  name: string;
  imageUrl: any; // Use any for image source (string or require())
}

const MainScreen: React.FC = () => {
  const navigation = useNavigation();
  const fitnessCategories: FitnessCategory[] = [
    {
      id: 1,
      name: 'Групповые занятия',
      imageUrl: require('./assets/group-classes.png'), // Замените на путь к вашему изображению
    },
    {
      id: 2,
      name: 'Персональные тренировки',
      imageUrl: require('./assets/personal-training.png'), // Замените на путь к вашему изображению
    },
    {
      id: 3,
      name: 'Боевые искусства',
      imageUrl: require('./assets/martial-arts.png'), // Замените на путь к вашему изображению
    },
  ];

  const handleCategoryPress = (categoryName: string) => {
    navigation.navigate('Services', { category: categoryName });
  };

  const handleAllServicesPress = () => {
    navigation.navigate('Services', { category: 'Все услуги' });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.viewWrapper}>
          <View style={styles.headerContainer}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>Добро пожаловать!</Text>
      </View>
          <TouchableOpacity
            style={styles.myBookingsIcon}
            onPress={() => navigation.navigate('MyBookings')}
            >
          <Image
            source={require('./assets/my-bookings-icon.png')} // Замените на путь к вашему изображению
            style={styles.myBookingsIconImage}
          />
  </TouchableOpacity>
</View>
          <View style={styles.categoriesContainer}>
            {fitnessCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryContainer}
                onPress={() => handleCategoryPress(category.name)}
              >
                <Image
                  source={category.imageUrl}
                  style={styles.categoryImage}
                />
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              key={4}
              style={styles.categoryContainer}
              onPress={handleAllServicesPress}
            >
              <View> 
                <Image
                  source={require('./assets/all-services.png')} // Замените на путь к вашему изображению
                  style={styles.categoryImage}
                />
                <Text style={styles.categoryName}>Все услуги</Text>
                
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.servicesContainer}>
            
            <Text style={styles.servicesTitle}>Все услуги</Text>
            
            <View style={styles.viewWrapper}>
              {FitnessClasses.map((fitnessClass) => (
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
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f3f4',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  viewWrapper: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'black'
  },
  
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    
  },
  categoryContainer: {
    width: '45%',
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#C2E0C3',
    borderRadius: 10,
    elevation: 5,
    alignItems: 'center',
  },
  categoryImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  myBookingsIcon: {
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  myBookingsIconImage: {
    padding: 25,
    width: 30,
    height: 30,
    marginBottom: 10
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black'
  },
  servicesContainer: {
    marginTop: 20,
  },
  servicesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
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
    color: '#00000f',
    
  },
 
});

export default MainScreen;