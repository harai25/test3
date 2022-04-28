<template>
  <div class="background" @mousedown="hide()">
    <div class="basket" @mousedown.stop>
      <div class="basket__head">
        <div class="basket__person-links person-links">
          <div class="person-links__profile">Profile</div>
          <div class="person-links__basket" @click="hide()">
            Basket
            <span v-if="productsInBasket.length"
              >({{ productsInBasket.length }})</span
            >
          </div>
        </div>
      </div>
      <div class="basket__body">
        <div class="total">
          <div class="total__title">Total</div>
          <div class="total__subtitle-list">
            <div class="total__subtitle-item">
              <div class="total__subtitle-name">Subtotal:</div>
              <div class="total__subtitle-value">
                ${{ generalPriceInfo.subtotal.toFixed(2) }}
              </div>
            </div>
            <div class="total__subtitle-item">
              <div class="total__subtitle-name">Sale:</div>
              <div class="total__subtitle-value">
                ${{
                  (generalPriceInfo.subtotal - generalPriceInfo.total).toFixed(
                    2
                  )
                }}
              </div>
            </div>
            <div class="total__subtitle-item">
              <div class="total__subtitle-name">Content:</div>
              <div
                class="total__subtitle-value remove-all"
                @click="removeAllFromBasket()"
              >
                Remove all
              </div>
            </div>
          </div>
        </div>
        <div class="order-total">
          <div class="order-total__name">Order total:</div>
          <div class="order-total__value">
            ${{ generalPriceInfo.total.toFixed(2) }}
          </div>
        </div>
        <div class="product-list">
          <div
            class="product-item"
            v-for="product in productsInBasket"
            :key="product.id"
          >
            <div class="product-item__img">
              <img :src="require(`@/assets/images/${product.img}`)" />
            </div>
            <div class="product-item__info">
              <div class="product-item__name">
                {{ product.name }}
              </div>
              <div class="product-item__price">${{ product.price }}</div>
              <div
                class="product-item__remove"
                @click="removeFromBasket(product.id)"
              >
                Remove
              </div>
            </div>
          </div>
        </div>
        <button class="checkout">
          <span> Checkout </span>
          <img src="@/assets/icons/right-arrow.svg" alt="" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "@/store";
import { MutationTypes } from "@/store/mutations";

export default defineComponent({
  name: "BasketComponent",
  setup() {
    const store = useStore();
    const hide = () => {
      store.commit(MutationTypes.SET_IS_BASKET_OPEN, false);
    };

    const removeFromBasket = (id: number) => {
      store.commit(MutationTypes.REMOVE_PRODUCT_FROM_BASKET, id);
    };

    const removeAllFromBasket = () => {
      store.commit(MutationTypes.SET_PRODUCTS_IN_BASKET, []);
    };

    const productsInBasket = computed(() => store.state.productsInBasket);

    const generalPriceInfo = computed(() => {
      let subtotal = 0;
      let total = 0;
      store.state.productsInBasket.forEach((product) => {
        if (product.oldPrice) {
          subtotal += product.oldPrice;
        } else {
          subtotal += product.price;
        }
        total += product.price;
      });
      return { subtotal, total };
    });

    return {
      hide,
      removeFromBasket,
      removeAllFromBasket,
      productsInBasket,
      generalPriceInfo,
    };
  },
});
</script>

<style lang="scss" scoped>
.background {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1050;
}
.basket {
  position: fixed;
  right: 0;
  top: 0;
  width: 455px;
  background: white;
  &__head {
    height: 100px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #bdbdbd;
  }
  &__person-links {
    margin-right: 100px;
    margin-left: auto;
  }
}
.person-links {
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  color: #000000;
  margin-bottom: 1px;

  display: flex;
  &__profile {
    margin-right: 44px;
    cursor: pointer;
  }
  &__basket {
    cursor: pointer;
    color: #ff6b00;
  }
}
.total {
  margin-left: 41px;
  &__title {
    font-family: "Inter";
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
    text-transform: uppercase;
    color: #000000;

    margin-top: 20px;
  }
  &__subtitle-list {
    margin-top: 30px;
    margin-right: 100px;
  }
  &__subtitle-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  &__subtitle-name {
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #000000;
  }
  &__subtitle-value {
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: #000000;
  }
}
.remove-all {
  text-decoration-line: underline;
  cursor: pointer;
}
.order-total {
  margin-top: 20px;
  padding-left: 41px;
  padding-right: 100px;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  border-bottom: 1px solid #bdbdbd;
  border-top: 1px solid #bdbdbd;
  &__name {
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    color: #000000;
  }
  &__value {
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    text-align: right;
    color: #000000;
  }
}
.product-list {
  padding-top: 40px;
  padding-left: 41px;
  padding-right: 100px;
  max-height: calc(100vh - 480px);
  overflow: auto;
  padding-bottom: 15px;
}
.product-item {
  margin-bottom: 40px;
  display: flex;
  &__img {
    height: 100px;
    min-width: 100px;
    max-width: 100px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  &__info {
    margin-left: 10px;
    position: relative;
  }
  &__name {
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #818181;
  }
  &__price {
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: #000000;

    margin-top: 5px;
  }
  &__remove {
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    text-decoration-line: underline;
    color: #000000;
    cursor: pointer;

    position: absolute;
    bottom: 0px;
  }
}
.checkout {
  height: 62px;
  background: #1b1b1b;
  color: #ffffff;
  border: none;
  width: 100%;
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
    margin-right: 100px;
  }
  span {
    margin-left: 41px;
  }
}
</style>
