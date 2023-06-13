import {
  Text,
  Button,
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { auth } from '../firebaseConfig';
import { TextInput } from 'react-native-gesture-handler';
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginForm = () => {
  const action = useStoreActions((actions) => actions);
  const state = useStoreState((state) => state);
  const navigation = useNavigation();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isEmailErrorVisible, setIsEmailErrorVisible] = useState(false);
  const [isPasswordErrorVisible, setIsPasswordErrorVisible] = useState(false);
  const [isTooManyRequestErrorVisible, setIsTooManyRequestErrorVisible] =
    useState(false);

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
          '@likes_key',
          JSON.stringify(currentUser.likes)
        );

        const storageId = await AsyncStorage.getItem('@id_key');
        const storageLikes = await AsyncStorage.getItem('@likes_key');

        action.users.setCurrentUser({
          token: user.accessToken,
          email: user.email,
          id: storageId,
          likes: JSON.parse(storageLikes),
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
    <KeyboardAvoidingView style={{ gap: 15 }}>
      <Text>LOGIN</Text>
      {isTooManyRequestErrorVisible === true ? (
        <Text>
          Too many failed login attempts have been made, reset your password or
          try again later.
        </Text>
      ) : (
        ''
      )}
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
            />
          </>
        )}
        name='email'
      />
      {errors.email ? (
        <Text style={{ color: 'red' }}>
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
          validate: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              placeholder='Password'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={isPasswordVisible === false ? true : false}
            />
            {errors.password ? (
              <Text style={{ color: 'red' }}>
                {errors.password && `${errors.password.message}`}
              </Text>
            ) : (
              ''
            )}
          </>
        )}
        name='password'
      />

      <Button
        title='View Password'
        onPress={() =>
          isPasswordVisible === false
            ? setIsPasswordVisible(true)
            : setIsPasswordVisible(false)
        }
      />

      <Button title='Login' onPress={handleSubmit(loginUser)} />

      <View style={{ alignItems: 'center' }}>
        {isEmailErrorVisible === true ? (
          <Text>Invalid email, try again or</Text>
        ) : (
          ''
        )}
        {isPasswordErrorVisible === true ? <Text>Password incorrect</Text> : ''}
        <TouchableOpacity
          onPress={() => action.users.setToggleForm('register')}
        >
          <Text
            style={{ marginVertical: 15, width: '100%', textAlign: 'center' }}
          >
            Create user
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleResetPassword}>
          <Text>Reset password</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginForm;
