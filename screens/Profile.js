import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const Profile = ({ data }) => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Profile</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
        <Text> Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
