import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { db } from '../firebase';
import { ref, onValue, set } from 'firebase/database';
import { Button, Text, View } from "react-native";

const Room1 = () => {

  const navigation = useNavigation();
  const [light1, setLight1] = useState('');
  const [light2, setLight2] = useState('');
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
      console.log('Light status updated successfully');
    } catch (error) {
      console.error('Error updating light status:', error);
    }
  }

  const toggleLight2 = async () => {
    const newLightStatus2 = light2 === 'on' ? 'off' : 'on';
    try {
      await set(ref(db, 'Bathroom/led2'), newLightStatus2);
      console.log('Light status updated successfully');
    } catch (error) {
      console.error('Error updating light status:', error);
    }
  }

  return (
    <View>
      <Text style={{ fontSize: 120 }}>{temperature}</Text>
      <Text style={{ fontSize: 120 }}>{light1}</Text>
      <Text style={{ fontSize: 120 }}>{light2}</Text>
      <Button title='Led 1 ' onPress={toggleLight1}></Button>
      <Button title='Led 2 ' onPress={toggleLight2}></Button>
    </View>
  )
}

export default Room1;
