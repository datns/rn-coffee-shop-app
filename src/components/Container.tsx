import React, {PropsWithChildren} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import theme, {SPACING} from '../theme';

interface ContainerProps extends PropsWithChildren {}
const Container: React.FC<ContainerProps> = ({children}) => {
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      {children}
    </SafeAreaView>
  );
};

export default Container;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primaryBlack,
    paddingTop: SPACING.spacing_12,
    flex: 1,
  },
});
