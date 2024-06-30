<script setup lang="ts" name="CustomSwitcher">
import { defineEmits } from 'vue'

const emit = defineEmits(['update:modelValue'])

function emitChange(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.checked)
}
</script>
<template>
  <div class="custom-switcher">
    <input type="checkbox" class="checkbox" @change="emitChange" />
    <div class="knobs"></div>
  </div>
</template>
<style lang="scss" scoped>
.custom-switcher {
  position: relative;
  width: 36px;
  height: 20px;

  .checkbox {
    position: relative;
    top: -1px;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
    z-index: 3;
  }

  .knobs {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.03);
    box-shadow: 0px 0.96px 0.96px 0px rgba(255, 255, 255, 0.15) inset;

    border-radius: 16px;

    &::before {
      content: '';
      position: absolute;
      top: 2px;
      left: 2px;
      width: 16px;
      height: 16px;
      background-color: rgba(165, 191, 209, 1);
      box-shadow: 0px 0px 24px 0px rgba(166, 192, 210, 1);
      border-radius: 50%;
      transition:
        0.3s ease all,
        left 0.3s cubic-bezier(0.18, 0.89, 0.35, 1.15);
    }
  }

  .checkbox:active + .knobs:before {
    width: 24px;
    border-radius: 100px;
  }

  .checkbox:checked:active + .knobs:before {
    margin-left: -18px;
  }

  .checkbox:checked + .knobs {
    background: linear-gradient(90deg, #f3ab1e 0%, #ef8421 52.04%, #ec6024 100%);
    box-shadow: 0px 0px 24px 0px rgba(255, 119, 28, 1);

    &::before {
      content: '';
      left: 17px;
    }
  }
}
</style>
