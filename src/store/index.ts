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
  removeCart: (payload: {id: string; size: string}) => void;
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
  removeCart: payload =>
    set(
      produce((state: StoreState) => {
        const {id, size} = payload;
        if (Object.keys(state.cart).length === 0) {
          return;
        }
        if (!state.cart[id]) {
          return;
        }
        if (!state.cart[id].order[size]) {
          return;
        }
        if (state.cart[id].order[size].quantity > 1) {
          state.cart[id].order[size].quantity -= 1;
        } else {
          delete state.cart[id].order[size];
          if (Object.keys(state.cart[id].order).length === 0) {
            delete state.cart[id];
          }
        }
      }),
    ),
}));

export default useStore;
