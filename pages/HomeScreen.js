import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { auth, db, onValue, ref, update } from "../firebase";
import RoomTabs from "../components/RoomTab";
import DeviceList from "../components/DeviceList";
import COLORS from "../Colors";

const HomeScreen = ({ navigation }) => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [devices, setDevices] = useState([]);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const userId = auth.currentUser.uid;
    const nameRef = ref(db, `users/${userId}/name`);
    const unsubscribe = onValue(nameRef, (snapshot) => {
      const data = snapshot.val();
      setUserName(data);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const userId = auth.currentUser.uid;
    const roomsRef = ref(db, `users/${userId}/rooms`);
    const unsubscribe = onValue(roomsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const roomsArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setRooms(roomsArray);
        if (roomsArray.length > 0) {
          setSelectedRoomId(roomsArray[0].id);
        }
      } else {
        setRooms([]);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (selectedRoomId) {
      const userId = auth.currentUser.uid;
      const devicesRef = ref(db, `users/${userId}/rooms/${selectedRoomId}/devices`);
      const unsubscribe = onValue(devicesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const devicesArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setDevices(devicesArray);
        } else {
          setDevices([]);
        }
      });

      return () => unsubscribe();
    }
  }, [selectedRoomId]);

  const toggleLight = (deviceId, currentStatus) => {
    const newStatus = currentStatus === "On" ? "Off" : "On";
    const deviceRef = ref(db, `users/${auth.currentUser.uid}/rooms/${selectedRoomId}/devices/${deviceId}`);
    update(deviceRef, { status: newStatus });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{userName}'s Home</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <RoomTabs rooms={rooms} selectedRoomId={selectedRoomId} onSelectRoom={setSelectedRoomId} />
        <DeviceList devices={devices} toggleLight={toggleLight} />
      </ScrollView>
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.tabButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={() => console.log('QR Tab')}>
          <Text style={styles.tabButtonText}>QR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={() => console.log('Profile Tab')}>
          <Text style={styles.tabButtonText}>Profil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
    elevation: 4, // Add shadow effect for elevation
    backgroundColor: COLORS.white,
  },
  backButton: {
    padding: 10,
    marginRight: 10,
  },
  backButtonText: {
    fontSize: 24,
    color: COLORS.primary,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.black,
    flex: 1,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
    marginBottom: 60, // Space for the tab bar
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 60,
    elevation: 8, // Add shadow effect for elevation
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabButtonText: {
    fontSize: 14,
    color: COLORS.white,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
