import { KeyboardAvoidingView } from 'react-native';
import React from 'react';
import { COLORS } from '../constants';
import { useStoreState } from 'easy-peasy';
import { LinearGradient } from 'expo-linear-gradient';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Login = () => {
  const state = useStoreState((state) => state);

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
