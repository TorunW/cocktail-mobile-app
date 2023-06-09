import {
  View,
  Text,
  SafeAreaView,
  Image,
  StatusBar,
  FlatList,
} from 'react-native';
import React from 'react';
import { COLORS, FONTS, SIZES, SHADOWS } from '../constants';
import { Heart, BackBtn, FocusedStatusBar } from '../components';
import {
  Alcoholic,
  AverageRating,
  Category,
  Complexity,
  SavedRecipe,
  Tags,
} from '../components/SubInfo';
import { handlePressSavedRecipe } from '../helpers/handlePressSavedRecipe';
import RateDrink from '../components/RateDrink';

export const DrinkPage = ({ route, navigation }) => {
  const { data } = route.params;

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
            width: '80%',
            height: '30%',
            backgroundColor: COLORS.white,
            borderRadius: 10,
            marginTop: 50,
          }}
          source={{ uri: data.image }}
          resizeMode='cover'
        />
        <Heart
          right={15}
          top={StatusBar.currentHeight + 10}
          handlePress={() => handlePressSavedRecipe(itemData)}
        />
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
            <AverageRating
              totalPoints={data.totalPoints}
              totalVoters={data.totalVoters}
            />

            <RateDrink data={data} />
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
            <SavedRecipe />
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
              {data.ingredients !== undefined ? (
                <FlatList
                  data={data.ingredients}
                  renderItem={({ item }) => {
                    return (
                      <View>
                        <Text>{item.ingredient}</Text>
                        <Text>{item.measure}</Text>
                      </View>
                    );
                  }}
                  keyExtractor={(item) => item.ingredient}
                />
              ) : (
                <Text>error</Text>
              )}
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
