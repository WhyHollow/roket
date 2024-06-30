<script setup lang="ts" name="XSelector">
import { ref } from 'vue'
import { defineEmits } from 'vue'

import ArrowLeft from '@/components/icons/ArrowLeft.vue'
import ArrowRight from '@/components/icons/ArrowRight.vue'

const currentX = ref<number>(1.05)

const emit = defineEmits<{
  (event: 'update:modelValue', value: number): void
}>()

function emitChange(action: 'minus' | 'plus') {
  if (action === 'minus' && currentX.value > 1.05) {
    currentX.value -= 0.05
  } else if (action === 'plus') {
    currentX.value += 0.05
  }
  emit('update:modelValue', currentX.value)
}
</script>

<template>
  <div class="selector__wrapper">
    <div
      class="selector__wrapper_button"
      :class="{ disabled: currentX <= 1.05 }"
      @click="emitChange('minus')"
    >
      <arrow-left></arrow-left>
    </div>
    <div class="selector__wrapper_value">{{ currentX.toFixed(2) }}x</div>
    <div class="selector__wrapper_button" @click="emitChange('plus')">
      <arrow-right></arrow-right>
    </div>
  </div>
</template>
<style lang="scss">
.selector__wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(15, 27, 38, 1);
  border: 1px solid rgba(28, 39, 52, 1);
  border-radius: 50px;
  padding: 0 12px;
  width: 180px;
  height: 44px;

  &_button {
    width: 24px;
    height: 24px;

    border-radius: 50px;

    background: rgba(15, 27, 38, 1);
    border: 1px solid rgba(28, 39, 52, 1);
    user-select: none;
    cursor: pointer;
    svg {
      width: 100%;
      height: 100%;
    }
    &.disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
  &_value {
    color: rgba(255, 255, 255, 1);
    font-family: Montagu Slab;
    font-size: 14px;
    font-weight: 400;
    line-height: 110px;
    text-align: left;
  }
}
</style>
