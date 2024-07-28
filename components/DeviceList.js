import React from 'react';
import { StyleSheet, Switch, Text, View, Image } from 'react-native';
import COLORS from '../Colors';

const DeviceList = ({ devices, toggleLight }) => {
  return (
    <View style={styles.container}>
      {devices.map((device) => (
        <View key={device.id} style={styles.deviceContainer}>
          <View style={styles.deviceDetails}>
            <Text style={styles.deviceName}>{device.name}</Text>
          </View>
          {device.type === "temperature" || device.type === "humidity" || device.type === "airQuality" ? (
            <Text style={styles.deviceValue}>{device.value}</Text>
          ) : (
            <View style={styles.switchContainer}>
              <Text style={styles.switchText}>{device.status}</Text>
              <Switch
                value={device.status === "On"}
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
    marginBottom: 18,
    padding: 16,
    backgroundColor: COLORS.white,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray,
  },
  deviceDetails: {
    flex: 1,
    marginRight: 16,
  },
    deviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  deviceType: {
    fontSize: 14,
    color: COLORS.gray,
  },
  deviceValue: {
    fontSize: 16,
    color: COLORS.black,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchText: {
    fontSize: 16,
    color: COLORS.black,
    marginRight: 10,
  },
});

export default DeviceList;


