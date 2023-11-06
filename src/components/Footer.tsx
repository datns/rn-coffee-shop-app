import React from 'react';
import Box from './Box';
import Text from './Text';
import Button from './Button';

interface FooterProps {
  label: string;
  buttonLabel: string;
  price: string;
  onPress: () => void;
}

const Footer: React.FC<FooterProps> = ({
  label,
  buttonLabel,
  price,
  onPress,
}) => {
  return (
    <Box
      mt="spacing_30"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="flex-end"
      gap="spacing_36">
      <Box>
        <Text color="lightGrey" fontFamily="Poppins-Medium" textAlign="center">
          {label}
        </Text>
        <Text variant="text_20" color="primaryOrange">
          ${' '}
          <Text variant="text_20" color="primaryWhite">
            {price}
          </Text>
        </Text>
      </Box>
      <Button label={buttonLabel} onPress={onPress} />
    </Box>
  );
};

export default Footer;
