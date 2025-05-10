import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import Button  from '../components/Button.jsx';

function EndGame() {
  const route = useRoute();
  const res = route.params?.res;
  const time = res?.time;
  const mode = res?.mode;
  const dig = res?.digits;
  const err = res?.errors;

  const navigation = useNavigation();

  return (
    <View style={styles.game}>
        <View style={styles.gamemodeWrapper}>
            <Text style={styles.gamemode}>Game-Mode: {mode}</Text>
        </View>
      <Text style={styles.gameover}>Game Over!</Text>
      <Text style={styles.dispDigits}>Correct digits of Pi: {dig}</Text>
    <Text style={styles.dispErrors}>Errors: {err}</Text>
      <Button style={[styles.button, {height: '10%'}]} text="New Game"
        onPress={() => navigation.navigate('Home')}/>
    </View>
  );
}

export default EndGame;

const styles = StyleSheet.create({
    game: {
    backgroundColor: 'rgb(221, 255, 251)',
    height: '100%',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    },
    gamemodeWrapper: {
        backgroundColor: 'rgb(205, 205, 205)',
        width: '100%',
        alignItems: 'center'
    },
    gamemode: {
        fontSize: 15,
        margin: 10
    },
    gameover: {
        fontWeight: 'bold',
        margin: 30,
        fontSize: 40
    },
    dispDigits: {
        fontSize: 30,
        margin: 20
    },
    dispErrors: {
        color: 'red',
        fontSize: 20,
        marginBottom: 30
    }
});