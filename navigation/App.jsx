import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import Game from '../screens/Game';
import EndGame from '../screens/EndGame'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Game" component={Game} options={{ title: 'Digits of Pi' }}/>
        <Stack.Screen name="EndGame" component={EndGame} options={
          ({ navigation }) => ({
          title: 'Digits of Pi',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Icon name="arrow-back" size={30} color="black" style={{ marginRight: 30 }} />
            </TouchableOpacity>
          ),
        })
        }/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles=StyleSheet.create({
  title: {marginLeft: 10}
})
