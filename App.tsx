import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DiaryProvider } from './src/context/DiaryContext';
import HomeScreen from './src/screens/HomeScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import { TouchableOpacity, Text } from 'react-native';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <DiaryProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={({ navigation }) => ({
              title: 'Günlük',
              headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('History')}>
                  <Text style={{ color: '#6200ee', fontWeight: 'bold' }}>Geçmiş ➔</Text>
                </TouchableOpacity>
              )
            })}
          />
          <Stack.Screen name="History" component={HistoryScreen} options={{ title: 'Geçmiş Kayıtlar' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </DiaryProvider>
  );
};

export default App;