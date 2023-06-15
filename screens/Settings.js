import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { auth } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { sendPasswordResetEmail } from 'firebase/auth';
import AlertModal from '../components/AlertModal';
import { useStoreActions, useStoreState } from 'easy-peasy';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Settings = () => {
  const navigation = useNavigation();
  const action = useStoreActions((actions) => actions);
  const user = useStoreState((state) => state.users.currentUser);
  const [isAlertVisible, setAlertVisible] = useState(false);

  const closeModal = () => {
    setAlertVisible(false);
  };

  const openModal = () => {
    setAlertVisible(true);
  };

  const handleLogout = () => {
    auth
      .signOut()
      .then(async () => {
        await AsyncStorage.clear();
        action.users.setCurrentUser({
          token: null,
          email: null,
          id: null,
          savedRecipe: null,
        });
        navigation.replace('Login');
      })
      .catch((err) => alert(err.message));
  };

  const handleResetPassword = () => {
    sendPasswordResetEmail(auth, user.email)
      .then(() => {
        alert('Password reset email sent');
      })
      .catch((err) => console.log(err));
  };

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ gap: 10 }}>
        <Text>{user.email}</Text>

        <TouchableOpacity onPress={openModal}>
          <Text>Report issue</Text>
        </TouchableOpacity>
        <AlertModal
          title={'Report issue'}
          message={`Please describe the issue you're experience as detailed as possible, we'll try to fix it as soon as possible`}
          visible={isAlertVisible}
          closeModal={closeModal}
          textInput={true}
        />

        <TouchableOpacity onPress={handleLogout}>
          <Text>Logout</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text>report issue</Text>
        </TouchableOpacity>

        <Text>delete account</Text>

        <TouchableOpacity onPress={handleResetPassword}>
          <Text>change pasword</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Settings;
