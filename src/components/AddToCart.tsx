import React from 'react';
import Box from './Box';
import Text from './Text';
import Button from './Button';

interface AddToCartProps {
  price: string;
}
const AddToCart: React.FC<AddToCartProps> = ({price}) => {
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
            {price}
          </Text>
        </Text>
      </Box>
      <Button label="Add to cart" onPress={() => {}} />
    </Box>
  );
};

export default AddToCart;
