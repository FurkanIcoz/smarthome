import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import COLORS from '../Colors';
import { auth } from '../firebase';

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
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GİRİŞ YAPIN</Text>
      <Image style={styles.image} source={require('../assets/iotimage.jpeg')} />
      <TextInput
        value={email}
        placeholder='E-Posta Adresinizi Giriniz'
        onChangeText={setEmail}
        style={styles.input}
        placeholderTextColor={COLORS.gray}
      />
      <TextInput
        value={password}
        secureTextEntry={!showPassword}
        placeholder='Şifrenizi Giriniz'
        onChangeText={setPassword}
        style={styles.input}
        placeholderTextColor={COLORS.gray}
      />
      <TouchableOpacity style={styles.showPasswordButton} onPress={() => setShowPassword(!showPassword)}>
        <Text style={styles.showPasswordText}>{showPassword ? 'Gizle' : 'Göster'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Giriş Yap</Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity>
          <Text style={styles.linkText}>Şifremi Unuttum</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.linkText}>Kayıt Ol</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.socialLoginContainer}>
        <Text style={styles.orText}>VEYA</Text>
        <TouchableOpacity style={styles.socialButton}>
          <Text style={styles.socialButtonText}>Google ile Giriş Yap</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Text style={styles.socialButtonText}>Facebook ile Giriş Yap</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    borderRadius: 15,
    borderWidth: 3,
    borderColor: COLORS.gray,
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderColor: COLORS.gray,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 12,
    backgroundColor: "#F9F5F6",
    fontSize: 15,
  },
  showPasswordButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  showPasswordText: {
    color: COLORS.primary,
    fontSize: 14,
  },
  error: {
    color: 'red',
    marginBottom: 12,
  },
  loginButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  linkText: {
    color: COLORS.primary,
    fontSize: 14,
  },
  socialLoginContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  orText: {
    fontSize: 16,
    color: COLORS.gray,
    marginVertical: 10,
  },
  socialButton: {
    backgroundColor: COLORS.gray,
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  socialButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
