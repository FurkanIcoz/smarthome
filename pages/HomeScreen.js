import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { auth, db, onValue, ref } from "../firebase";




const HomeScreen = () =>{
    const navigation = useNavigation();
    const [rooms,setRooms] = useState({});
    
    useEffect(() => {
        const userId = auth.currentUser.uid;
        const roomsRef = ref(db, `users/${userId}/rooms`);
        const unsubscribe = onValue(roomsRef, snapshot => {
          const data = snapshot.val();
          if(data){
            const roomsArray = Object.keys(data).map(key =>({
                id:key,
                ...data[key]
            }));
            setRooms(roomsArray);
          }else{
            setRooms([]);
          }
        });
    
        return () => unsubscribe();
      }, []);

    return(
        <ScrollView contentContainerStyle={StyleSheet.container}>
            {Object.keys(rooms).map(roomId => (
                <TouchableOpacity
                key={roomId}
                style={styles.roomButton}
                onPress={()=>navigation.navigate('Room',{roomId})}
                >
                    <Text style={styles.roomText}>{rooms[roomId].name}</Text>
                </TouchableOpacity>
            ))}

        </ScrollView>
    )

}

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      justifyContent: 'center',
      padding: 16,
    },
    roomButton: {
      backgroundColor: '#33DDFF',
      padding: 20,
      marginVertical: 10,
      borderRadius: 10,
      alignItems: 'center',
    },
    roomText: {
      color: 'white',
      fontSize: 18,
    },
  });

export default HomeScreen;