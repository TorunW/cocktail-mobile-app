import {
  View,
  SafeAreaView,
  Text,
  Button,
  ImageBackground,
  FlatList,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { COLORS } from '../constants';
import { useForm, Controller } from 'react-hook-form';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { doc, collection, addDoc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { TextInput } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';

const Login = () => {
  const action = useStoreActions((actions) => actions);
  const state = useStoreState((state) => state);
  const users = state.users.userList;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
    },
  });

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const querySnapshot = await getDocs(collection(db, 'users'));
    const users = querySnapshot.docs.map((doc, index) => ({
      id: doc.id,
      name: doc.data().name,
      email: doc.data().email,
    }));
    action.users.setUsers(users);
  };

  const registerUser = async (data) => {
    const docRef = await addDoc(collection(db, 'users'), {
      name: data.name,
      email: data.email,
    });

    console.log('Document written with ID: ', docRef.id);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={[COLORS.secondary, COLORS.grad3]}
        style={{
          margin: 30,
          padding: 20,
          justifyContent: 'center',
          gap: 15,
          borderRadius: 10,
          height: 600,
          width: 300,
        }}
      >
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder='Name'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name='name'
        />

        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder='Email'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name='email'
        />
        <Button title='Register' onPress={handleSubmit(registerUser)} />

        <Text>Exsisting users:</Text>
        <FlatList
          data={users}
          renderItem={({ item }) => (
            <View
              style={{
                borderColor: COLORS.black,
                borderStyle: 'solid',
                borderWidth: 1,
                padding: 5,
                borderRadius: 5,
              }}
            >
              <Text>{item.name} </Text>
              <Text>{item.email} </Text>
              <Text>{item.id} </Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Login;
