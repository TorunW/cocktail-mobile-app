import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { COLORS, FONTS, SIZES, SPACING } from '../constants';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import getIngredientsData from '../transactions/getIngredientsData';
import { RemoveIcon } from '../assets/icons/Icon';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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
          (obj2) =>
            obj.ingredient.toLowerCase().trimEnd() === obj2.name.toLowerCase()
        )
    );

    if (toBeAddedInFirebase.length > 0) {
      toBeAddedInFirebase.forEach(async (element) => {
        try {
          const docRef = await addDoc(collection(db, 'ingredients'), {
            name: element.ingredient.toLowerCase().trimEnd(),
          });
          console.log('Document written with ID: ', docRef.id);
        } catch (error) {
          throw `ERROR : ${error}`;
        }
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
    <KeyboardAwareScrollView style={styles.pageContainer}>
      <Text style={styles.title}>Add Ingredients</Text>
      <View>
        {fields.map((item, index) => {
          return (
            <View key={item.id} style={styles.formContainer}>
              <Controller
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.ingredientInput}
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
                    style={styles.measureInput}
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
              <Pressable onPress={() => remove(index)}>
                <RemoveIcon color={COLORS.deepPink} size={SIZES.iconL} />
              </Pressable>
            </View>
          );
        })}
      </View>

      <Pressable
        style={styles.button}
        onPress={() => {
          append({ ingredient: '', measure: '' });
        }}
      >
        <Text style={styles.font}>+ Add another ingredient</Text>
      </Pressable>
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          onPress={() =>
            reset({
              test: [{ ingredient: '', measure: '' }],
            })
          }
        >
          <Text style={styles.font}>Reset</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
          {isLoading === false ? (
            <Text style={styles.font}>Next</Text>
          ) : (
            <ActivityIndicator size='small' color={COLORS.black} />
          )}
        </Pressable>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.l,
    backgroundColor: COLORS.midPink,
    gap: SPACING.xs,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.large,
    marginBottom: SPACING.s,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.s,
  },
  ingredientInput: {
    width: '60%',
    borderRadius: 5,
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.xs,
    backgroundColor: COLORS.pinkTransparent,
    borderWidth: 0.9,
    borderColor: COLORS.deepPinkTransparent,
    fontFamily: FONTS.regular,
  },
  measureInput: {
    width: '25%',
    borderRadius: 5,
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.xs,
    backgroundColor: COLORS.pinkTransparent,
    borderWidth: 0.9,
    borderColor: COLORS.deepPinkTransparent,
    fontFamily: FONTS.regular,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    gap: SPACING.s,
    marginTop: SPACING.xs,
  },
  button: {
    minWidth: '50%',
    borderRadius: 5,
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.xs,
    backgroundColor: COLORS.deepPink,
    borderWidth: 0.9,
    borderColor: COLORS.deepPinkTransparent,
    marginVertical: SPACING.xs,
  },
  font: {
    textAlign: 'center',
    fontFamily: FONTS.medium,
  },
});
export default IngredientsForm;
