<template>
  <div class="filter">
    <div class="filter__input-item input-item">
      <span class="input-item__label" for="search">Search</span>
      <InputSearch v-model="search" />
    </div>
    <div class="filter__input-item input-item">
      <label class="input-item__label" for="category">Product category</label>
      <DropDownListSelect v-model="category" :items="categoryList" />
    </div>
    <div class="filter__input-item input-item">
      <label class="input-item__label" for="sale">Sale</label>
      <DropDownListSelect v-model="sale" :items="saleList" />
    </div>
    <button class="filter__submit" @click="apply()">Apply</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "@/store";
import { MutationTypes } from "@/store/mutations";
import { CategoryE, ProductFilterI, SaleFilterE } from "@/types/Product";
import InputSearch from "@/components/InputSearch.vue";
import DropDownListSelect from "@/components/DropDownListSelect.vue";

export default defineComponent({
  name: "FilterComponent",
  components: {
    InputSearch,
    DropDownListSelect,
  },
  setup() {
    const search = ref("");

    const categoryList: string[] = [
      CategoryE.any,
      CategoryE.Sneakers,
      CategoryE.Socks,
    ];
    const category = ref(categoryList[0]);

    const saleList: string[] = [SaleFilterE.any, SaleFilterE.Bestsellers];
    const sale = ref(saleList[0]);

    const store = useStore();

    const apply = () => {
      const productFilter: ProductFilterI = {
        search: search.value,
        category: category.value,
        sale: sale.value === SaleFilterE.Bestsellers,
      };

      if (productFilter.category === CategoryE.any) {
        productFilter.category = null;
      }

      store.commit(MutationTypes.SET_PRODUCTS_FILTER, productFilter);
    };

    return {
      search,
      category,
      categoryList,
      sale,
      saleList,
      apply,
    };
  },
});
</script>
<style lang="scss" scoped>
.filter {
  display: flex;
  justify-content: space-between;
  &__input-item {
    margin-right: 20px;
  }
  &__submit {
    height: 61px;
    background: #1b1b1b;
    color: #ffffff;
    border: none;
    width: 100%;
    margin-top: 42px;
    cursor: pointer;
  }
}
.filter > * {
  flex: 1;
}
.input-item {
  &__label {
    margin-bottom: 20px;
    display: block;
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;
    color: #000000;
  }
}
</style>
