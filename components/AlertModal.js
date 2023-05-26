import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  TextInput,
  Button,
} from 'react-native';
import React, { useState } from 'react';
import { COLORS, SIZES, SHADOWS, SPACING, FONTS } from '../constants';

const AlertModal = ({ message, title, visible, closeModal, textInput }) => {
  console.log(textInput);
  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={visible}
      onRequestClose={closeModal}
    >
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          width: '100%',
        }}
      >
        <Pressable
          style={{
            position: 'absolute',
            right: 2,
            top: 0,
            backgroundColor: 'red',
            width: 40,
            height: 40,
          }}
          onPress={closeModal}
        >
          <Text>X</Text>
        </Pressable>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLORS.grad3,
            marginHorizontal: 30,
          }}
        >
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: 400,
              backgroundColor: COLORS.grad3,
              paddingVertical: 20,
              paddingHorizontal: 30,
            }}
          >
            <Text style={{ fontFamily: FONTS.extraBold }}>{title}</Text>
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

export default AlertModal;
