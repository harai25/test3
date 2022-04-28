<template>
  <div class="product-item">
    <div class="product-item__img">
      <img :src="require(`@/assets/images/${product.img}`)" />
      <div class="product-item__sale" v-if="'sale' in product">
        Sale -{{ product.sale }}%
      </div>
    </div>
    <div class="product-item__name">
      {{ product.name }}
    </div>
    <div class="product-item__price price">
      <span class="price__now"> ${{ product.price }} </span>
      <span class="price__old" v-if="'oldPrice' in product">
        ${{ product.oldPrice }}
      </span>
    </div>
    <button
      v-if="!mapProductInBasket.has(product.id)"
      class="product-item__basket"
      @click="addToBasket(product)"
    >
      <span> Add to basket </span>
      <img src="@/assets/icons/plus.svg" alt="" />
    </button>
    <button
      v-else
      class="product-item__basket product-item__basket_added"
      @click="removeFromBasket(product.id)"
    >
      <span> Added </span>
      <img src="@/assets/icons/check.svg" alt="" />
    </button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { useStore } from "@/store";
import { MutationTypes } from "@/store/mutations";
import { ProductI } from "@/types/Product";

export default defineComponent({
  name: "ProductItem",
  props: {
    product: {
      type: Object as PropType<ProductI>,
      required: true,
    },
  },
  setup() {
    const store = useStore();

    const addToBasket = (product: ProductI) => {
      store.commit(MutationTypes.ADD_PRODUCT_IN_BASKET, product);
    };

    const removeFromBasket = (id: number) => {
      store.commit(MutationTypes.REMOVE_PRODUCT_FROM_BASKET, id);
    };

    const mapProductInBasket = computed(() => {
      return store.getters.mapProductInBasket;
    });

    return { addToBasket, removeFromBasket, mapProductInBasket };
  },
});
</script>
<style lang="scss" scoped>
.product-item {
  margin-top: 60px;
  margin-right: 20px;
  width: 335px;
  &__img {
    height: 400px;
    width: 100%;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
  }
  &__sale {
    position: absolute;
    top: 25px;
    right: 25px;
    background: #ff6b00;
    width: 121px;
    height: 43px;

    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: #ffffff;

    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__name {
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #000000;

    margin-top: 15px;
  }
  &__basket {
    height: 62px;
    background: #1b1b1b;
    color: #ffffff;
    border: none;
    width: 100%;
    margin-top: 15px;
    cursor: pointer;

    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;
    color: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;

    img {
      width: 16px;
      height: 16px;
      margin-right: 22px;
    }
    span {
      margin-left: 20px;
    }

    &_added {
      background: #ffffff;
      border: 1px solid #000000;
      box-sizing: border-box;

      font-family: "Inter";
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 22px;
      color: #000000;
    }
  }
}
.price {
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  &__now {
    color: #000000;
  }
  &__old {
    color: #b7b7b7;
    margin-left: 11px;
    text-decoration: line-through;
  }
}
</style>
