import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { auth } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';

const Settings = () => {
  const navigation = useNavigation();
  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace('Login');
      })
      .catch((err) => alert(err.message));
  };
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ gap: 10 }}>
        <TouchableOpacity onPress={handleLogout}>
          <Text>Logout</Text>
        </TouchableOpacity>
        <Text>{auth.currentUser?.email}</Text>
        <Text>report issue</Text>
        <Text>delete account</Text>
        <Text>change pasword</Text>
      </View>
    </View>
  );
};

export default Settings;
