import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import Mode from '../components/Mode.jsx'

function Button({ text, onPress, style, dispChilds }) {
    return (
      <TouchableOpacity onPress={onPress} style={[styles.button, style]} 
      activeOpacity={dispChilds?1:undefined}>
        <Text style={styles.buttonText}>{text}</Text>
        {dispChilds && (
          <View style={styles.childButtons}>
            <Mode text="1 minute" style={{backgroundColor: 'rgb(111, 111, 111)'}}/>
            <Mode text="100 digits" style={{backgroundColor: 'rgb(226, 226, 226)', color: 'black'}}/>
            <Mode text="2 minutes" style={{backgroundColor: 'rgb(111, 111, 111)'}}/>
            <Mode text="200 digits" style={{backgroundColor: 'rgb(226, 226, 226)', color: 'black'}}/>
          </View>
        )}
      </TouchableOpacity>
    );
  }

export default Button;

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'black',
        justifyContent: 'flex-start',
        paddingTop: '5%',
        alignItems: 'center',
        borderRadius: 10,
        width: '80%',
        margin: '5%'
    },
    buttonText: {
        color: 'white',
        fontSize: 26
    },
    childButtons: {
      marginTop: '5%',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%'
    }
})