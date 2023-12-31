import React, {useMemo} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TabParamList} from './types';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import HistoryScreen from '../screens/HistoryScreen';
import CustomIcon from '../components/CustomIcon';
import {BlurView} from '@react-native-community/blur';
import {StyleSheet} from 'react-native';
import theme, {COLORS, FONT_SIZE} from '../theme';
import useStore from '../store';

const Tab = createBottomTabNavigator<TabParamList>();

const TabBarIcon = (props: {name: string; focused: boolean}) => {
  return (
    <CustomIcon
      name={props.name}
      size={25}
      color={props.focused ? theme.colors.primaryOrange : theme.colors.darkGrey}
    />
  );
};

const TabNavigator = () => {
  const {cart} = useStore();

  const quantity = useMemo(() => {
    return Object.values(cart).reduce((acc, item) => {
      const sum = Object.values(item.order).reduce((accOrder, itemOrder) => {
        return accOrder + itemOrder.quantity;
      }, 0);
      return sum + acc;
    }, 0);
  }, [cart]);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: styles.tabBarStyle,
        headerShown: false,
        tabBarBackground: () => (
          <BlurView overlayColor="" blurAmount={5} style={styles.blurView} />
        ),
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <TabBarIcon name="home" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <TabBarIcon name="cart" focused={focused} />
          ),
          tabBarBadge: quantity > 0 ? quantity : undefined,
          tabBarBadgeStyle: {
            backgroundColor: COLORS.primaryRed,
            fontSize: FONT_SIZE.font_14,
          },
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <TabBarIcon name="heart" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <TabBarIcon name="bell" focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 80,
    position: 'absolute',
    backgroundColor: theme.colors.primaryBlackRGBA,
    borderTopWidth: 0,
    elevation: 0,
    borderTopColor: 'transparent',
  },
  blurView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
