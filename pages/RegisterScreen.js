import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { auth, db } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import { ref, set } from "firebase/database";

const RegisterScreen = () =>{

    const navigation = useNavigation();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');

    const handleRegister = async ()=>{

        try {
            const userTemp = await createUserWithEmailAndPassword(auth,email,password);  
            const userId = userTemp.user.uid;

            const userRef = ref(db,`users/${userId}`);
            await set(userRef, {
              email:email
            });
            navigation.navigate('Home');
        } catch (error) {
            setError(error.message)
            
        }

    }

    return (
        <View style={styles.container}>
            <TextInput 
            placeholder="Email"
            onChangeText={setEmail}
            value={email}
            style={styles.input}
            />
            <TextInput
             placeholder="Password"
             secureTextEntry
             onChangeText={setPassword}
             value={password}
             style={styles.input}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <Button title="Register" onPress={handleRegister}/>
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
  

export default RegisterScreen;

