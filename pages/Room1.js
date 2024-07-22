import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { db } from '../firebase';
import { ref, onValue, set } from 'firebase/database';
import { Button, Text, View, StyleSheet, TouchableOpacity } from "react-native";

const Room1 = () => {

  const navigation = useNavigation();
  const [light1, setLight1] = useState('off');
  const [light2, setLight2] = useState('off');
  const [temperature, setTemperature] = useState(0);

  useEffect(() => {
    const lightRef1 = ref(db, 'Bathroom/led1');
    const lightRef2 = ref(db, 'Bathroom/led2');
    const temperatureRef = ref(db, 'Bathroom/temperature');

    const unsubscribe1 = onValue(lightRef1, (snapshot) => {
      setLight1(snapshot.val());
    });

    const unsubscribe2 = onValue(lightRef2, (snapshot) => {
      setLight2(snapshot.val());
    });

    const unsubscribe3 = onValue(temperatureRef, (snapshot) => {
      setTemperature(snapshot.val());
    });

    return () => {
      unsubscribe1();
      unsubscribe2();
      unsubscribe3();
    };

  }, []);

  const toggleLight1 = async () => {
    const newLightStatus1 = light1 === 'on' ? 'off' : 'on';
    try {
      await set(ref(db, 'Bathroom/led1'), newLightStatus1);
      console.log('Light 1 status updated successfully');
    } catch (error) {
      console.error('Error updating light 1 status:', error);
    }
  }

  const toggleLight2 = async () => {
    const newLightStatus2 = light2 === 'on' ? 'off' : 'on';
    try {
      await set(ref(db, 'Bathroom/led2'), newLightStatus2);
      console.log('Light 2 status updated successfully');
    } catch (error) {
      console.error('Error updating light 2 status:', error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.temperature}>{temperature}°C</Text>
      <View style={styles.lightContainer}>
        <Text style={styles.lightStatus}>Light 1: {light1}</Text>
        <TouchableOpacity
          style={[styles.button, light1 === 'on' ? styles.buttonOn : styles.buttonOff]}
          onPress={toggleLight1}
        >
          <Text style={styles.buttonText}>{light1 === 'on' ? 'Turn Off' : 'Turn On'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.lightContainer}>
        <Text style={styles.lightStatus}>Light 2: {light2}</Text>
        <TouchableOpacity
          style={[styles.button, light2 === 'on' ? styles.buttonOn : styles.buttonOff]}
          onPress={toggleLight2}
        >
          <Text style={styles.buttonText}>{light2 === 'on' ? 'Turn Off' : 'Turn On'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  temperature: {
    fontSize: 80,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 40,
  },
  lightContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  lightStatus: {
    fontSize: 24,
    marginBottom: 10,
    color: '#555',
  },
  button: {
    padding: 15,
    borderRadius: 10,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonOn: {
    backgroundColor: '#4CAF50',
  },
  buttonOff: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Room1;
