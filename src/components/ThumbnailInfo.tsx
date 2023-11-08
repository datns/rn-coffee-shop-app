import React from 'react';
import {StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';
import Box from './Box';
import Text from './Text';
import CustomIcon from './CustomIcon';
import {Coffee} from '../../types';
import {BORDER_RADIUS, COLORS, FONT_SIZE} from '../theme';

interface ThumbnailInfo {
  data: Coffee;
}

const ThumbnailInfo: React.FC<ThumbnailInfo> = ({data}) => {
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
            {data.name}
          </Text>
          <Text color="lightGrey" fontSize={12}>
            {data.special_ingredient}
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
              {data.average_rating}
            </Text>
            <Text
              color="lightGrey"
              fontSize={12}>{`(${data.ratings_count})`}</Text>
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
                name={data.type === 'Coffee' ? 'beans' : 'bean'}
                color={COLORS.primaryOrange}
                size={24}
              />
              <Text fontSize={10} fontFamily="Poppins-Medium" color="lightGrey">
                {data.type}
              </Text>
            </Box>
            <Box style={styles.properContainer} width={56} height={56}>
              <CustomIcon
                name={data.type === 'Coffee' ? 'drop' : 'location'}
                color={COLORS.primaryOrange}
                size={20}
              />
              <Text
                fontSize={10}
                fontFamily="Poppins-Medium"
                color="lightGrey"
                mt="spacing_4">
                {data.ingredients}
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
              {data.roasted}
            </Text>
          </Box>
        </Box>
        <Box />
      </Box>
    );
  };

  return (
    <Box>
      <Animated.Image
        source={data.imagelink_portrait}
        style={styles.imageBackground}
        resizeMode="cover"
      />
      {renderHeaderInfo()}
    </Box>
  );
};

export default ThumbnailInfo;

const styles = StyleSheet.create({
  imageBackground: {
    width: '100%',
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
