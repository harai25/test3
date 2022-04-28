import { ProductFilterI, ProductI } from "@/types/Product"
import { MutationTree } from "vuex"
import { State } from "."

export enum MutationTypes {
  SET_PRODUCTS = 'SET_PRODUCTS',
  SET_PRODUCTS_FILTER = 'SET_PRODUCTS_FILTER',
  SET_IS_BASKET_OPEN = 'SET_IS_BASKET_OPEN',
  SET_PRODUCTS_IN_BASKET = 'SET_PRODUCTS_IN_BASKET',
  ADD_PRODUCT_IN_BASKET = 'ADD_PRODUCT_IN_BASKET',
  REMOVE_PRODUCT_FROM_BASKET = 'REMOVE_PRODUCT_FROM_BASKET',
}

export type Mutations = {
  [MutationTypes.SET_PRODUCTS](state: State, payload: ProductI[]): void;
  [MutationTypes.SET_IS_BASKET_OPEN](state: State, payload: boolean): void;
  [MutationTypes.SET_PRODUCTS_FILTER](state: State, payload: ProductFilterI): void;
  [MutationTypes.SET_PRODUCTS_IN_BASKET](state: State, payload: ProductI[]): void;
  [MutationTypes.ADD_PRODUCT_IN_BASKET](state: State, payload: ProductI): void;
  [MutationTypes.REMOVE_PRODUCT_FROM_BASKET](state: State, id: number): void;
}


export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_PRODUCTS](state, payload: ProductI[]) {
    state.products = payload
  },
  [MutationTypes.SET_IS_BASKET_OPEN](state, payload: boolean) {
    state.isBasketOpen = payload
  },
  [MutationTypes.SET_PRODUCTS_FILTER](state, payload: ProductFilterI) {
    state.productsFilter = payload
  },
  [MutationTypes.SET_PRODUCTS_IN_BASKET](state, payload: ProductI[]) {
    state.productsInBasket = payload
  },
  [MutationTypes.ADD_PRODUCT_IN_BASKET](state, payload: ProductI) {
    state.productsInBasket.push(payload)
    localStorage.setItem('productsInBasket', JSON.stringify(state.productsInBasket))
  },
  [MutationTypes.REMOVE_PRODUCT_FROM_BASKET](state, id: number) {
    state.productsInBasket = state.productsInBasket.filter(e => e.id !== id)
    localStorage.setItem('productsInBasket', JSON.stringify(state.productsInBasket))
  },
}