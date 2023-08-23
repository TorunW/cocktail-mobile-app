import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Settings } from '../assets/icons/Icon';
import StaticHeader from './StaticHeader';
import { COLORS, SIZES, SPACING, SHADOWS } from '../constants';
import { useStoreActions, useStoreState } from 'easy-peasy';

const ProfileHeader = () => {
  const setIsOpen = useStoreActions(
    (actions) => actions.users.setSettingsIsOpen
  );
  const isOpen = useStoreState((state) => state.users.settingsIsOpen);

  return (
    <View style={styles.header}>
      <StaticHeader />
      <TouchableOpacity
        onPress={() => setIsOpen(isOpen === false ? true : false)}
        style={styles.settingsBtn}
      >
        <Settings
          size={SIZES.icon}
          style={styles.settingsBtn}
          color={COLORS.white}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'flex-end',
  },
  settingsBtn: { ...SHADOWS.text, padding: SPACING.xs, zIndex: 20 },
});
export default ProfileHeader;
