import { View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { COLORS, SIZES, SHADOWS, assets, FONTS } from '../constants';

const ImageCard = ({ data }) => {
  const navigation = useNavigation();

  let complexityDisplay;
  if (data.complexity < 1.5) {
    complexityDisplay = 'easy';
  }

  return (
    <View
      style={{
        backgroundColor: COLORS.apricot,
        borderRadius: 10,
        margin: 16,
        ...SHADOWS.dark,
      }}
    >
      <View style={{ width: '100%', height: 250 }}>
        <Image
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 10,
          }}
          source={{ uri: data.strDrinkThumb }}
        />
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}
        >
          <Text
            style={{
              color: COLORS.snow,
              fontSize: SIZES.extraLarge,
              fontWeight: '900',
            }}
          >
            {data.strDrink}
          </Text>
          <Text
            style={{
              color: COLORS.snow,
              fontSize: SIZES.small,
              fontWeight: '900',
            }}
          >
            {data.complexity}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ImageCard;
