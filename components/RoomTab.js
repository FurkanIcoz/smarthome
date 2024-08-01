import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import COLORS from '../Colors';

const RoomTabs = ({ rooms, selectedRoomId, onSelectRoom }) => {
  return (
    <ScrollView 
      horizontal 
      contentContainerStyle={styles.tabContainer}
      showsHorizontalScrollIndicator={false} 
    >
      {rooms.map((room) => (
        <TouchableOpacity
          key={room.id}
          style={[styles.tab, room.id === selectedRoomId && styles.selectedTab]}
          onPress={() => onSelectRoom(room.id)}
        >
          <Text style={styles.tabText}>{room.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 10,
    height:75
  },
  scrollView: {
    flexGrow: 0,
    marginBottom: 16,
  },
  tab: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 20,
    backgroundColor: COLORS.gray,
    marginHorizontal: 5,
  },
  selectedTab: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    color: COLORS.white,
  },
});

export default RoomTabs;
