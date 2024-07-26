import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {Button, Image, StyleSheet, Text, TextInput, View } from "react-native";
import { auth, signInWithEmailAndPassword } from "../firebase";
const LoginScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigation.navigate('Home');
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <View style={styles.container}>

            <Text style={{}}>LOGIN PAGE</Text>

            <Image
                source={require('../assets/iotimage.jpeg')}
                style={styles.logo}
            />
            {/* {error ? <Text style={styles.errorText}>{error}</Text> : null} */}
            <TextInput  
                label="Email"
                value={email}
                placeholder="Enter Your Email"
                onChangeText={setEmail}
                style={styles.input}
            />
            <TextInput
                label="Password"
                secureTextEntry
                value={password}
                placeholder="Enter Your Password"
                onChangeText={setPassword}
                style={styles.input}
            />
            <Button title="asdasd"></Button>
            <View style={styles.buttonContainer}>
                <Button onPress={() => console.log("Hesap Olustur")} title="Hesap Olustur"></Button>
                <Button onPress={() => console.log("Sifremi Unuttum")} title="Sifremi Unuttum"></Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        padding: 20,
        backgroundColor: '#F8EDED',
        paddingTop: 80,
    },
    logo: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        marginBottom: 30,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#FF6F61",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
    },
    input: {
        marginBottom: 15,
        backgroundColor: '#1E1E1E',
    },
    button: {
        marginBottom: 15,
        borderRadius: 25,
        paddingVertical: 10,

    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    errorText: {
        color: '#FF6F61',
        textAlign: 'center',
        marginBottom: 10,
    }
});

export default LoginScreen;
