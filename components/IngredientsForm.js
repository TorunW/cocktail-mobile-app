import { View, Text, TextInput, Button } from 'react-native';
import React, { useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { COLORS, FONTS, SIZES } from '../constants';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import getIngredientsData from '../transactions/getIngredientsData';

const IngredientsForm = ({ setIsIngredientsSubmitted }) => {
  const existingIngredients = useStoreState(
    (state) => state.drinks.ingredients
  );
  const action = useStoreActions((actions) => actions);
  const [isLoading, setIsLoading] = useState(false);

  const { register, control, handleSubmit, reset } = useForm({
    defaultValues: {
      ingredients: [{ ingredient: '', measure: '' }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ingredients',
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    const toBeAddedInFirebase = data.ingredients.filter(
      (obj) =>
        !existingIngredients.some(
          (obj2) => obj.ingredient.toLowerCase() === obj2.name.toLowerCase()
        )
    );

    if (toBeAddedInFirebase.length > 0) {
      toBeAddedInFirebase.forEach(async (element) => {
        const docRef = await addDoc(collection(db, 'ingredients'), {
          name: element.ingredient.toLowerCase().trimEnd(),
        });
        console.log('Document written with ID: ', docRef.id);
      });
    }
    action.drinks.setIngredientsToDrink(data.ingredients);
    getData();
  };

  const getData = async () => {
    action.drinks.setIngredients(await getIngredientsData());
    setIsLoading(false);
    setIsIngredientsSubmitted(true);
  };

  return (
    <View
      style={{
        paddingHorizontal: 20,
        backgroundColor: COLORS.secondary,
        paddingVertical: 10,
        gap: 5,
        justifyContent: 'center',
      }}
    >
      <Text style={{ fontFamily: FONTS.bold, fontSize: SIZES.large }}>
        Add Ingredients
      </Text>
      <View>
        {fields.map((item, index) => {
          return (
            <View
              key={item.id}
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Controller
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={{
                      elevation: 1,
                      width: '70%',
                      borderRadius: 3,
                      paddingLeft: 4,
                      backgroundColor: COLORS.grad3,
                    }}
                    placeholder='Ingredient'
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    {...register(`ingredients.${index}.ingredient`, {
                      required: true,
                    })}
                  />
                )}
                name={`ingredients.${index}.ingredient`}
                control={control}
              />
              <Controller
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={{
                      elevation: 1,
                      width: '20%',
                      borderRadius: 3,
                      paddingLeft: 4,
                      backgroundColor: COLORS.grad3,
                    }}
                    placeholder='Measure'
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    {...register(`ingredients.${index}.measure`, {
                      required: false,
                    })}
                  />
                )}
                name={`ingredients.${index}.measure`}
                control={control}
              />
              <Button
                style={{
                  width: '10%',
                }}
                color='red'
                title='-'
                onPress={() => remove(index)}
              />
            </View>
          );
        })}
      </View>
      <View style={{ gap: 5 }}>
        <Button
          title='+ Add another ingredient'
          onPress={() => {
            append({ ingredient: '', measure: '' });
          }}
        />

        <Button
          title='Reset'
          onPress={() =>
            reset({
              test: [{ ingredient: '', measure: '' }],
            })
          }
        />
      </View>

      <Button
        title={isLoading === true ? 'is submitting' : 'submit'}
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};

export default IngredientsForm;
