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
import { auth } from '../firebaseConfig';
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AlertModal from './AlertModal';
import { COLORS, FONTS, SIZES, SHADOWS, SPACING } from '../constants';
import { EyeIcon, ClosedEyeIcon } from '../assets/icons/Icon';

const LoginForm = () => {
  const action = useStoreActions((actions) => actions);
  const state = useStoreState((state) => state);
  const navigation = useNavigation();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isEmailErrorVisible, setIsEmailErrorVisible] = useState(false);
  const [isPasswordErrorVisible, setIsPasswordErrorVisible] = useState(false);
  const [isTooManyRequestErrorVisible, setIsTooManyRequestErrorVisible] =
    useState(false);
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
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const isDirty = control._formState.dirtyFields;
  useEffect(() => {
    isDirty.email === true && isDirty.password === true
      ? setIsButtonActive(true)
      : setIsButtonActive(false);
  }, [control._formState]);

  const loginUser = async (data) => {
    const email = data.email.replace(/^\s+|\s+$/gm, '').toLowerCase();
    const password = data.password;

    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredentials) => {
        const user = userCredentials.user;

        await AsyncStorage.setItem('@email_key', user.email);
        await AsyncStorage.setItem('@token_key', user.accessToken);

        const currentUser = state.users.userList.find(
          (item) => item.email === email
        );

        await AsyncStorage.setItem('@id_key', currentUser.id);
        await AsyncStorage.setItem(
          '@savedRecipe_key',
          JSON.stringify(currentUser.savedRecipe)
        );
        await AsyncStorage.setItem(
          '@ratedDrinks_key',
          JSON.stringify(currentUser.ratedDrinks)
        );

        const storageId = await AsyncStorage.getItem('@id_key');
        const storageSavedRecipe = await AsyncStorage.getItem(
          '@savedRecipe_key'
        );
        const storageRatedDrinks = await AsyncStorage.getItem(
          '@ratedDrinks_key'
        );

        action.users.setCurrentUser({
          token: user.accessToken,
          email: user.email,
          id: storageId,
          savedRecipe: JSON.parse(storageSavedRecipe),
          ratedDrinks: JSON.parse(storageRatedDrinks),
        });
      })
      .catch((err) => {
        if (err.code === 'auth/wrong-password') {
          setIsPasswordErrorVisible(true);
        }
        if (
          err.code === 'auth/invalid-email' ||
          err.code === 'auth/user-not-found'
        ) {
          setIsEmailErrorVisible(true);
        }
        if (err.code === 'auth/too-many-requests') {
          setIsTooManyRequestErrorVisible(true);
        }
        console.log(err);
      });
  };

  const handleResetPassword = () => {
    sendPasswordResetEmail(auth, 'torun.wikstrom@gmail.com')
      .then(() => {
        alert('Password reset  email sent');
      })
      .catch((err) => console.log(err));
  };

  return (
    <KeyboardAvoidingView
      style={{
        alignItems: 'center',
        height: '55%',
      }}
    >
      {isTooManyRequestErrorVisible === true ? (
        <AlertModal
          message={
            'Too many failed login attempts have been made, reset your password or try again later.'
          }
        />
      ) : (
        ''
      )}

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
            required: true,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'invalid email address',
            },
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
        {errors.email && errors.email.message ? (
          <Text style={styles.errorMessage}>
            {errors.email && `${errors.email.message}`}
          </Text>
        ) : (
          ''
        )}
        {isEmailErrorVisible === true ? (
          <Text style={styles.errorMessage}>Invalid email, try again or</Text>
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
                'Password must contain numbers, letters and be at least 8 characters',
            },
            validate: true,
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
              {errors.password && errors.password.message ? (
                <Text style={styles.errorMessage}>
                  {errors.password && `${errors.password.message}`}
                </Text>
              ) : (
                ''
              )}
              {isPasswordErrorVisible === true ? (
                <Text style={styles.errorMessage}>Password incorrect</Text>
              ) : (
                ''
              )}
            </>
          )}
          name='password'
        />

        <Pressable
          onPress={handleResetPassword}
          style={{
            width: 270,
            marginTop:
              isPasswordErrorVisible === true ||
              errors.password?.message.length >= 1
                ? 5
                : -8,
          }}
        >
          <Text
            style={{
              fontFamily: FONTS.regular,
              fontSize: SIZES.regular,
            }}
          >
            Forgot password?
          </Text>
        </Pressable>
      </View>

      <TouchableOpacity
        disabled={isButtonActive === true ? false : true}
        onPress={handleSubmit(loginUser)}
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
          Login
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
          onPress={() => action.users.setToggleForm('register')}
          style={{ flexDirection: 'row' }}
        >
          <Text style={{ fontFamily: FONTS.light }}>
            Don't have an account yet?
          </Text>
          <Text style={{ fontFamily: FONTS.medium }}> Register</Text>
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

export default LoginForm;
