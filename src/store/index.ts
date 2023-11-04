import {CartItem, Coffee, Price} from '../../types';
import {create} from 'zustand';
import CoffeeData from '../data/CoffeeData';
import BeansData from '../data/BeansData';
import {produce} from 'immer';

type StoreState = {
  coffeeList: Coffee[];
  beanList: Coffee[];
  cart: Record<string, CartItem>;
  addCart: (payload: {item: Coffee; price: Price}) => void;
};

const useStore = create<StoreState>(set => ({
  coffeeList: CoffeeData,
  beanList: BeansData,
  cart: {},
  addCart: payload =>
    set(
      produce((state: StoreState) => {
        const {item, price} = payload;
        const selectedProduct = state.cart && state.cart[payload.item.id];
        if (selectedProduct) {
          if (selectedProduct.order[price.size]) {
            selectedProduct.order[price.size].quantity += 1;
          } else {
            selectedProduct.order[price.size] = {
              quantity: 1,
              price: price.price,
            };
            selectedProduct.item = item;
          }
        } else {
          state.cart[item.id] = {
            item: item,
            order: {
              [price.size]: {
                price: price.price,
                quantity: 1,
              },
            },
          };
        }
      }),
    ),
}));

export default useStore;
