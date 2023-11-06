import React, {PropsWithChildren} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from './Header';
import theme, {SPACING} from '../theme';

interface ContainerProps extends PropsWithChildren {
  screenName?: string;
}
const Container: React.FC<ContainerProps> = ({screenName, children}) => {
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <Header screenName={screenName} />
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
