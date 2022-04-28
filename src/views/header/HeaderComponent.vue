<template>
  <header class="header">
    <div class="header__title">S—Shop</div>
    <div class="header__catalog">Catalog</div>
    <div class="header__person-links person-links">
      <div class="person-links__profile">Profile</div>
      <div class="person-links__basket" @click="openBasket">
        Basket
        <span v-show="productsInBasket.length"
          >({{ productsInBasket.length }})</span
        >
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "@/store";
import { MutationTypes } from "@/store/mutations";

export default defineComponent({
  name: "HeaderComponent",
  setup() {
    const store = useStore();
    const openBasket = () => {
      store.commit(MutationTypes.SET_IS_BASKET_OPEN, true);
    };

    const productsInBasket = computed(() => store.state.productsInBasket);

    return { openBasket, productsInBasket };
  },
});
</script>
<style lang="scss" scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 2;
  background: white;
  margin-left: 100px;
  margin-right: 100px;
  padding-top: 35px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #bdbdbd;
  padding-bottom: 36px;

  &__title {
    font-family: "Inter";
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
    text-transform: uppercase;
    color: #000000;
    cursor: pointer;
  }
  &__catalog {
    margin-left: 247px;
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;
    color: #ff6b00;
    cursor: pointer;
  }
  &__person-links {
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

  display: flex;
  &__profile {
    margin-right: 44px;
    cursor: pointer;
  }
  &__basket {
    cursor: pointer;
  }
}
</style>
