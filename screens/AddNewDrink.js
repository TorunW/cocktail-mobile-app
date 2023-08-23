import React, { useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  Button,
  TextInput,
  ScrollView,
} from 'react-native';
import { COLORS } from '../constants';
import { FocusedStatusBar } from '../components';
import { useForm, Controller } from 'react-hook-form';
import Dropdown from 'react-native-input-select';
import { db } from '../firebaseConfig';
import { collection, doc, addDoc } from 'firebase/firestore';
import ImageUploader from '../components/ImageUploader';
import { useStoreState } from 'easy-peasy';
import IngredientsForm from '../components/IngredientsForm';
import { useNavigation } from '@react-navigation/native';

export const AddNewDrink = () => {
  const image = useStoreState((state) => state.drinks.image);
  const submittedFormIngredients = useStoreState(
    (state) => state.drinks.ingredientsToDrink
  );
  const existingIngredients = useStoreState(
    (state) => state.drinks.ingredients
  );
  const [ingredientRefsWithMeasures, setIngredientRefsWithMeasures] = useState(
    []
  );
  const [isIngredientsSubmitted, setIsIngredientsSubmitted] = useState(false);
  const [isImageSubmitted, setIsImageSubmitted] = useState(false);
  const [isDrinkSubmitted, setIsDrinkSubmitted] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    getIngredientId();
  }, [isIngredientsSubmitted]);

  useEffect(() => {
    if (isDrinkSubmitted === true) {
      navigation.replace('Root');
    }
  }, [isDrinkSubmitted]);

  const getIngredientId = () => {
    const ingredientArr = existingIngredients.filter((existingIngredient) =>
      submittedFormIngredients.some(
        (submittedFormIngredient) =>
          existingIngredient.name.toLowerCase() ===
          submittedFormIngredient.ingredient.toLowerCase()
      )
    );

    const referenceArr = ingredientArr.map((item, index) => {
      let measure = submittedFormIngredients.map((m) => m.measure);
      const ingredientRef = doc(db, 'ingredients', item.id);
      return {
        ingredient: ingredientRef,
        measure: measure === '' ? '' : measure[index],
      };
    });
    setIngredientRefsWithMeasures(referenceArr);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      instructions: '',
      alcoholic: undefined,
      ingredients: [],
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
      ingredients: ingredientRefsWithMeasures,
    });
    console.log('Document written with ID: ', docRef.id);
    setIsDrinkSubmitted(true);
  };

  let formDisplay;
  if (isIngredientsSubmitted === false) {
    formDisplay = (
      <IngredientsForm setIsIngredientsSubmitted={setIsIngredientsSubmitted} />
    );
  } else if (isIngredientsSubmitted === true && isImageSubmitted === false) {
    formDisplay = <ImageUploader setIsImageSubmitted={setIsImageSubmitted} />;
  } else if (isIngredientsSubmitted === true && isImageSubmitted === true) {
    formDisplay = (
      <View
        style={{
          zIndex: 10,
          width: '100%',
          height: '100%',
          padding: 20,
        }}
      >
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
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusedStatusBar background={COLORS.primary} />
      <ScrollView>{formDisplay}</ScrollView>
    </SafeAreaView>
  );
};
