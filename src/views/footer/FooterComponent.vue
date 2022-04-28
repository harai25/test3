<template>
  <footer class="footer">
    <div class="footer__title">S—Shop</div>
    <div class="footer__links">
      <div class="footer__link">Copyright</div>
      <div class="footer__link">Contacts</div>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FooterComponent",
});
</script>

<style lang="scss" scoped>
.footer {
  margin-top: auto;
  height: 110px;
  padding-left: 100px;
  padding-right: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #1b1b1b;
  &__title {
    font-family: "Inter";
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
    text-transform: uppercase;
    color: #ffffff;
    cursor: pointer;
  }
  &__links {
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;
    color: #ffffff;
    display: flex;
  }
  &__link {
    margin-left: 40px;
    cursor: pointer;
  }
}
</style>
