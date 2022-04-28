<template>
  <div class="product-list">
    <ProductItem
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "@/store";
import ProductItem from "./ProductItem.vue";

export default defineComponent({
  name: "ProductList",
  components: {
    ProductItem,
  },
  setup() {
    const store = useStore();
    const products = computed(() =>
      store.state.products.filter((e) => {
        const searchValid = e.name
          .toLowerCase()
          .includes(store.state.productsFilter.search.toLowerCase());
        if (!searchValid) {
          return false;
        }

        const categoryValid =
          !store.state.productsFilter.category ||
          e.category === store.state.productsFilter.category;
        if (!categoryValid) {
          return false;
        }

        const saleValid =
          !store.state.productsFilter.sale ||
          ("sale" in e && store.state.productsFilter.sale);
        if (!saleValid) {
          return false;
        }

        return true;
      })
    );

    return { products };
  },
});
</script>
<style lang="scss" scoped>
.product-list {
  margin-top: 60px;
  margin-bottom: 120px;
  display: flex;
  flex-wrap: wrap;
}
</style>
