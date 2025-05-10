import { View, Text, TextInput, StyleSheet, Dimensions } from 'react-native';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import React, { useRef, useCallback, useState, useEffect } from 'react';

const { height, width } = Dimensions.get('screen');

const pi = "3,1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989";

function Game() {
  const [inputValue, setInputValue] = useState('3,');
  const [digitNumber, setDigitNumber] = useState(1);
  const [time, setTime] = useState(0);
  const [errorCounter, setErrorCounter] = useState(0);
  const [bgColor, setBgColor] = useState('white');
  const [timerActive, setTimerActive] = useState(false);

  const inputRef = useRef(null);
  const timeoutId = useRef(null);
  const route = useRoute();
  const mode = route.params?.mode;

  let timeLimit, digitsLimit;

  useFocusEffect(
    useCallback(() => {
      const timeout = setTimeout(() => {
        inputRef.current?.focus();
      }, 300);

      // Set limits for time or digits dependig on game mode
      timeLimit = (mode?.text == "1 minute") ? 6 : ((mode?.text == "2 minutes") ? 120 : Infinity);
      digitsLimit = (mode?.text == "100 digits") ? 100 : ((mode?.text == "200 digits") ? 200 : Infinity);

      return () => clearTimeout(timeout);
    }, [])
  );

  const errorFeedback = () => {
    setBgColor('red');
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    timeoutId.current = setTimeout(() => {
      setBgColor('white');
    }, 150);
  };

  // Evaluate if user input digit is correct
  const handleChangeText = (text) => {
    activateTimer();
    for (let i = 0; i < text.length; i++){
        if (text[i] != pi[i]){
            setErrorCounter(prev => prev + 1)
            errorFeedback();
            return;
        }
    }
    if (text.length <= 2){
        text = "3,";
    }
    else if (text.length > inputValue.length){
        setDigitNumber(prev => prev + 1);
        setInputValue(text);
    }
  };

  const activateTimer = () => {
    if (!timerActive) setTimerActive(true);
  }

  // Timer
  useEffect(() => {
    let intervalId;
    if (timerActive) {
      intervalId = setInterval(() => {
        setTime(prev => {
          const newTime = prev + 1;
          console.log(newTime);
          if (newTime >= timeLimit) {
            clearInterval(intervalId);
            setTimerActive(false);
          }
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [timerActive, timeLimit]);

  const mins = () => {
    let m = Math.floor(time/60);
    return m;
  }
  const secs = () => {
    let s = time%60;
    return (s<10) ? "0" + s.toString() : s.toString();
  }

  return (
    <View style={styles.game}>
      <View style={styles.gamemodeWrapper}>
        <Text style={styles.gamemode}>Game-Mode: {mode?.text}</Text>
      </View>
      <View style={styles.time}>
        <Text style={styles.timeText}>{mins(time)}:{secs(time)}</Text>
      </View>
      <Text style={styles.counter}>Digit Number: {digitNumber}</Text>
      <Text style={styles.error}>Errors: {errorCounter}</Text>

      <TextInput
        ref={inputRef}
        keyboardType="numeric"
        style={[styles.input, {backgroundColor: bgColor}]}
        value={inputValue}
        multiline={true}
        numberOfLines={3}
        textAlign="left"
        onChangeText={handleChangeText}
      />
    </View>
  );
}

export default Game;

const styles = StyleSheet.create({
  gamemodeWrapper: {
    backgroundColor: 'rgb(205, 205, 205)',
    width: '100%',
    alignItems: 'center'
  },
  gamemode: {
    fontSize: 15,
    margin: 10
  },
  time: {
    height: '7%',
    width: '25%',
    backgroundColor: 'black',
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    fontSize: 30,
    color: 'white',
  },
  counter: {
    fontSize: 22,
  },
  error: {
    fontSize: 22,
    color: 'red'
  },
  game: {
    backgroundColor: 'rgb(221, 255, 251)',
    height: '100%',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#333',
    padding: 15,
    width: '80%',
    height: '26%',
    fontSize: 40,
    borderRadius: 5,
    textAlign: 'center',
    backgroundColor: 'white',
    marginTop: 20,
  },
});
