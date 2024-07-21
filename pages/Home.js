import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Button, View } from "react-native";




const Home = () =>{
    const navigation = useNavigation();

    const handleroom = ()=>{
        navigation.navigate('Room1')
    }
    return(
        <View>
            <Button title="Room1" onPress={handleroom}></Button>
        </View>
    )

}

export default Home;