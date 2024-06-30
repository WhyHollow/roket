<script setup lang="ts" name="CashoutModule">
import { useCashoutStore } from '@/stores/cashout'
import { storeToRefs } from 'pinia'
import SideWrappers from '@/components/SideWrappers.vue'
import CustomSwitcher from '@/components/CustomSwitcher.vue'
import XSelector from '@/components/XSelector.vue'

const cashoutStore = useCashoutStore()
const { autoCashout, autoCashout50, autoCashoutValue, autoCashout50Value } =
  storeToRefs(cashoutStore)
</script>

<template>
  <side-wrappers class="cashout-module">
    <div class="cashout-module__section">
      <div class="cashout-module__switcher-container">
        <custom-switcher class="cashout-module__switcher" v-model="autoCashout" />
        <div class="cashout-module__switcher-label">Auto Cashout</div>
      </div>
      <x-selector v-model="autoCashoutValue" class="cashout-module__selector" />
    </div>
    <div class="cashout-module__section">
      <div class="cashout-module__switcher-container">
        <custom-switcher v-model="autoCashout50" class="cashout-module__switcher" />
        <div class="cashout-module__switcher-label">50% Auto Cashout</div>
      </div>
      <x-selector v-model="autoCashout50Value" class="cashout-module__selector" />
    </div>
  </side-wrappers>
</template>
<style lang="scss">
.cashout-module {
  margin-top: 16px;
  padding: 12px;
  &__section {
    &:first-child {
      margin-bottom: 16px;
    }
  }
  &__switcher {
    &-container {
      display: flex;
      gap: 10px;
      margin-bottom: 16px;
    }
    &-label {
      font-family: Montagu Slab;
      font-size: 12px;
      font-weight: 400;
      line-height: 20px;
      text-align: left;
      color: rgba(255, 255, 255, 1);
    }
  }
}
</style>
