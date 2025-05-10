import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { useState } from 'react'
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';

const {height, width} = Dimensions.get('screen');

export default function App() {
  const [buttonHeight, setButtonHeight] = useState('10%');
  const [dispChilds, setDispChilds] = useState(false);
  const [dispChildsPressed, setDispChildsPressed] = useState(false);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Digits of Pi</Text>
      </View>
      <Button
        style={[styles.button, {height: '10%'}]} text="Start Game"
        onPress={() => navigation.navigate('Game', {
          mode: {text: 'Unlimited Time'},
        })}/>
      <Button text="Game Modes" 
        dispChilds = {dispChilds}
        onPress={() => {
            if (!dispChildsPressed){
              setButtonHeight(prev => prev === '10%' ? '30%' : '10%');
              setDispChilds(prev => !prev);
              setDispChildsPressed(true);
          }
        }
        }
        style={{ height: buttonHeight}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    backgroundColor: 'rgb(221, 255, 251)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'

  },
  headingContainer: {
    height: '45%',
    width: '85%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  heading: {
    textAlign: 'center',
    fontSize: 35
  },
  buttonText: {
    color: 'white'
  }
});
