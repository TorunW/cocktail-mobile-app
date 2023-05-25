import { View, Text } from 'react-native';
import React from 'react';
import { auth } from '../firebaseConfig';

const Settings = () => {
  return (
    <View>
      <Text>Logut</Text>
      <Text>{auth.currentUser?.email}</Text>
      <Text>report issue</Text>
      <Text>delete account</Text>
      <Text>change pasword</Text>
    </View>
  );
};

export default Settings;
