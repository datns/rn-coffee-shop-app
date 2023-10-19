import React from 'react';
import {View} from 'react-native';
import Container from '../components/Container';
import Text from '../components/Text';
import Box from '../components/Box';

const HomeScreen = () => {
  return (
    <Container>
      <Box paddingTop="spacing_30" paddingHorizontal="spacing_30">
        <Text variant="text_1" color="primaryWhite">
          {'Find the best\ncoffee for you'}
        </Text>
      </Box>
    </Container>
  );
};

export default HomeScreen;
