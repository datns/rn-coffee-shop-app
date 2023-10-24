import React from 'react';
import {FlatList, ListRenderItem, StyleSheet} from 'react-native';
import Card, {CARD_WIDTH} from '../../../components/Card';
import {SPACING} from '../../../theme';
import CoffeeData from '../../../data/CoffeeData';
import {Coffee} from '../../../../types';

interface TabProps {
  categoryCode: string;
}

const Tab: React.FC<TabProps> = ({categoryCode}) => {
  const renderItem: ListRenderItem<Coffee> = ({item}) => {
    return <Card data={item} />;
  };

  const filteredList = React.useMemo(() => {
    if (categoryCode === 'all') {
      return CoffeeData;
    }
    return CoffeeData.filter(
      item => item.name.toLowerCase().trim().replace(/ /g, '') === categoryCode,
    );
  }, [categoryCode]);

  return (
    <FlatList
      data={filteredList}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      horizontal
      contentContainerStyle={styles.contentContainer}
      snapToInterval={CARD_WIDTH + SPACING.spacing_24}
      style={styles.container}
    />
  );
};

export default Tab;

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
  },
  contentContainer: {
    gap: SPACING.spacing_24,
    paddingTop: SPACING.spacing_24,
    paddingHorizontal: SPACING.spacing_30,
  },
});
