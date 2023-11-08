import React from 'react';
import {Coffee} from '../../types';
import Box from './Box';
import ThumbnailInfo from './ThumbnailInfo';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, FONT_FAMILY, FONT_SIZE, SPACING} from '../theme';
import Text from './Text';
import {StyleSheet} from 'react-native';
import GradientIcon from './GradientIcon';

interface FavoriteItemProps {
  data: Coffee;
}

const FavoriteItem: React.FC<FavoriteItemProps> = ({data}) => {
  return (
    <Box width="100%" borderRadius="radius_24" overflow="hidden">
      <ThumbnailInfo data={data} />
      <Box position="absolute" right={20} top={26}>
        <GradientIcon
          name="heart"
          color={COLORS.primaryRed}
          size={FONT_SIZE.font_14}
        />
      </Box>
      <LinearGradient
        colors={[COLORS.primaryBlack, COLORS.darkGrey]}
        end={{x: 0, y: 0}}
        start={{x: 1, y: 1}}
        style={styles.container}>
        <Text
          fontFamily={FONT_FAMILY.semiBold}
          fontSize={FONT_SIZE.font_14}
          color="lightGrey">
          Description
        </Text>
        <Text fontSize={FONT_SIZE.font_12}>{data.description}</Text>
      </LinearGradient>
    </Box>
  );
};

export default FavoriteItem;

const styles = StyleSheet.create({
  container: {
    paddingLeft: SPACING.spacing_30,
    paddingRight: SPACING.spacing_18,
    paddingTop: SPACING.spacing_12,
    paddingBottom: SPACING.spacing_18,
  },
});
