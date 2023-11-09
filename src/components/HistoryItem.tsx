import React from 'react';
import {Image} from 'react-native';
import Box from './Box';
import Text from './Text';
import GradientContainer from './GradientContainer';
import {Order} from '../../types';
import {FONT_FAMILY, FONT_SIZE} from '../theme';

interface HistoryItemProps {
  data: Order;
}

const HistoryItem: React.FC<HistoryItemProps> = ({data}) => {
  const cartList = Object.values(data.cart);

  const renderLineItem = (
    name: string,
    item: {quantity: number; price: string},
  ) => {
    return (
      <Box flexDirection="row" alignItems="center" pr="spacing_8" key={name}>
        <Box
          height={35}
          width={56}
          borderTopLeftRadius={'radius_10'}
          borderBottomLeftRadius={'radius_10'}
          backgroundColor="primaryBlack"
          justifyContent="center"
          alignItems="center"
          borderEndWidth={1}
          borderColor="darkGrey">
          <Text fontFamily={FONT_FAMILY.medium} fontSize={FONT_SIZE.font_12}>
            {name}
          </Text>
        </Box>
        <Box
          height={35}
          width={85}
          borderTopRightRadius={'radius_10'}
          borderBottomRightRadius={'radius_10'}
          backgroundColor="primaryBlack"
          justifyContent="center"
          alignItems="center">
          <Text
            fontFamily={FONT_FAMILY.semiBold}
            fontSize={FONT_SIZE.font_16}
            color="primaryOrange">
            ${' '}
            <Text
              fontFamily={FONT_FAMILY.semiBold}
              fontSize={FONT_SIZE.font_16}>
              {Number(item.price) * item.quantity}
            </Text>
          </Text>
        </Box>
        <Text
          fontFamily={FONT_FAMILY.semiBold}
          fontSize={FONT_SIZE.font_16}
          color="primaryOrange"
          ml="spacing_30">
          X{' '}
          <Text fontFamily={FONT_FAMILY.semiBold} fontSize={FONT_SIZE.font_16}>
            {item.quantity}
          </Text>
        </Text>
        <Text
          fontFamily={FONT_FAMILY.semiBold}
          fontSize={FONT_SIZE.font_16}
          color="primaryOrange"
          textAlign="right"
          style={{flex: 1}}>
          {Number(item.price) * item.quantity}
        </Text>
      </Box>
    );
  };

  return (
    <Box>
      <Box flexDirection="row" justifyContent="space-between" mb="spacing_8">
        <Box>
          <Text
            fontFamily={FONT_FAMILY.semiBold}
            fontSize={FONT_SIZE.font_14}
            color="primaryWhite">
            Order Date
          </Text>
          <Text
            fontFamily={FONT_FAMILY.light}
            fontSize={FONT_SIZE.font_14}
            color="primaryWhite">
            {data.date}
          </Text>
        </Box>
        <Box alignItems="flex-end">
          <Text
            fontFamily={FONT_FAMILY.semiBold}
            fontSize={FONT_SIZE.font_14}
            color="primaryWhite">
            Total amount
          </Text>
          <Text
            fontFamily={FONT_FAMILY.light}
            fontSize={FONT_SIZE.font_14}
            color="primaryOrange">
            {`$ ${data.total}`}
          </Text>
        </Box>
      </Box>
      <Box gap="spacing_20">
        {cartList.map(cart => {
          const items = Object.values(cart.order);
          return (
            <GradientContainer
              borderRadius="radius_24"
              paddingTop="spacing_12"
              paddingLeft="spacing_18"
              paddingBottom="spacing_18"
              paddingRight="spacing_20">
              <Box>
                <Box
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                  mb="spacing_12">
                  <Image
                    source={cart.item.imagelink_square}
                    style={{width: 60, height: 60}}
                    borderRadius={14}
                  />
                  <Box flex={1} ml={'spacing_20'}>
                    <Text fontSize={FONT_SIZE.font_16}>{cart.item.name}</Text>
                    <Text fontSize={FONT_SIZE.font_10}>
                      {cart.item.special_ingredient}
                    </Text>
                  </Box>
                  <Text
                    fontFamily={FONT_FAMILY.semiBold}
                    fontSize={FONT_SIZE.font_20}
                    color="primaryOrange">
                    ${' '}
                    <Text
                      fontFamily={FONT_FAMILY.semiBold}
                      fontSize={FONT_SIZE.font_20}
                      color={'primaryWhite'}>
                      {items
                        .reduce(
                          (acc, item) =>
                            acc + item.quantity * Number(item.price),
                          0,
                        )
                        .toFixed(2)}
                    </Text>
                  </Text>
                </Box>
                <Box gap="spacing_12">
                  {items.map((item, index) =>
                    renderLineItem(Object.keys(cart.order)[index], item),
                  )}
                </Box>
              </Box>
            </GradientContainer>
          );
        })}
      </Box>
    </Box>
  );
};

export default HistoryItem;
