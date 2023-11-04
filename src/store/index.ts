import {Coffee} from '../../types';
import {create} from 'zustand';
import CoffeeData from '../data/CoffeeData';
import BeansData from '../data/BeansData';

type StoreState = {
  coffeeList: Coffee[];
  beanList: Coffee[];
};

const useStore = create<StoreState>(set => ({
  coffeeList: CoffeeData,
  beanList: BeansData,
}));

export default useStore;
