<script setup lang="ts" name="XHistory">
import xBlock from '@/components/xBlock.vue'
import { faker } from '@faker-js/faker'
</script>

<template>
  <div class="x-history__wrapper">
    <x-block
      v-for="item in 25"
      :key="item"
      :value="faker.number.float({ multipleOf: 0.01, min: 1.01, max: 15 })"
    ></x-block>
  </div>
</template>
<style lang="scss" scoped>
.x-history {
  &__wrapper {
    margin-left: -40px;
    width: 150%;
    display: flex;
    gap: 12px;
  }
}
</style>
