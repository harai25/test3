import { GetterTree } from "vuex"
import { State } from "."


export type Getters = {
  mapProductInBasket(state: State): Set<number>;
  productsPriceInfo(state: State): [number, number];
}

export const getters: GetterTree<State, State> & Getters = {
  mapProductInBasket(state) {
    const ids = state.productsInBasket.map(e => e.id)
    return new Set(ids)
  },
  productsPriceInfo(state) {
    let subtotal = 0
    let total = 0
    state.productsInBasket.forEach(product => {
      if (product.oldPrice) {
        subtotal += product.oldPrice
      } else {
        subtotal += product.price
      }
      total += product.price
    })
    return [subtotal, total]
  }
}