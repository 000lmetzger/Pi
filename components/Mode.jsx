import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Mode({text, style}){
    const navigation = useNavigation();

    return(
        <TouchableOpacity
        style={[styles.button, style]}
        onPress={() => navigation.navigate('Game', {
            mode: {text},
          })}
        >
            <Text style={[styles.buttonText, style]}>{text}</Text>
        </TouchableOpacity>
    )
}

export default Mode;

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'black',
        height: 60,
        width: 120,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 18
    }
})