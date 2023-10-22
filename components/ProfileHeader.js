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
        style={
          isOpen === true
            ? styles.settingsCloseButton
            : styles.settingsOpenButton
        }
      >
        <Settings
          size={SIZES.icon}
          style={styles.settingsOpenButton}
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
  settingsOpenButton: {
    ...SHADOWS.text,
    padding: SPACING.xs,
    zIndex: 20,
  },
  settingsCloseButton: {
    ...SHADOWS.text,
    padding: SPACING.xs,
    zIndex: 20,
    width: 100,
    height: '100%',
    alignItems: 'flex-end',
  },
});
export default ProfileHeader;
