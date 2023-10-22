import { View, Text } from 'react-native';
import React from 'react';
import { Alcohol, NoAlcohol } from '../assets/icons/Icon';
import StarRating from 'react-native-star-rating-widget';
import { COLORS, SIZES, SPACING } from '../constants';
import Easy from '../assets/icons/Easy.svg';
import Middle from '../assets/icons/Middle.svg';
import Hard from '../assets/icons/Hard.svg';

export const Title = ({ title, style }) => {
  return <Text style={style}>{title}</Text>;
};

export const Description = ({ description, style }) => {
  return <Text style={style}>{description}</Text>;
};
export const SavedRecipe = ({ savedRecipe, style }) => {
  return <Text style={style}>{savedRecipe}</Text>;
};

export const Alcoholic = ({ alcoholic, size, textStyle, color }) => {
  let alcDisplay;
  if (alcoholic === true) {
    alcDisplay = (
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          gap: SPACING.xs,
        }}
      >
        <Alcohol size={size} color={color} />
        <Text style={textStyle}>Alcoholic</Text>
      </View>
    );
  } else if (alcoholic === false) {
    alcDisplay = (
      <View>
        <NoAlcohol size={size} color={color} />
        <Text style={textStyle}>Non alcoholic</Text>
      </View>
    );
  }
  return <>{alcDisplay}</>;
};

export const Creator = ({ creator, style }) => {
  return (
    <View style={{ flexDirection: 'row', gap: SPACING.xs }}>
      <Text style={style}>Recipe by:</Text>
      <Text style={style}>{creator}</Text>
    </View>
  );
};

export const Complexity = ({ complexity, textStyle }) => {
  let complexityRating;
  if (complexity <= 6) {
    complexityRating = (
      <>
        <Easy size={SIZES.icon} height={SIZES.icon} color={COLORS.black2} />
        <Text style={textStyle}>Easy</Text>
      </>
    );
  } else if (complexity > 6 && complexity <= 9) {
    complexityRating = (
      <>
        <Middle size={SIZES.icon} height={SIZES.icon} color={COLORS.black2} />
        <Text style={textStyle}>Middle</Text>
      </>
    );
  } else if (complexity >= 9) {
    complexityRating = (
      <>
        <Hard size={SIZES.icon} color={COLORS.black2} />
        <Text style={textStyle}>Hard</Text>
      </>
    );
  }

  return (
    <View style={{ flexDirection: 'column', gap: SPACING.xs }}>
      {complexityRating}
    </View>
  );
};

export const AverageRating = ({ totalPoints, starSize, textStyle }) => {
  const calcTotalVotes =
    totalPoints !== undefined
      ? totalPoints.one +
        totalPoints.two +
        totalPoints.three +
        totalPoints.four +
        totalPoints.five
      : 0;

  let calcAverage;
  if (totalPoints !== undefined) {
    const calcTotal =
      totalPoints.one * 1 +
      totalPoints.two * 2 +
      totalPoints.three * 3 +
      totalPoints.four * 4 +
      totalPoints.five * 5;
    calcAverage = calcTotal / calcTotalVotes;
  }
  animationConfig = {
    scale: 1,
  };
  return (
    <View
      style={{ flexDirection: 'column', gap: SPACING.xs, alignItems: 'center' }}
    >
      <StarRating
        rating={calcAverage}
        enableHalfStar={true}
        starSize={starSize}
        color={COLORS.black2}
        onChange={() => {}}
        animationConfig={animationConfig}
      />
      <Text style={textStyle}>{`Rated by: ${calcTotalVotes} users`}</Text>
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
