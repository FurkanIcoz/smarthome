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
      <View style={styles.loginTopStyle}>
        {/* <Text style={styles.title}>GİRİŞ YAPIN</Text> */}

        <Image style={styles.imageaps} source={require('../assets/apsiyonimage.jpg')} />
        <Image style={styles.imagesmartaps} source={require('../assets/smartapsiyon1.jpg')} />
      </View>
     <View>
      <Text style={{marginVertical:5}}>Email</Text>
     <TextInput
        value={email}
        placeholder='E-Posta Adresinizi Giriniz'
        onChangeText={setEmail}
        style={styles.input}
        placeholderTextColor={COLORS.gray}
      />
     </View>
      <View>
        <Text style={{marginVertical:5}}>
          Şifre
        </Text>
        <TextInput
        value={password}
        secureTextEntry={!showPassword}
        placeholder='Şifrenizi Giriniz'
        onChangeText={setPassword}
        style={styles.input}
        placeholderTextColor={COLORS.gray}
      />
      </View>
      
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
      <View style={{width:'100%',alignItems:'center',justifyContent:'center',marginTop:5}}>
        <Text style={styles.orText}> Veya </Text>
      </View>
      <View style={styles.socialLoginContainer}>
        {/* <Text style={styles.orText}>VEYA</Text> */}


        <TouchableOpacity style={styles.socialButton}>
          <Image style={{width:30,height:30}} source={require('../assets/googleicon.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Image style={{width:30,height:30}} source={require('../assets/facebookicon.png')} />
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
    backgroundColor: '#fffdff',
  },
  loginTopStyle:{
    width:'100%',
    borderWidth:0
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: 20,
  },
  imageaps: {
    width:'75%',
    height:70,
    alignSelf: 'center',
    borderRadius: 15,
    borderColor: COLORS.black,
    marginBottom: 70,
  },
  imagesmartaps: {
    alignSelf: 'center',
    borderRadius: 15,
    borderColor: COLORS.black,
    marginBottom: 30,
  },
  input: {
    height: 60,
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  linkText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight:'bold'
  },
  socialLoginContainer: {
    alignItems: 'center',
    marginVertical: 40,
    flexDirection:'row',
    
  },
  socialButton: {
    backgroundColor: '#fffdff',
    paddingVertical: 10,
    marginHorizontal:67,
    borderRadius: 50,
    alignItems: 'center',
    marginBottom: 10,
    flex:2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 3,
    
    
  },
  orText: {
    fontSize: 16,
    color: COLORS.gray,
    marginVertical: 10,
  },
 
  socialButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
