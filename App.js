import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ChooseDeck from './src/screen/ChooseDeck';
import Game from './src/screen/Game';


const Stack = createStackNavigator();

function App() {
  return  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name='Escolher Naipe' component={ChooseDeck} options={{headerShown:false}} />
      <Stack.Screen name='Jogo da Memória' component={Game} />
    </Stack.Navigator>
  </NavigationContainer>

}


export default App;
