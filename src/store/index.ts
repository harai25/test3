import { createStore, Store as VuexStore, CommitOptions, DispatchOptions } from 'vuex'
import { ProductFilterI, ProductI } from '@/types/Product'
import { Mutations, mutations } from './mutations';
import { Actions, actions } from './actions';
import { Getters, getters } from './getters';

export interface State {
  products: ProductI[];
  productsFilter: ProductFilterI;
  isBasketOpen: boolean;
  productsInBasket: ProductI[];
}

export const store = createStore<State>({
  state: {
    products: [],
    productsFilter: {
      search: '',
      category: null,
      sale: false,
    },
    isBasketOpen: false,
    productsInBasket: [],
  },
  getters,
  mutations,
  actions,
})

export type Store = Omit<
  VuexStore<State>,
  'getters' | 'commit' | 'dispatch'
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>
  }
}

export function useStore() {
  return store as Store
}
