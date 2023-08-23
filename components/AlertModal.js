import {
  View,
  Text,
  Modal,
  Pressable,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS, SIZES, SHADOWS, SPACING, FONTS } from '../constants';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useForm, Controller } from 'react-hook-form';
import { useStoreState } from 'easy-peasy';
import { Close } from '../assets/icons/Icon';

const AlertModal = ({
  message,
  title,
  visible,
  closeModal,
  textInput,
  confirm,
}) => {
  const state = useStoreState((state) => state);
  const [buttonText, setButtonText] = useState('Submit');

  const {
    control,
    handleSubmit,
    reset,
    formState,
    formState: { isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      input: '',
    },
  });

  const handleSendEmail = async (data) => {
    const docRef = await addDoc(collection(db, 'mail'), {
      title: data === 'delete' ? 'Delete' : title,
      message: data === 'delete' ? state.users.currentUser : data.input,
      uid: state.users.currentUser.email,
    });
    console.log('Document written with ID: ', docRef.id);
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      setButtonText('Message sent');
      setTimeout(() => {
        reset({ input: '' });
        setButtonText('Submit');
      }, 3000);
    }
  }, [formState, reset]);

  useEffect(() => {
    reset({ input: '' });
  }, [closeModal]);

  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={visible}
      onRequestClose={closeModal}
    >
      <View style={styles.container}>
        <View style={styles.modal}>
          <TouchableOpacity style={styles.closeBtn} onPress={closeModal}>
            <Close
              style={styles.closeBtn}
              color={COLORS.black2}
              size={SIZES.iconL}
            />
          </TouchableOpacity>
          <View style={styles.textContainer}>
            <Text style={styles.bigText}>{title}</Text>
            <Text style={styles.smallText}>{message}</Text>
            {textInput === true ? (
              <>
                <Controller
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      placeholder='Instructions'
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      style={styles.input}
                      multiline={true}
                      numberOfLines={5}
                    />
                  )}
                  name='input'
                />

                <Pressable
                  style={styles.button}
                  onPress={handleSubmit(handleSendEmail)}
                >
                  <Text style={styles.bigText}>{buttonText} </Text>
                </Pressable>
              </>
            ) : (
              ''
            )}
            {confirm === true ? (
              <>
                <Pressable
                  style={styles.button}
                  onPress={() => handleSendEmail('delete')}
                >
                  <Text style={styles.bigText}>Yes</Text>
                </Pressable>
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
    height: '100%',
    width: '100%',
    backgroundColor: COLORS.darkTransparent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.midPink,
    paddingVertical: SPACING.xl + SPACING.l,
    paddingHorizontal: SPACING.m,
    borderRadius: 10,
    elevation: 2,
  },
  closeBtn: {
    position: 'absolute',
    top: SPACING.xs,
    right: SPACING.xs,
    ...SHADOWS.text,
  },
  bigText: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.large,
    color: COLORS.black2,
    marginBottom: SPACING.xs,
  },
  smallText: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.font,
    marginBottom: SPACING.s,
  },
  input: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.font,
    marginBottom: SPACING.s,
    backgroundColor: COLORS.pinkTransparent,
    borderRadius: 10,
    maxHeight: 100,
    paddingHorizontal: SPACING.xs,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.deepPink,
    borderRadius: 10,
    paddingTop: SPACING.xs,
  },
});

export default AlertModal;
