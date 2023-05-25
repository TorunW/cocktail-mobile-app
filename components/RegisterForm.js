import {
  Text,
  Button,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import { TextInput } from 'react-native-gesture-handler';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const RegisterForm = () => {
  const action = useStoreActions((actions) => actions);
  const state = useStoreState((state) => state);
  const users = state.users.userList;
  const navigation = useNavigation();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate('Root');
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
        .then((userCredentials) => {
          const user = userCredentials.user;
          action.users.setLoggedinUser(user.email);
        })
        .catch((err) => console.log(err.message));

      console.log('Document written with ID: ', docRef.id);
    }
  };

  return (
    <KeyboardAvoidingView behavior='height'>
      <Text>REGISTRATION</Text>
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
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              placeholder='Password'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry
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

      <Button title='Register' onPress={handleSubmit(registerUser)} />
      <TouchableOpacity onPress={() => action.users.setToggleForm('login')}>
        <Text
          style={{ marginVertical: 15, width: '100%', textAlign: 'center' }}
        >
          Have an account already? Click here to login
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default RegisterForm;
