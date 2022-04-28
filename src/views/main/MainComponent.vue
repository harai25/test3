<template>
  <main class="main">
    <FilterComponent />
    <ProductList />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FilterComponent from "./FilterComponent.vue";
import ProductList from "./ProductList.vue";

export default defineComponent({
  name: "MainComponent",
  components: {
    FilterComponent,
    ProductList,
  },
});
</script>
<style lang="scss" scoped>
.main {
  margin-left: 100px;
  margin-right: 100px;
  margin-top: 80px;
  flex-grow: 1;
}
</style>
