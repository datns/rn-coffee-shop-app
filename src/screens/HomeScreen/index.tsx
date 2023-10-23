import React, {useState} from 'react';
import {useWindowDimensions, View} from 'react-native';
import {Route, TabView} from 'react-native-tab-view';
import Container from '../../components/Container';
import Text from '../../components/Text';
import Box from '../../components/Box';
import SearchBar from './components/SearchBar';
import CustomTabBar from './components/CustomTabBar';
import CategoryData from '../../data/CategoryData';

const ROUTES = CategoryData.map(item => ({
  key: item.code,
  title: item.name,
}));

const HomeScreen = () => {
  const layout = useWindowDimensions();

  const [tabIndex, setTabIndex] = useState<number>(0);

  const renderScene = ({route}: {route: Route}) => {
    return (
      <View style={{backgroundColor: '#ff4081'}}>
        <Text variant={'text_1'}>{route.title}</Text>
      </View>
    );
  };

  return (
    <Container>
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
          // sceneContainerStyle={{ paddingLeft: SPACING.spacing_30 }}
          renderScene={renderScene}
          renderTabBar={props => <CustomTabBar {...props} />}
          initialLayout={{width: layout.width}}
        />
      </Box>
    </Container>
  );
};

export default HomeScreen;