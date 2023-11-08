import {CartItem, Coffee, Order, Price} from '../../types';
import {create} from 'zustand';
import CoffeeData from '../data/CoffeeData';
import BeansData from '../data/BeansData';
import {produce} from 'immer';
import {createJSONStorage, persist, StateStorage} from 'zustand/middleware';
import {MMKV} from 'react-native-mmkv';

type StoreState = {
  coffeeList: Coffee[];
  beanList: Coffee[];
  cart: Record<string, CartItem>;
  favoritesList: Record<string, Coffee>;
  ordersList: Order[];
  addCart: (payload: {item: Coffee; price: Price}) => void;
  removeCart: (payload: {id: string; size: string}) => void;
  toggleFavorite: (payload: Coffee) => void;
  addOrder: (payload: Order) => void;
};

const storage = new MMKV();

const zustandStorage: StateStorage = {
  setItem: (name, value) => {
    return storage.set(name, value);
  },
  getItem: name => {
    const value = storage.getString(name);
    return value ?? null;
  },
  removeItem: name => {
    return storage.delete(name);
  },
};

const useStore = create<StoreState>()(
  persist(
    set => ({
      coffeeList: CoffeeData,
      beanList: BeansData,
      cart: {},
      favoritesList: {},
      ordersList: [],
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
      toggleFavorite: payload =>
        set(
          produce((state: StoreState) => {
            if (!state.favoritesList[payload.id]) {
              state.favoritesList[payload.id] = payload;
            } else {
              delete state.favoritesList[payload.id];
            }
          }),
        ),
      addOrder: payload =>
        set(
          produce((state: StoreState) => {
            state.ordersList.unshift(payload);
            state.cart = {};
          }),
        ),
    }),
    {
      name: 'coffee-app',
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);

export default useStore;
