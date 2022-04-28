import { ProductI } from "@/types/Product";
import { ActionContext, ActionTree } from "vuex";
import { State } from ".";
import { Mutations, MutationTypes } from "./mutations";


export enum ActionTypes {
  FETCH_PRODUCTS = 'FETCH_PRODUCTS',
}

type ActionAugments = Omit<ActionContext<State, State>, 'commit'> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
}

export type Actions = {
  [ActionTypes.FETCH_PRODUCTS](context: ActionAugments): void;
}

export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.FETCH_PRODUCTS](context) {
    try {
      const response = await fetch('/data.json')
      if (response.ok) {
        const result = await response.json();
        context.commit(MutationTypes.SET_PRODUCTS, result.data as ProductI[])
      } else {
        console.log(response.status)
      }
    } catch (err) {
      console.log(err)
    }

  }
}