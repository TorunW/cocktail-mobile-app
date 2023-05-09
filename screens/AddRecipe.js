import React, { useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  Button,
  TextInput,
  Image,
} from 'react-native';
import { COLORS } from '../constants';
import { FocusedStatusBar } from '../components';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import Dropdown from 'react-native-input-select';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import ImageUploader from '../components/ImageUploader';
import { useStore, useStoreState } from 'easy-peasy';
import IngredientsForm from '../components/IngredientsForm';

export const AddRecipe = () => {
  const image = useStoreState((state) => state.drinks.image);
  const ingredients = useStoreState((state) => state.drinks.ingredientsToDrink);
  const existingIngredients = useStoreState(
    (state) => state.drinks.ingredients
  );
  console.log(ingredients, 'submittet ingred');
  console.log(existingIngredients, 'exsisisis');
  const findIngredient = () => {};
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      instructions: '',
      alcoholic: undefined,
      ingredients: '',
    },
  });

  const addDrink = async (data) => {
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
      complexity: complexity,
      image: image,
    });
    console.log('Document written with ID: ', docRef.id);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusedStatusBar background={COLORS.primary} />
      <IngredientsForm />
      <View
        style={{
          zIndex: 10,
          width: '100%',
          height: '100%',
          padding: 20,
        }}
      >
        <Text>ADD NEW</Text>
        <ImageUploader />
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
              placeholder='Instructions'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name='instructions'
        />
        <Button title='Add drink' onPress={handleSubmit(addDrink)} />
      </View>
    </SafeAreaView>
  );
};
