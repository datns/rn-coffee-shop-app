import React, {useMemo} from 'react';
import Container from '../components/Container';
import CardCartItem from '../components/CardCartItem';
import useStore from '../store';
import {FlatList, ListRenderItem, StyleSheet} from 'react-native';
import {CartItem} from '../../types';
import {SPACING} from '../theme';
import Box from '../components/Box';
import Footer from '../components/Footer';

const CartScreen = () => {
  const {cart} = useStore();
  const totalPrice = useMemo(() => {
    const cartArray = Object.values(cart);
    return cartArray.reduce((acc, item) => {
      const totalItem = Object.values(item.order).reduce((current, value) => {
        return Number(value.price) * value.quantity + current;
      }, 0);

      return acc + totalItem;
    }, 0);
  }, [cart]);

  const renderItem: ListRenderItem<CartItem> = ({item}) => {
    return <CardCartItem data={item} />;
  };

  const keyExtractor = (item: CartItem, _: number) => item.item.id;

  return (
    <Container screenName={'Cart'}>
      <Box height={SPACING.spacing_12} />
      <FlatList
        data={Object.values(cart)}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.content}
        ListFooterComponent={
          <Footer
            label="Total Price"
            buttonLabel="Pay"
            onPress={() => {}}
            price={totalPrice.toFixed(2).toString()}
          />
        }
      />
    </Container>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: SPACING.spacing_30,
    paddingBottom: SPACING.spacing_20 + 80,
    gap: SPACING.spacing_16,
  },
});
