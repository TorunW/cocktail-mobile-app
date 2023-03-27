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

export const Category = ({ category }) => {
  return (
    <View>
      <Text>{category}</Text>
    </View>
  );
};

export const Tags = ({ tags, justifyContent, width }) => {
  const tagsArr = tags ? tags.split(',') : '';

  return (
    <View style={{ justifyContent: justifyContent, width: width }}>
      {tags
        ? tagsArr.map((tag) => (
            <Text
              key={tag}
              style={{ fontFamily: FONTS.medium, fontSize: SIZES.font }}
            >
              # {tag}
            </Text>
          ))
        : ''}
    </View>
  );
};

export const Alcoholic = ({ alcoholic }) => {
  let alcDisplay;
  if (alcoholic === 'Alcoholic') {
    alcDisplay = 'Yes';
  } else if (alcoholic === 'Non alcoholic') {
    alcDisplay = 'No';
  } else if (alcoholic === 'Optional alcohol') {
    alcDisplay = 'Optional';
  }
  return (
    <View>
      <Text>Alcohol: {alcDisplay}</Text>
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
export const Ingredients = ({ ingredient }) => {
  return (
    <View>
      <Text> {ingredient} </Text>
    </View>
  );
};
export const Measures = ({ measure }) => {
  return (
    <View>
      <Text>{measure}</Text>
    </View>
  );
};
