import React, {PropsWithChildren} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from './Header';
import {StyleSheet} from 'react-native';
import theme from '../theme';

const Container: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      {/*<Header />*/}
      {children}
    </SafeAreaView>
  );
};

export default Container;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primaryBlack,
    flex: 1,
  },
});
