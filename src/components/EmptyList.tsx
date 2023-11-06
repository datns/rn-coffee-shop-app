import {StyleSheet, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import Text from './Text';
import {FONT_FAMILY, FONT_SIZE} from '../theme';

interface EmptyListAnimationProps {
  title: string;
}

const EmptyList: React.FC<EmptyListAnimationProps> = ({title}) => {
  return (
    <View style={styles.container}>
      <LottieView
        style={styles.lottie}
        source={require('../assets/lotties/coffeecup.json')}
        autoPlay
        loop
      />
      <Text
        fontFamily={FONT_FAMILY.medium}
        fontSize={FONT_SIZE.font_16}
        color={'primaryOrange'}
        textAlign="center">
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  lottie: {
    height: 300,
  },
});

export default EmptyList;
