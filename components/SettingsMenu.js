import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React, { useState } from 'react';
import { auth } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { sendPasswordResetEmail } from 'firebase/auth';
import AlertModal from '../components/AlertModal';
import { useStoreActions, useStoreState } from 'easy-peasy';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Alert,
  ChangePassword,
  DeleteAccount,
  Logout,
  SuggestDrink,
} from '../assets/icons/Icon';
import { COLORS, SIZES, SPACING, FONTS } from '../constants';

const SettingsMenu = () => {
  const navigation = useNavigation();
  const action = useStoreActions((actions) => actions);
  const state = useStoreState((state) => state);
  const user = useStoreState((state) => state.users.currentUser);
  const isOpen = useStoreState((state) => state.users.settingsIsOpen);
  const [alertType, setAlertType] = useState('');

  const openModal = (type) => {
    if (type === 'issue') {
      setAlertType('issue');
    } else if (type === 'suggestion') {
      setAlertType('suggestion');
    } else if (type === 'delete') {
      setAlertType('delete');
    }
    action.alert.setIsAlertVisible(true);
  };

  const handleLogout = () => {
    auth
      .signOut()
      .then(async () => {
        await AsyncStorage.removeItem('@token_key');
        await AsyncStorage.removeItem('@email_key');
        await AsyncStorage.removeItem('@id_key');
        await AsyncStorage.removeItem('@savedRecipe_key');
        await AsyncStorage.removeItem('@ratedDrinks_key');

        action.users.setCurrentUser({
          token: null,
          email: null,
          id: null,
          savedRecipe: null,
          ratedDrinks: null,
        });
        navigation.navigate('Login');
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
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: isOpen === true ? 0 : -290,
        backgroundColor: COLORS.midPink,
        height: Dimensions.get('window').height,
        zIndex: 30,
        paddingVertical: SPACING.s,
        paddingHorizontal: SPACING.s,
        gap: SPACING.xs,
        elevation: 2,
        width: 290,
      }}
    >
      <Text style={styles.emailtext}>{user.email} </Text>

      <TouchableOpacity
        style={styles.menuRow}
        onPress={() => openModal('issue')}
      >
        <Alert style={styles.icon} size={SIZES.icon} />
        <Text style={styles.text}>Report issue</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuRow}
        onPress={() => openModal('suggestion')}
      >
        <SuggestDrink style={styles.icon} size={SIZES.icon} />
        <Text style={styles.text}>Make a suggestion</Text>
      </TouchableOpacity>

      <AlertModal
        title={
          alertType === 'issue'
            ? 'Report issue'
            : alertType === 'suggestion'
            ? 'Make a suggestion'
            : 'Delete account'
        }
        message={
          alertType === 'issue'
            ? `Please describe the issue you're experience as detailed as possible, we'll try to fix it as soon as possible`
            : alertType === 'suggestion'
            ? `Missing a feature or recipe? Send us a message and let us know!`
            : `Are you sure you want to delete your account permanently? All saved recipies and data will be lost.`
        }
        visible={state.alert.isAlertVisible}
        textInput={alertType !== 'delete' ? true : false}
        confirm={alertType === 'delete' ? true : false}
      />

      <TouchableOpacity style={styles.menuRow} onPress={handleResetPassword}>
        <ChangePassword style={styles.icon} size={SIZES.icon} />
        <Text style={styles.text}>change pasword</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuRow} onPress={handleLogout}>
        <Logout style={styles.icon} size={SIZES.icon} />
        <Text style={styles.text}>Logout</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => openModal('delete')}
        style={styles.menuRow}
      >
        <DeleteAccount style={styles.icon} size={SIZES.icon} />
        <Text style={styles.text}>delete account</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  menuRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.xs },
  emailtext: {
    fontFamily: FONTS.bold,
    color: COLORS.black2,
    marginBottom: SPACING.s,
  },
  icon: { color: COLORS.black2 },
  text: {
    fontFamily: FONTS.medium,
    textTransform: 'capitalize',
    color: COLORS.black2,
  },
});
export default SettingsMenu;
