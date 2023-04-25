import React, { useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  Button,
  TextInput,
  FlatList,
} from 'react-native';
import { COLORS } from '../constants';
import { FocusedStatusBar } from '../components';
import { useForm, Controller } from 'react-hook-form';
import CheckBox from 'expo-checkbox';
import { useStoreActions, useStoreState } from 'easy-peasy';
import Dropdown from 'react-native-input-select';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

export const AddRecipe = () => {
  const state = useStoreState((state) => state);
  const cocktailsData = state.cocktails.cocktailList;
  const ingredientData = state.cocktails.ingredients;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      image: '',
      instructions: '',
      alcoholic: undefined,
      creator: 'Torun',
    },
  });

  const addCocktail = async (data) => {
    //set creator = to logged in user
    //calculate complexity
    let complexity;
    if (data.instructions.length <= 5) {
      complexity = 1;
    } else if (data.instructions.length > 5 && data.instructions.length < 10) {
      complexity = 2;
    } else if (data.instructions.length >= 10) {
      complexity = 3;
    }

    const alcoholic = data.alcoholic === 'true' ? true : false;

    const docRef = await addDoc(collection(db, 'cocktails'), {
      title: data.title,
      instructions: data.instructions,
      alcoholic: alcoholic,
      creator: data.creator,
      complexity: complexity,
      image: data.image,
    });
    console.log('Document written with ID: ', docRef.id);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusedStatusBar background={COLORS.primary} />
      <View
        style={{
          zIndex: 10,
          width: '100%',
          height: '100%',
          padding: 20,
        }}
      >
        <Text>ADD NEW</Text>

        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <Dropdown
              label='Aloholic'
              placeholder='Does it contain alc...'
              options={[
                { name: 'Alcoholic', value: 'true' },
                { name: 'Non Alcoholic', value: 'false' },
              ]}
              optionLabel={'name'}
              optionValue={'value'}
              selectedValue={value}
              onValueChange={onChange}
              primaryColor={'green'}
            />
          )}
          name='alcoholic'
        />

        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder='Title'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name='title'
        />

        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder='Image'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name='image'
        />
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder='Instructions'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name='instructions'
        />

        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder='Creator'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name='creator'
        />
        <Button title='Add cocktail' onPress={handleSubmit(addCocktail)} />
      </View>
    </SafeAreaView>
  );
};
