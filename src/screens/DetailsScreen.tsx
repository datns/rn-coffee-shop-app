import React, {useState} from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Animated from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Box from '../components/Box';
import GradientIcon from '../components/GradientIcon';
import Text from '../components/Text';
import CustomIcon from '../components/CustomIcon';
import AddToCart from '../components/AddToCart';

import useStore from '../store';
import {MainParamList} from '../navigators/types';
import {Price} from '../../types';
import {BORDER_RADIUS, COLORS, FONT_SIZE, SPACING} from '../theme';

type DetailsScreenProps = NativeStackScreenProps<MainParamList, 'Details'>;

const DetailsScreen: React.FC<DetailsScreenProps> = ({route, navigation}) => {
  const inset = useSafeAreaInsets();
  const {id, type} = route.params;
  const {coffeeList, beanList} = useStore();
  const selectedList = type === 'Coffee' ? coffeeList : beanList;
  const selectedItem = selectedList.find(item => item.id === id);
  const [selectedPrice, setSelectedPrice] = useState<Price | undefined>(
    selectedItem?.prices[0],
  );

  if (!selectedItem) {
    return null;
  }

  const renderHeaderInfo = () => {
    return (
      <Box
        position="absolute"
        bottom={0}
        right={0}
        left={0}
        borderTopRightRadius="radius_10"
        borderTopLeftRadius="radius_10"
        backgroundColor="primaryBlackRGBA"
        paddingHorizontal="spacing_24"
        pb="spacing_18"
        justifyContent="space-between"
        flexDirection="row">
        <Box paddingTop="spacing_30" flex={1}>
          <Text variant="text_20" color="primaryWhite">
            {selectedItem.name}
          </Text>
          <Text color="lightGrey" fontSize={12}>
            {selectedItem.special_ingredient}
          </Text>
          <Box
            marginTop="spacing_24"
            flexDirection="row"
            alignItems="center"
            gap="spacing_8">
            <CustomIcon
              name="star"
              color={COLORS.primaryOrange}
              size={FONT_SIZE.font_20}
            />
            <Text variant="text_16" color="primaryWhite">
              {selectedItem.average_rating}
            </Text>
            <Text
              color="lightGrey"
              fontSize={12}>{`(${selectedItem.ratings_count})`}</Text>
          </Box>
        </Box>
        <Box paddingTop="spacing_18">
          <Box flexDirection="row">
            <Box
              style={styles.properContainer}
              width={56}
              height={56}
              marginRight={'spacing_20'}>
              <CustomIcon
                name={type === 'Coffee' ? 'beans' : 'bean'}
                color={COLORS.primaryOrange}
                size={24}
              />
              <Text fontSize={10} fontFamily="Poppins-Medium" color="lightGrey">
                {selectedItem.type}
              </Text>
            </Box>
            <Box style={styles.properContainer} width={56} height={56}>
              <CustomIcon
                name={type === 'Coffee' ? 'drop' : 'location'}
                color={COLORS.primaryOrange}
                size={20}
              />
              <Text
                fontSize={10}
                fontFamily="Poppins-Medium"
                color="lightGrey"
                mt="spacing_4">
                {selectedItem.ingredients}
              </Text>
            </Box>
          </Box>
          <Box
            style={styles.properContainer}
            px="spacing_18"
            height={45}
            mt="spacing_12">
            <Text
              fontSize={10}
              fontFamily="Poppins-Medium"
              color="lightGrey"
              mt="spacing_4">
              {selectedItem.roasted}
            </Text>
          </Box>
        </Box>
        <Box />
      </Box>
    );
  };

  const renderSizeSection = () => {
    return (
      <>
        <Text variant="text_14" color="lightGrey" mt="spacing_30">
          Sizes
        </Text>
        <Box flexDirection="row" mt="spacing_12" justifyContent="space-between">
          {selectedItem.prices.map(item => {
            const onPress = () => setSelectedPrice(item);
            const isSelected = selectedPrice?.size === item.size;

            return (
              <TouchableOpacity key={item.size} onPress={onPress}>
                <Box
                  width={100}
                  py="spacing_8"
                  borderRadius="radius_10"
                  borderWidth={2}
                  borderColor={isSelected ? 'primaryOrange' : 'secondBlack'}
                  alignItems="center"
                  backgroundColor="secondBlack">
                  <Text
                    variant="text_16"
                    color={isSelected ? 'primaryOrange' : 'lightGrey'}
                    fontFamily="Poppins-Medium">
                    {item.size}
                  </Text>
                </Box>
              </TouchableOpacity>
            );
          })}
        </Box>
      </>
    );
  };

  return (
    <ScrollView
      style={{backgroundColor: COLORS.primaryBlack}}
      contentContainerStyle={{
        paddingBottom: SPACING.spacing_36,
      }}>
      <Box>
        <Animated.Image
          source={selectedItem?.imagelink_portrait}
          style={styles.imageBackground}
          resizeMode="cover"
        />
        <Box
          position="absolute"
          top={inset.top}
          paddingHorizontal={'spacing_30'}
          flexDirection="row"
          justifyContent="space-between"
          width="100%">
          <GradientIcon name="back" onPress={() => navigation.goBack()} />
          <GradientIcon
            name="heart"
            color={COLORS.primaryRed}
            size={FONT_SIZE.font_14}
          />
        </Box>
        {renderHeaderInfo()}
      </Box>
      <Box px="spacing_20">
        <Text
          mt="spacing_20"
          variant="text_14"
          color="lightGrey"
          mb="spacing_12">
          Description
        </Text>
        <Text color="primaryWhite" lineHeight={20}>
          {selectedItem.description}
        </Text>
        {renderSizeSection()}
        {selectedPrice && (
          <AddToCart price={selectedPrice} item={selectedItem} />
        )}
      </Box>
    </ScrollView>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  imageBackground: {
    width: Dimensions.get('window').width,
    aspectRatio: 20 / 25,
    height: 'auto',
  },
  properContainer: {
    backgroundColor: COLORS.secondBlack,
    borderRadius: BORDER_RADIUS.radius_8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
