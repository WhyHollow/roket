<script setup lang="ts" name="CurrentMultiplier">
import { computed } from 'vue'
import { useCrashStore } from '@/stores/crash'

const crashStore = useCrashStore()

const currentMultiplier = computed(() => crashStore.currentMultiplier)
const isCrashed = computed(() => crashStore.isCrashed)
</script>
<template>
  <div class="current-miltiplier__wrapper">
    <div class="current-miltiplier__box">
      <div v-if="isCrashed" class="current-miltiplier__crash">Crash</div>
      <div class="current-miltiplier__rate" :class="{ 'current-miltiplier__crash': isCrashed }">
        {{ currentMultiplier.toFixed(2) }}x
      </div>
      <div class="current-miltiplier__text">CURREN RATE</div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.current-miltiplier {
  &__wrapper {
    padding: 5px;
    border: 2px solid #ec6725;
    // border-image: linear-gradient(180deg, #f29c21 0%, #ec6725 100%);
    // border-image-slice: 1;
    border-radius: 24px;
    transition: opacity 0.3s ease-out;
    position: absolute;
    @media screen and (max-width: 768px) {
      position: static;
    }
  }
  &__box {
    background: radial-gradient(
      ellipse at center top,
      rgba(90, 194, 209, 0.9) 5%,
      rgba(48, 58, 83, 0.9) 35%,
      rgba(24, 16, 27, 1) 65%
    );
    width: 200px;
    position: relative;
    padding: 5px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: 24px;
  }
  &__rate {
    font-family: Montagu Slab;
    font-size: 32px;
    font-weight: 500;

    background: linear-gradient(0deg, #e35e2c 0%, #ffbd2b 100%);
    background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 10px;
    transition: transform 0.3s ease-out;
  }
  &__crash {
    font-family: Montagu Slab;
    font-size: 32px;
    font-weight: 500;

    background: rgba(245, 85, 85, 1);
    background-clip: text;
    -webkit-text-fill-color: transparent;

    transition: opacity 0.3s ease-out;
  }
  &__text {
    font-family: Montagu Slab;
    font-size: 14px;
    font-weight: 400;

    text-align: left;
    color: rgba(151, 151, 151, 1);
  }
}
</style>
