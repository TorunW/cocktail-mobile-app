import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const Profile = ({ data }) => {
  const navigation = useNavigation();
  // click like button save the id as reference in like document in the user collection, current user, array or references
  // same with bookmarks

  return (
    <View>
      <Text>Profile</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
        <Text> Settings</Text>
        <View style={{ width: '100%', height: '30%' }}>
          <Text>Likes</Text>
          <Text>Bookmarks</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
