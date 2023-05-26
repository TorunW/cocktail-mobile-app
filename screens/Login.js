import { KeyboardAvoidingView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS } from '../constants';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { LinearGradient } from 'expo-linear-gradient';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const action = useStoreActions((actions) => actions);
  const state = useStoreState((state) => state);
  const navigation = useNavigation();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const querySnapshot = await getDocs(collection(db, 'users'));
    const users = querySnapshot.docs.map((doc, index) => ({
      id: doc.id,
      email: doc.data().email,
    }));
    action.users.setUsers(users);
  };

  return (
    <KeyboardAvoidingView
      behavior='height'
      style={{ flex: 1, alignItems: 'center' }}
    >
      <LinearGradient
        colors={[COLORS.secondary, COLORS.grad3]}
        style={{
          padding: 20,
          marginVertical: 60,
          justifyContent: 'center',
          gap: 15,
          borderRadius: 10,
          height: 'auto',
          width: 300,
        }}
      >
        {state.users.toggleForm === 'login' ? <LoginForm /> : <RegisterForm />}
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default Login;
