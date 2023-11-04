import React from 'react';
import Box from './Box';
import Text from './Text';
import Button from './Button';
import {Coffee, Price} from '../../types';
import useStore from '../store';

interface AddToCartProps {
  price: Price;
  item: Coffee;
}
const AddToCart: React.FC<AddToCartProps> = ({price, item}) => {
  const {addCart} = useStore();

  const onPress = () => {
    addCart({
      item,
      price,
    });
  };

  return (
    <Box
      mt="spacing_30"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="flex-end"
      gap="spacing_36">
      <Box>
        <Text color="lightGrey" fontFamily="Poppins-Medium" textAlign="center">
          Price
        </Text>
        <Text variant="text_20" color="primaryOrange">
          ${' '}
          <Text variant="text_20" color="primaryWhite">
            {price.price}
          </Text>
        </Text>
      </Box>
      <Button label="Add to cart" onPress={onPress} />
    </Box>
  );
};

export default AddToCart;
