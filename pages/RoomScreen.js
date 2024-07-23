import React, { useEffect, useState } from "react";
import { auth, db, onValue, ref, update } from "../firebase";
import { ReloadInstructions } from "react-native/Libraries/NewAppScreen";
import { Button, ScrollView, StyleSheet, Switch, Text, View } from "react-native";

const RoomScreen = ({ route }) => {
    const { roomId } = route.params;
    const [devices, setDevices] = useState([]);
  
    useEffect(() => {
      const userId = auth.currentUser.uid;
      const devicesRef = ref(db, `users/${userId}/rooms/${roomId}/devices`);
      const unsubscribe = onValue(devicesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const devicesArray = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
          }));
          setDevices(devicesArray);
        } else {
          setDevices([]);
          console.log(roomId)

        }
      });
  
      return () => unsubscribe();
    }, [roomId]);
  
    const toggleLight = (deviceId, currentStatus) => {
        const newStatus = currentStatus === 'On' ? 'Off' : 'On';
        const deviceRef = ref(db, `users/${auth.currentUser.uid}/rooms/${roomId}/devices/${deviceId}`);
        update(deviceRef, { status: newStatus });
    };


    return (
        <View style={styles.container}>
            {devices.map((device) => (
                <View key={device.id} style={styles.deviceContainer}>
                    <Text style={styles.deviceName}>{device.name}</Text>
                    {device.type === 'temperature' || device.type === 'humidity' ? (
                        <Text>Value: {device.value}</Text>
                    ) : (
                        <View style={styles.switchContainer}>
                            <Text>Status: {device.status}</Text>
                            <Switch
                                value={device.status === 'On'}
                                onValueChange={() => toggleLight(device.id, device.status)}
                            />
                        </View>
                    )}
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
    },
    deviceContainer: {
        marginBottom: 20,
        padding: 16,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
    },
    deviceName: {
        fontSize: 18,
        marginBottom: 8,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});

  export default RoomScreen;
