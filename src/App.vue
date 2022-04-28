<template>
  <div class="s-shop">
    <HeaderComponent />

    <MainComponent />

    <FooterComponent />

    <transition name="fade">
      <BasketComponent v-if="isBasketOpen" />
    </transition>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import { useStore } from "@/store";
import { ActionTypes } from "./store/actions";
import { MutationTypes } from "./store/mutations";
import HeaderComponent from "./views/header/HeaderComponent.vue";
import MainComponent from "./views/main/MainComponent.vue";
import FooterComponent from "./views/footer/FooterComponent.vue";
import BasketComponent from "./views/basket/BasketComponent.vue";

export default defineComponent({
  name: "App",
  components: {
    HeaderComponent,
    MainComponent,
    BasketComponent,
    FooterComponent,
  },
  setup() {
    const store = useStore();
    const isBasketOpen = computed(() => store.state.isBasketOpen);
    onMounted(async () => {
      store.dispatch(ActionTypes.FETCH_PRODUCTS);

      const productsInBasket = localStorage.getItem("productsInBasket");

      if (productsInBasket) {
        store.commit(
          MutationTypes.SET_PRODUCTS_IN_BASKET,
          JSON.parse(productsInBasket)
        );
      }
    });

    return { isBasketOpen };
  },
});
</script>
<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
  font: Inter;
}

.s-shop {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

@font-face {
  font-family: "Inter";
  src: url("assets/fonts/Inter.ttf");
}

.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>