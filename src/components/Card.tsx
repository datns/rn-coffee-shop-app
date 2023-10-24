import React from 'react';
import {Coffee} from '../../types';
import Box from './Box';
import LinearGradient from 'react-native-linear-gradient';
import Text from './Text';
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {BORDER_RADIUS, COLORS, FONT_SIZE, SPACING} from '../theme';
import CustomIcon from './CustomIcon';

interface CardProps {
  data: Coffee;
}

export const CARD_WIDTH = 150;
const Card: React.FC<CardProps> = ({data}) => {
  return (
    <LinearGradient
      colors={[COLORS.primaryBlack, COLORS.darkGrey]}
      end={{x: 0, y: 0}}
      start={{x: 1, y: 1}}
      style={styles.container}>
      <ImageBackground
        source={data.imagelink_square}
        style={styles.image}
        resizeMode="cover">
        <Box
          borderBottomLeftRadius={'radius_20'}
          borderTopRightRadius={'radius_20'}
          backgroundColor="primaryBlackRGBA"
          position="absolute"
          top={0}
          right={0}
          paddingHorizontal="spacing_12"
          flexDirection="row"
          justifyContent="center"
          alignItems="center">
          <CustomIcon name="star" color={COLORS.primaryOrange} size={8} />
          <Text
            variant="text_10"
            marginLeft="spacing_4"
            color={'primaryWhite'}
            fontFamily="Poppins-SemiBold">
            {data.average_rating}
          </Text>
        </Box>
      </ImageBackground>
      <Text variant="text_16" marginTop="spacing_12">
        {data.name}
      </Text>
      <Text variant="text_10">{data.special_ingredient}</Text>
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        marginTop="spacing_8"
        marginBottom="spacing_18">
        <Text variant="text_18" color="primaryOrange">
          ${' '}
          <Text variant="text_18" color="primaryWhite">
            {data.prices[1].price}
          </Text>
        </Text>
        <TouchableOpacity onPress={() => console.log('press')}>
          <Box
            backgroundColor="primaryOrange"
            width={SPACING.spacing_30}
            height={SPACING.spacing_30}
            borderRadius="radius_8"
            justifyContent="center"
            alignItems="center">
            <CustomIcon name="plus" size={10} color={COLORS.primaryWhite} />
          </Box>
        </TouchableOpacity>
      </Box>
    </LinearGradient>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    padding: SPACING.spacing_12,
    borderRadius: BORDER_RADIUS.radius_24,
    width: CARD_WIDTH,
    height: 250,
  },
  image: {
    borderRadius: BORDER_RADIUS.radius_20,
    width: 126,
    height: 126,
    overflow: 'hidden',
  },
});
