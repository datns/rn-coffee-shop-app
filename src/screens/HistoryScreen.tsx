import React from 'react';
import {FlatList, ListRenderItem, StyleSheet} from 'react-native';
import Container from '../components/Container';
import Header from '../components/Header';
import HistoryItem from '../components/HistoryItem';
import Button from '../components/Button';
import useStore from '../store';
import {Order} from '../../types';
import {SPACING} from '../theme';

const HistoryScreen = () => {
  const {ordersList} = useStore();

  const renderItem: ListRenderItem<Order> = ({item}) => {
    return <HistoryItem data={item} />;
  };
  return (
    <Container>
      <Header screenName="Order History" />
      <FlatList
        data={ordersList}
        renderItem={renderItem}
        keyExtractor={item => item.date}
        contentContainerStyle={styles.content}
        ListFooterComponent={<Button label="Download" onPress={() => {}} />}
      />
    </Container>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  content: {
    paddingTop: SPACING.spacing_20,
    paddingHorizontal: SPACING.spacing_30,
    paddingBottom: SPACING.spacing_30 + 80,
    gap: SPACING.spacing_24,
  },
});
