import React, {useState} from 'react';
import {
  FlatList,
  ListRenderItem,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import {Route, TabView} from 'react-native-tab-view';
import Text from '../../components/Text';
import Box from '../../components/Box';
import SearchBar from './components/SearchBar';
import Card from '../../components/Card';
import Header from '../../components/Header';
import CustomTabBar from './components/CustomTabBar';
import Tab from './components/Tab';
import CategoryData from '../../data/CategoryData';
import BeansData from '../../data/BeansData';
import {COLORS, SPACING} from '../../theme';
import {Coffee} from '../../../types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainParamList} from '../../navigators/types';
import Animated from 'react-native-reanimated';

const ROUTES = CategoryData.map(item => ({
  key: item.code,
  title: item.name,
}));

const HomeScreen: React.FC = () => {
  const layout = useWindowDimensions();
  const [tabIndex, setTabIndex] = useState<number>(0);

  const renderScene = ({route}: {route: Route}) => {
    return <Tab categoryCode={route.key} />;
  };

  const renderBeanItem: ListRenderItem<Coffee> = ({item}) => {
    return <Card data={item} />;
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={{backgroundColor: COLORS.primaryBlack}}
      showsVerticalScrollIndicator={false}>
      <Header />
      <Animated.View
        style={{width: 150, height: 150, backgroundColor: 'green'}}
        sharedTransitionTag="sharedTag"
      />
      <Box paddingTop="spacing_30" flex={1}>
        <Text variant="text_1" color="primaryWhite" marginLeft={'spacing_30'}>
          {'Find the best\ncoffee for you'}
        </Text>
        <Box
          paddingHorizontal={'spacing_30'}
          marginTop="spacing_30"
          marginBottom="spacing_24">
          <SearchBar />
        </Box>
        <TabView
          onIndexChange={setTabIndex}
          navigationState={{
            index: tabIndex,
            routes: ROUTES,
          }}
          style={styles.coffeeContainer}
          swipeEnabled={false}
          renderScene={renderScene}
          renderTabBar={props => <CustomTabBar {...props} />}
          initialLayout={{width: layout.width}}
        />

        {/*Coffee beans section*/}
        <Text
          color="primaryWhite"
          mt={'spacing_24'}
          ml="spacing_30"
          mb="spacing_24"
          variant="text_16">
          Coffee beans
        </Text>
        <FlatList
          data={BeansData}
          renderItem={renderBeanItem}
          horizontal
          contentContainerStyle={styles.beanContentContainer}
        />
      </Box>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 80 + SPACING.spacing_30,
    paddingTop: 44,
    backgroundColor: COLORS.primaryBlack,
  },
  coffeeContainer: {
    flex: 0,
    height: 322,
  },
  beanContentContainer: {
    paddingHorizontal: SPACING.spacing_30,
    gap: SPACING.spacing_24,
  },
});
