import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomIcon from './CustomIcon';
import {BORDER_RADIUS, COLORS, FONT_SIZE, SPACING} from '../theme';

interface GradientIconProps {
  name: string;
  size?: number;
  color?: string;
  onPress?: () => void;
}

const GradientIcon: React.FC<GradientIconProps> = ({
  name,
  size = FONT_SIZE.font_16,
  color = COLORS.mediumGrey,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={[COLORS.primaryBlack, COLORS.darkGrey]}
        style={styles.container}
        end={{x: 0, y: 0}}
        start={{x: 1, y: 1}}>
        <CustomIcon name={name} size={size} color={color} />
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default GradientIcon;

const styles = StyleSheet.create({
  container: {
    padding: SPACING.spacing_8,
    borderRadius: BORDER_RADIUS.radius_10,
    borderWidth: 1,
    borderColor: '#21262E',
    width: 33,
    height: 33,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
