import React from 'react';
import {Image, StyleSheet} from 'react-native';
import Animated, {FadeInRight, FadeOutLeft} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import Box from './Box';
import Text from './Text';
import ButtonSquare from './ButtonSquare';
import {CartItem} from '../../types';
import {BORDER_RADIUS, COLORS, FONT_FAMILY, FONT_SIZE, SPACING} from '../theme';
import useStore from '../store';

interface CardCartItemProps {
  data: CartItem;
}

const CardCartItem: React.FC<CardCartItemProps> = ({data}) => {
  const {addCart, removeCart} = useStore();

  const onPlus = (updatedSize: string) => {
    const updatedItem = data.item.prices.find(
      item => item.size === updatedSize,
    );
    if (updatedItem) {
      addCart({
        item: data.item,
        price: updatedItem,
      });
    }
  };

  const renderSingleSize = () => {
    const orderInfo = Object.values(data.order)[0];
    const orderSize = Object.keys(data.order)[0];

    return (
      <Box flexDirection="row">
        <Box
          width={126}
          height={126}
          borderRadius="radius_10"
          backgroundColor="primaryOrange"
          overflow="hidden">
          <Image
            source={data.item.imagelink_square}
            style={{width: '100%', height: '100%'}}
            resizeMode="cover"
          />
        </Box>
        <Box pl="spacing_12">
          <Text fontSize={FONT_SIZE.font_16}>{data.item.name}</Text>
          <Text fontSize={FONT_SIZE.font_10} color={'lightGrey'}>
            {data.item.special_ingredient}
          </Text>
          <Box flexDirection="row" mt={'spacing_8'} alignItems="center">
            <Box
              py="spacing_8"
              width={70}
              alignItems="center"
              backgroundColor="primaryBlack"
              borderRadius="radius_10">
              <Text
                fontFamily={FONT_FAMILY.medium}
                fontSize={FONT_SIZE.font_14}>
                {Object.keys(data.order)[0]}
              </Text>
            </Box>
            <Text
              fontFamily={FONT_FAMILY.semiBold}
              fontSize={FONT_SIZE.font_20}
              color="primaryOrange"
              ml="spacing_24">
              ${' '}
              <Text
                color={'primaryWhite'}
                fontFamily={FONT_FAMILY.semiBold}
                fontSize={FONT_SIZE.font_20}>
                {(Number(orderInfo.price) * orderInfo.quantity).toFixed(2)}
              </Text>
            </Text>
          </Box>
          <Box flexDirection="row" mt="spacing_8">
            <ButtonSquare
              iconName="minus"
              onPress={() => removeCart({id: data.item.id, size: orderSize})}
              iconSize={2}
            />
            <Box
              width={50}
              height={30}
              borderWidth={1}
              borderColor="primaryOrange"
              justifyContent={'center'}
              alignItems="center"
              borderRadius="radius_8"
              mx={'spacing_24'}>
              <Text
                fontFamily={FONT_FAMILY.semiBold}
                fontSize={FONT_SIZE.font_16}>
                {orderInfo.quantity}
              </Text>
            </Box>
            <ButtonSquare iconName="plus" onPress={() => onPlus(orderSize)} />
          </Box>
        </Box>
      </Box>
    );
  };

  const renderMultipleSize = () => {
    return (
      <Box pl="spacing_4" pr="spacing_16">
        <Box flexDirection="row">
          <Box
            width={100}
            height={100}
            borderRadius="radius_10"
            backgroundColor="primaryOrange"
            overflow="hidden">
            <Image
              source={data.item.imagelink_square}
              style={{width: '100%', height: '100%'}}
              resizeMode="cover"
            />
          </Box>
          <Box pl="spacing_12" justifyContent="space-between">
            <Box>
              <Text fontSize={FONT_SIZE.font_16}>{data.item.name}</Text>
              <Text fontSize={FONT_SIZE.font_10} color={'lightGrey'}>
                {data.item.special_ingredient}
              </Text>
            </Box>
            <Box
              height={40}
              px="spacing_16"
              borderRadius="radius_10"
              backgroundColor="secondBlack"
              justifyContent={'center'}
              alignItems="center">
              <Text
                fontFamily={FONT_FAMILY.medium}
                fontSize={FONT_SIZE.font_10}
                color="lightGrey">
                {data.item.roasted}
              </Text>
            </Box>
          </Box>
        </Box>
        <Box mt="spacing_12" gap="spacing_8">
          {Object.values(data.order).map((item, index) => {
            const selectedSize = Object.keys(data.order)[index];
            return (
              <Box key={index} flexDirection="row" alignItems="center">
                <Box
                  py="spacing_8"
                  width={70}
                  alignItems="center"
                  backgroundColor="primaryBlack"
                  borderRadius="radius_10">
                  <Text
                    fontFamily={FONT_FAMILY.medium}
                    fontSize={FONT_SIZE.font_14}>
                    {selectedSize}
                  </Text>
                </Box>
                <Box flex={1}>
                  <Text
                    fontFamily={FONT_FAMILY.semiBold}
                    fontSize={FONT_SIZE.font_16}
                    color="primaryOrange"
                    mx="spacing_16">
                    ${' '}
                    <Text
                      color={'primaryWhite'}
                      fontFamily={FONT_FAMILY.semiBold}
                      fontSize={FONT_SIZE.font_16}>
                      {Number(item.price) * item.quantity}
                    </Text>
                  </Text>
                </Box>
                <ButtonSquare
                  iconName="minus"
                  onPress={() =>
                    removeCart({
                      id: data.item.id,
                      size: selectedSize,
                    })
                  }
                  iconSize={2}
                />
                <Box
                  width={50}
                  height={30}
                  borderWidth={1}
                  borderColor="primaryOrange"
                  justifyContent={'center'}
                  alignItems="center"
                  borderRadius="radius_8"
                  mx={'spacing_16'}>
                  <Text
                    fontFamily={FONT_FAMILY.semiBold}
                    fontSize={FONT_SIZE.font_16}>
                    {item.quantity}
                  </Text>
                </Box>
                <ButtonSquare
                  iconName="plus"
                  onPress={() => onPlus(selectedSize)}
                />
              </Box>
            );
          })}
        </Box>
      </Box>
    );
  };

  return (
    <Animated.View entering={FadeInRight} exiting={FadeOutLeft}>
      <LinearGradient
        colors={[COLORS.primaryBlack, COLORS.darkGrey]}
        end={{x: 0, y: 0}}
        start={{x: 1, y: 1}}
        style={styles.container}>
        {Object.keys(data.order).length > 1
          ? renderMultipleSize()
          : renderSingleSize()}
      </LinearGradient>
    </Animated.View>
  );
};

export default CardCartItem;

const styles = StyleSheet.create({
  container: {
    paddingTop: SPACING.spacing_12,
    paddingLeft: SPACING.spacing_12,
    paddingBottom: SPACING.spacing_16,
    borderRadius: BORDER_RADIUS.radius_24,
  },
});
