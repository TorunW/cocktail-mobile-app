import { View, Text } from 'react-native';
import React from 'react';

const TabButtons = () => {
  return (
    <View>
      {
        // Tabs......
      }
      <Text>Home</Text>
      <Text>Profile</Text>
      {
        //Accordion tabs
      }
      <Text>Search by</Text>
      <Text>Filter by</Text>
      <Text>Sort by</Text>
      {
        // Logout
      }
      <Text>Logout</Text>
    </View>
  );
};

export default TabButtons;
