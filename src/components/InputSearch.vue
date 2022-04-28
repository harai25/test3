<template>
  <div class="input-search">
    <input
      :value="modelValue"
      @input="input($event.target.value)"
      type="text"
    />
    <img @click="clear()" class="cross" src="@/assets/icons/cross.svg" alt="" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "InputSearch",
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },
  emits: ["update:modelValue"],
  setup(_, { emit }) {
    const input = (val: string) => {
      emit("update:modelValue", val);
    };

    const clear = () => {
      emit("update:modelValue", "");
    };

    return {
      input,
      clear,
    };
  },
});
</script>
<style lang="scss" scoped>
.input-search {
  position: relative;
}
input {
  background: #f5f5f5;
  outline: none;
  border: 0 none;
  height: 59px;
  width: 100%;
  padding-left: 10px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  color: #000000;
}
.cross {
  position: absolute;
  top: 25px;
  right: 20px;
  cursor: pointer;
}
</style>
