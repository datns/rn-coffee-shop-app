import React from 'react';
import Container from '../components/Container';
import Header from '../components/Header';
import {FlatList, ListRenderItem, StyleSheet} from 'react-native';
import useStore from '../store';
import {Coffee} from '../../types';
import FavoriteItem from '../components/FavoriteItem';
import {SPACING} from '../theme';

const FavoritesScreen = () => {
  const {favoritesList} = useStore();

  const renderItem: ListRenderItem<Coffee> = ({item}) => {
    return <FavoriteItem data={item} />;
  };

  return (
    <Container>
      <Header screenName="Favorites" />
      <FlatList
        data={Object.values(favoritesList)}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.content}
      />
    </Container>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: SPACING.spacing_20,
    paddingTop: SPACING.spacing_20,
    paddingBottom: SPACING.spacing_30 + 80,
    gap: SPACING.spacing_30,
  },
});
