import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import React, { useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { COLORS, FONTS, SIZES, SPACING } from '../constants';
import { useStoreActions } from 'easy-peasy';
import { RemoveIcon } from '../assets/icons/Icon';
import { ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const StepsForm = ({ setIsInstructionsSubmitted }) => {
  const setInstructionsToDrink = useStoreActions(
    (actions) => actions.drinks.setInstructionsToDrink
  );
  const [isLoading, setIsLoading] = useState(false);

  const { register, control, handleSubmit, reset } = useForm({
    defaultValues: {
      instructions: [{ step: '' }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'instructions',
  });

  const onSubmit = async (data) => {
    let newInstructionsArr = [];
    data.instructions.forEach((element, index) => {
      const key = `step${index + 1}`;
      const value = element.step;
      const newStepObj = {
        [key]: value,
      };

      newInstructionsArr.push(newStepObj);
    });

    setInstructionsToDrink(newInstructionsArr);
    setIsInstructionsSubmitted(true);
  };

  return (
    <KeyboardAwareScrollView style={styles.pageContainer}>
      <Text style={styles.title}>Add instructions</Text>
      <View>
        {fields.map((item, index) => {
          return (
            <View key={item.id} style={styles.formContainer}>
              <Controller
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.textInput}
                    placeholder={`Step ${index + 1}`}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    {...register(`instructions.${index}.step`, {
                      required: true,
                    })}
                  />
                )}
                name={`instructions.${index}.step`}
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
        <Text style={styles.font}>+ Add Another Step to Instructions</Text>
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
            <Text style={styles.font}>Submit</Text>
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
  textInput: {
    width: '80%',
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
    marginBottom: SPACING.xl,
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

export default StepsForm;
