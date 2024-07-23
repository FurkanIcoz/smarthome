import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { auth,signInWithEmailAndPassword } from "../firebase";
const LoginScreen =()=>{

    const navigation = useNavigation();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');

    const handleLogin = async ()=>{
        try {
            await signInWithEmailAndPassword(auth,email,password);
            navigation.navigate('Home');
        } catch (error) {
            setError(error.message)
        }
    }


    return(

        <View style={styles.container}>
            <TextInput
            placeholder="Email"
            onChangeText={setEmail}
            value={email}
            style={styles.input}/>
            <TextInput
            placeholder="Password"
            secureTextEntry
            onChangeText={setPassword}
            value={password}
            style={styles.input}/>
            {/* {error ? <Text style={styles.error}>{error}</Text> : null} */}
            <Button title="Login" onPress={handleLogin}/>
            <Button title="Register" onPress={()=> navigation.navigate('Register')}/>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 16,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 12,
      padding: 8,
    },
    error: {
      color: 'red',
      marginBottom: 12,
    },
  });
  
export default LoginScreen;