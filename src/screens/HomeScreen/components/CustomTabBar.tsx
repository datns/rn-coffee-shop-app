import React from 'react';
import {StyleProp, StyleSheet, ViewStyle, Animated} from 'react-native';
import {
  Route,
  TabBar,
  NavigationState,
  SceneRendererProps,
} from 'react-native-tab-view';
import Text from '../../../components/Text';
import {COLORS, SPACING} from '../../../theme';

type CustomTabBarProps = SceneRendererProps & {
  navigationState: NavigationState<Route>;
};

const CustomTabBar: React.FC<CustomTabBarProps> = props => {
  const routes = props.navigationState.routes;

  const renderLabel = ({route, focused}: {route: Route; focused: boolean}) => {
    return (
      <Text variant="text_4" color={focused ? 'primaryOrange' : 'mediumGrey'}>
        {route.title}
      </Text>
    );
  };

  const renderIndicator = (
    params: SceneRendererProps & {
      navigationState: NavigationState<Route>;
      width: string | number;
      style?: StyleProp<ViewStyle>;
      getTabWidth: (i: number) => number;
    },
  ) => {
    const {getTabWidth, position} = params;
    const inputRange = routes.map((_, i) => i);

    const outputRange = routes.reduce<number[]>((acc, _, i) => {
      if (i === 0) {
        return [getTabWidth(i) / 2 - SPACING.spacing_8 / 2];
      }
      return [...acc, acc[i - 1] + getTabWidth(i - 1) / 2 + getTabWidth(i) / 2];
    }, []);

    const translateX = position.interpolate({
      inputRange: inputRange,
      outputRange: outputRange,
    });

    return (
      <Animated.View
        style={[
          styles.indicatorContainer,
          {
            transform: [
              {
                translateX,
              },
            ],
          },
        ]}
      />
    );
  };

  return (
    <TabBar
      {...props}
      renderLabel={renderLabel}
      tabStyle={styles.tabItem}
      style={{backgroundColor: COLORS.primaryBlack}}
      scrollEnabled
      bounces={false}
      renderIndicator={renderIndicator}
      // contentContainerStyle={{ marginHorizontal: SPACING.spacing_30 }}
    />
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({
  tabItem: {
    padding: SPACING.spacing_8,
    width: 'auto',
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 0,
    borderRadius: SPACING.spacing_8 / 2,
    height: SPACING.spacing_8,
    width: SPACING.spacing_8,
    backgroundColor: COLORS.primaryOrange,
  },
});
