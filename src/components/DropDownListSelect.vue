<template>
  <div class="drop-down-list-select">
    <div class="drop-down-list-select__input" @click="toggleList()">
      {{ modelValue }}
    </div>
    <div class="drop-down-list-select__down">
      <i class="fa fa-angle-down" aria-hidden="true"></i>
    </div>
    <div class="drop-down-list-select__list" v-show="isActive">
      <div
        class="drop-down-list-select__item"
        v-for="(item, i) in items"
        :key="i"
        @click="select(item)"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";

export default defineComponent({
  name: "InputSearch",
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    items: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },
  emits: ["update:modelValue"],
  setup(_, { emit }) {
    const select = (val: string) => {
      isActive.value = false;
      emit("update:modelValue", val);
    };

    const isActive = ref(false);
    const toggleList = () => {
      isActive.value = !isActive.value;
    };

    return {
      select,
      isActive,
      toggleList,
    };
  },
});
</script>
<style lang="scss" scoped>
.drop-down-list-select {
  position: relative;
  &__input {
    background: #f5f5f5;
    height: 59px;
    width: 100%;
    padding-left: 10px;
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;
    color: #000000;
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  &__down {
    position: absolute;
    top: 22px;
    right: 20px;
    cursor: pointer;
  }
  &__list {
    position: absolute;
    background-color: #f1f1f1;
    overflow: auto;
    width: 100%;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }
  &__item {
    cursor: pointer;
    &:hover {
      background: gray;
    }
  }
}
</style>
