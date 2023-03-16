import { View, Text } from 'react-native';
import React from 'react';
import { SIZES, FONTS, COLORS, SHADOWS, assets } from '../constants';
import { ReadMoreBtn } from './Button';

export const Title = ({ title, subTitle, titleSize, subTitleSize }) => {
  return (
    <View>
      <Text
        style={{
          fontFamily: FONTS.semiBold,
          fontSize: titleSize,
          color: COLORS.black,
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          fontFamily: FONTS.regular,
          fontSize: subTitleSize,
          color: COLORS.black,
        }}
      >
        by {subTitle}
      </Text>
    </View>
  );
};

export const User = () => {
  return (
    <View
      style={{
        paddingHorizontal: SIZES.font,
        paddingVertical: SIZES.base,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.light,
        elevation: 1,
        maxWidth: '50%',
        borderRadius: 10,
      }}
    >
      <Text
        style={{
          fontFamily: FONTS.regular,
          fontSize: SIZES.small,
          color: COLORS.black,
        }}
      >
        Recipie by:
      </Text>
      <Text
        style={{
          fontFamily: FONTS.regular,
          fontSize: SIZES.medium,
          color: COLORS.black,
        }}
      >
        User
      </Text>
    </View>
  );
};
export const Likes = () => {
  return (
    <View
      style={{
        paddingHorizontal: SIZES.font,
        paddingVertical: SIZES.base,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.light,
        elevation: 1,
        maxWidth: '50%',
        borderRadius: 10,
      }}
    >
      <Text
        style={{
          fontFamily: FONTS.regular,
          fontSize: SIZES.small,
          color: COLORS.black,
        }}
      >
        2345
      </Text>
    </View>
  );
};
export const Complexity = ({ complexity }) => {
  let complexteyRating;
  if (complexity <= 1.5) {
    complexteyRating = 'easy';
  } else if (complexity > 1.5 && complexity <= 2.5) {
    complexteyRating = 'medium';
  } else if (complexity > 2.5) {
    complexteyRating = 'hard';
  }
  return (
    <View
      style={{
        paddingHorizontal: SIZES.font,
        paddingVertical: SIZES.base,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.light,
        elevation: 1,
        maxWidth: '50%',
        borderRadius: 10,
      }}
    >
      <Text
        style={{
          fontFamily: FONTS.regular,
          fontSize: SIZES.small,
          color: COLORS.black,
        }}
      >
        {complexteyRating}
      </Text>
    </View>
  );
};

export const Category = () => {
  return (
    <View>
      <Text>Category</Text>
    </View>
  );
};

export const Tags = ({ tags }) => {
  const tagsArr = tags ? tags.split(',') : '';

  return (
    <View>
      {tags
        ? tagsArr.map((tag) => (
            <Text style={{ fontFamily: FONTS.medium, fontSize: SIZES.font }}>
              # {tag}
            </Text>
          ))
        : ''}
      <ReadMoreBtn
        minWidth={120}
        fontSize={SIZES.font}
        handlePress={() => navigation.navigate('Details', { data })}
      />
    </View>
  );
};

export const Alcoholic = () => {
  return (
    <View>
      <Text>Alcoholic</Text>
    </View>
  );
};

export const Instructions = () => {
  return (
    <View>
      <Text>Instructions</Text>
    </View>
  );
};
export const Ingredients = () => {
  return (
    <View>
      <Text>Ingredients</Text>
    </View>
  );
};
export const Measures = () => {
  return (
    <View>
      <Text>Measures</Text>
    </View>
  );
};
