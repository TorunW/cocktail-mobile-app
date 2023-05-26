import {
  Text,
  Button,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { auth } from '../firebaseConfig';
import { TextInput } from 'react-native-gesture-handler';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/core';

const LoginForm = () => {
  const action = useStoreActions((actions) => actions);
  const state = useStoreState((state) => state);
  const users = state.users.userList;
  const navigation = useNavigation();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  console.log(isPasswordVisible);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace('Root');
      }
    });
  }, []);

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
    const exsitingUserEmail = users.some((item) => item.email === email);

    if (exsitingUserEmail === true) {
      signInWithEmailAndPassword(auth, email, password).then(
        (userCredentials) => {
          const user = userCredentials.user;
          action.users.setLoggedinUser(user.email);
        }
      );
    } else {
      action.users.setToggleForm('register');
    }
  };

  return (
    <KeyboardAvoidingView style={{ gap: 15 }}>
      <Text>LOGIN</Text>

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
      <TouchableOpacity onPress={() => action.users.setToggleForm('register')}>
        <Text
          style={{ marginVertical: 15, width: '100%', textAlign: 'center' }}
        >
          Create new user
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default LoginForm;
