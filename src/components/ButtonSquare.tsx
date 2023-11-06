import React from 'react';
import {TouchableOpacity} from 'react-native';
import CustomIcon from './CustomIcon';
import Box from './Box';
import {COLORS, SPACING} from '../theme';

interface ButtonSquareProps {
  iconName: string;
  onPress: () => void;
  iconSize?: number;
}

const ButtonSquare: React.FC<ButtonSquareProps> = ({
  iconName,
  onPress,
  iconSize = 10,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Box
        backgroundColor="primaryOrange"
        width={SPACING.spacing_30}
        height={SPACING.spacing_30}
        borderRadius="radius_8"
        justifyContent="center"
        alignItems="center">
        <CustomIcon
          name={iconName}
          size={iconSize}
          color={COLORS.primaryWhite}
        />
      </Box>
    </TouchableOpacity>
  );
};

export default ButtonSquare;
