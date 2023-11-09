import React, {PropsWithChildren} from 'react';
import {
  border,
  BorderProps,
  composeRestyleFunctions,
  spacing,
  SpacingProps,
  useRestyle,
} from '@shopify/restyle';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, Theme} from '../theme';

type RestyleProps = SpacingProps<Theme> & BorderProps<Theme>;

const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([
  spacing,
  border,
]);

const GradientContainer: React.FC<PropsWithChildren<RestyleProps>> = ({
  children,
  ...rest
}) => {
  const props = useRestyle(restyleFunctions, rest);
  return (
    <LinearGradient
      colors={[COLORS.primaryBlack, COLORS.darkGrey]}
      end={{x: 0, y: 0}}
      start={{x: 1, y: 1}}
      {...props}>
      {children}
    </LinearGradient>
  );
};
export default GradientContainer;
