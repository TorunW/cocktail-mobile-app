import {
  View,
  Text,
  SafeAreaView,
  Image,
  StatusBar,
  FlatList,
} from 'react-native';
import React from 'react';
import { COLORS, FONTS, SIZES, SPACING, SHADOWS, assets } from '../constants';
import { Heart, BackBtn, FocusedStatusBar } from '../components';
import {
  Alcoholic,
  Category,
  Complexity,
  Ingredients,
  Likes,
  Measures,
  Tags,
  User,
} from '../components/SubInfo';
import getIngredientsArr from '../helpers/getIngredientsArr';
import getMeasurmentsArr from '../helpers/getMeasurmentsArr';
import { useStoreState } from 'easy-peasy';

export const DrinkPage = ({ route, navigation }) => {
  const { data } = route.params;
  const state = useStoreState((state) => state);

  const ingredientData = state.cocktails.ingredients;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusedStatusBar
        barStyle='dark-content'
        backgroundColor='transparent'
        translucent={true}
      />
      <View
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',

          backgroundColor: COLORS.white,
          alignItems: 'center',
        }}
      >
        <Image
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: COLORS.white,
            position: 'absolute',
            top: 0,
          }}
          source={{ uri: data.image }}
          resizeMode='cover'
          blurRadius={10}
        />
        <Image
          style={{
            width: '80%',
            height: '30%',
            backgroundColor: COLORS.white,
            borderRadius: 10,
            marginTop: 50,
          }}
          source={{ uri: data.image }}
          resizeMode='cover'
        />
        <Heart right={15} top={StatusBar.currentHeight + 10} />
        <BackBtn
          left={15}
          top={StatusBar.currentHeight + 10}
          handlePress={() => navigation.goBack()}
        />
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            height: '60%',
            backgroundColor: COLORS.white,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            marginHorizontal: 2,
            ...SHADOWS.box,
            width: '100%',
            paddingHorizontal: SIZES.font,
          }}
        >
          <View
            style={{
              width: '100%',
              flexDirection: 'column',
              marginVertical: SIZES.font,
              justifyContent: 'flex-start',
            }}
          >
            <Text style={{ fontFamily: FONTS.bold, fontSize: SIZES.large }}>
              {data.title}
            </Text>

            <Category category={data.strCategory} />
            <Alcoholic alcoholic={data.alcoholic} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Likes />
            <User user={data.creator} />
            <Complexity complexity={data.complexity} />
          </View>
          <Tags justifyContent={'flex-start'} width={'100%'} tags={'tags'} />

          <Text
            style={{
              marginVertical: SIZES.font,
              fontFamily: FONTS.medium,
              fontSize: SIZES.large,
            }}
          >
            Ingredients
          </Text>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
            }}
          >
            <View style={{ width: '50%' }}>
              {data.ingr !== undefined ? (
                <FlatList
                  data={data.ingr}
                  renderItem={({ item }) => {
                    const ingredientName = ingredientData.find((ing) =>
                      ing.id === item.id ? ing.name : ''
                    );
                    console.log(ingredientName.name);
                    return (
                      <View>
                        <Text>{ingredientName.name} </Text>
                      </View>
                    );
                  }}
                  keyExtractor={(item) => item.id}
                />
              ) : (
                <Text>No ingred</Text>
              )}
            </View>
            <View style={{ width: '50%' }}>
              <FlatList
                data={getMeasurmentsArr(data)}
                renderItem={({ item }) => <Measures measure={item} />}
              />
            </View>
          </View>

          <Text
            style={{
              marginVertical: SIZES.font,
              fontFamily: FONTS.medium,
              fontSize: SIZES.large,
            }}
          >
            Instructions
          </Text>
          <View>
            <Text>{data.instructions}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DrinkPage;
