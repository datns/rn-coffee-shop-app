import React, {useState} from 'react';
import {ScrollView, TouchableOpacity} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Box from '../components/Box';
import GradientIcon from '../components/GradientIcon';
import Text from '../components/Text';
import AddToCart from '../components/AddToCart';
import ThumbnailInfo from '../components/ThumbnailInfo';

import useStore from '../store';
import {MainParamList} from '../navigators/types';
import {Price} from '../../types';
import {COLORS, FONT_SIZE, SPACING} from '../theme';

type DetailsScreenProps = NativeStackScreenProps<MainParamList, 'Details'>;

const DetailsScreen: React.FC<DetailsScreenProps> = ({route, navigation}) => {
  const inset = useSafeAreaInsets();
  const {id, type} = route.params;
  const {coffeeList, beanList, toggleFavorite, favoritesList} = useStore();
  const selectedList = type === 'Coffee' ? coffeeList : beanList;
  const selectedItem = selectedList.find(item => item.id === id);
  const [selectedPrice, setSelectedPrice] = useState<Price | undefined>(
    selectedItem?.prices[0],
  );

  if (!selectedItem) {
    return null;
  }

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
        <ThumbnailInfo data={selectedItem} />
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
            color={
              favoritesList[selectedItem.id]
                ? COLORS.primaryRed
                : COLORS.mediumGrey
            }
            size={FONT_SIZE.font_14}
            onPress={() => toggleFavorite(selectedItem)}
          />
        </Box>
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
