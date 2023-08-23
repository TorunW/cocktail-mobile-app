import {
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
  StyleSheet,
  Pressable,
  TextInput,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EyeIcon, ClosedEyeIcon } from '../assets/icons/Icon';
import { COLORS, FONTS, SIZES, SHADOWS, SPACING } from '../constants';

const RegisterForm = () => {
  const action = useStoreActions((actions) => actions);
  const state = useStoreState((state) => state);
  const users = state.users.userList;
  const navigation = useNavigation();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isEmailErrorVisible, setIsEmailErrorVisible] = useState(false);
  const [isPasswordErrorVisible, setIsPasswordErrorVisible] = useState(false);
  const [isButtonActive, setIsButtonActive] = useState(false);

  useEffect(() => {
    if (
      state.users.currentUser &&
      typeof state.users.currentUser.token === 'string'
    ) {
      navigation.replace('Root');
    }
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace('Root');
      }
    });
  }, [state.users.currentUser]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const isDirty = control._formState.dirtyFields;
  useEffect(() => {
    console.log(isDirty);
    isDirty.email === true && isDirty.password === true
      ? setIsButtonActive(true)
      : setIsButtonActive(false);
  }, [control._formState]);

  const registerUser = async (data) => {
    const email = data.email.replace(/^\s+|\s+$/gm, '').toLowerCase();
    const password = data.password;
    const exsitingUserEmail = users.some((item) => item.email === email);

    if (exsitingUserEmail === true) {
      action.users.setToggleForm('login');
    } else {
      const docRef = await addDoc(collection(db, 'users'), {
        email: email,
      });
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredentials) => {
          const user = userCredentials.user;
          await AsyncStorage.setItem('@email_key', user.email);
          await AsyncStorage.setItem('@token_key', user.accessToken);
          await AsyncStorage.setItem('@id_key', docRef.id);

          action.users.setCurrentUser({
            token: user.accessToken,
            email: user.email,
            id: docRef.id,
            savedRecipe: null,
            ratedDrinks: null,
          });
        })
        .catch((err) => {
          console.log(err);
        });
      console.log('Document written with ID: ', docRef.id);
    }
  };

  return (
    <KeyboardAvoidingView style={{ alignItems: 'center', height: '55%' }}>
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: SPACING.s,
        }}
      >
        <Controller
          control={control}
          rules={{
            required: 'Cannot be empty',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'invalid email address',
            },
            validate: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                placeholder='Email'
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.textInput}
              />
            </>
          )}
          name='email'
        />
        {errors.email ? (
          <Text style={styles.errorMessage}>
            {errors.email && `${errors.email.message}`}
          </Text>
        ) : (
          ''
        )}
        <Controller
          control={control}
          rules={{
            required: true,
            pattern: {
              value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/i,
              message:
                'Password must contain numbers, letter and have a minimun length of 8 characters',
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <View>
                <TextInput
                  placeholder='Password'
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry={isPasswordVisible === false ? true : false}
                  style={styles.textInput}
                />
                <Pressable
                  onPress={() =>
                    isPasswordVisible === false
                      ? setIsPasswordVisible(true)
                      : setIsPasswordVisible(false)
                  }
                  style={{ position: 'absolute', right: 15, top: 20 }}
                >
                  {isPasswordVisible === false ? (
                    <EyeIcon size={SIZES.extraLarge} color={COLORS.grey} />
                  ) : (
                    <ClosedEyeIcon
                      size={SIZES.extraLarge}
                      color={COLORS.grey}
                    />
                  )}
                </Pressable>
              </View>
              {errors.password ? (
                <Text style={styles.errorMessage}>
                  {errors.password && `${errors.password.message}`}
                </Text>
              ) : (
                ''
              )}
            </>
          )}
          name='password'
        />
      </View>
      <TouchableOpacity
        disabled={isButtonActive === true ? false : true}
        onPress={handleSubmit(registerUser)}
        style={{
          width: 300,
          backgroundColor: COLORS.primary,
          borderRadius: 30,
          paddingVertical: 15,
          ...SHADOWS.light,
          opacity: isButtonActive === false ? 0.7 : 1,
          marginVertical: SPACING.s,
        }}
      >
        <Text
          style={{
            fontFamily: FONTS.bold,
            fontSize: SIZES.medium,
            textTransform: 'uppercase',
            textAlign: 'center',
            color: isButtonActive === false ? COLORS.grey : COLORS.black,
          }}
        >
          Register
        </Text>
      </TouchableOpacity>

      <View
        style={{
          position: 'absolute',
          paddingBottom:
            isPasswordErrorVisible === true ||
            errors.password?.message.length >= 1
              ? 0
              : SPACING.s,
          bottom: 0,
        }}
      >
        <TouchableOpacity
          onPress={() => action.users.setToggleForm('login')}
          style={{ flexDirection: 'row' }}
        >
          <Text style={{ fontFamily: FONTS.light }}>
            Have an account already?
          </Text>
          <Text style={{ fontFamily: FONTS.medium }}> Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: 300,
    backgroundColor: COLORS.lightTransparent,
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
    fontFamily: FONTS.medium,
    fontSize: SIZES.font,
    ...SHADOWS.light,
    height: 48,
  },
  errorMessage: {
    color: COLORS.black,
    fontFamily: FONTS.light,
    fontSize: SIZES.regular,
    textAlign: 'left',
    width: 270,
    marginVertical: -5,
  },
});

export default RegisterForm;
