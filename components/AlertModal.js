import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';
import React, { useState } from 'react';
import { COLORS, SIZES, SHADOWS, SPACING, FONTS } from '../constants';

const AlertModal = ({ message, title, visible, closeModal, textInput }) => {
  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={visible}
      onRequestClose={closeModal}
    >
      <View style={styles.container}>
        <Pressable style={styles.closeBtn} onPress={closeModal}>
          <Text>X</Text>
        </Pressable>
        <View style={styles.outerTextContainer}>
          <View style={styles.textContainer}>
            <Text>{title}</Text>
            <Text>{message}</Text>
            {textInput === true ? (
              <>
                <TextInput placeholder={message} />
                <Button title='submit' />
              </>
            ) : (
              ''
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  closeBtn: {
    position: 'absolute',
    right: 2,
    top: 0,
    backgroundColor: 'red',
    width: 40,
    height: 40,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 400,
    backgroundColor: COLORS.grad3,
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  outerTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.grad3,
    marginHorizontal: 30,
  },
});

export default AlertModal;
