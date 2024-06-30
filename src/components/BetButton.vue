<script setup lang="ts" name="BetButton">
import { computed } from 'vue'
//Icon
import IconMoney from '@/components/icons/IconMoney.vue'
//Store
import { useBetStore } from '@/stores/bet'

const betStore = useBetStore()
const props = defineProps<BetButtonProps>()
interface BetButtonProps {
  value: number
}
const activeBet = computed(() => props.value === betStore.currentBet)

const setValue = (value: number) => {
  betStore.placeBet(value)
}
</script>
<template>
  <div class="bet-wrap" :class="{ 'bet-wrap-active': activeBet }" @click="setValue(value)">
    <div class="bet-wrap__icon"><icon-money /></div>
    <div class="bet-wrap__value">{{ value }}</div>
  </div>
</template>
<style lang="scss" scoped>
.bet-wrap {
  width: 100px;
  height: 44px;

  border-radius: 50px;
  background: rgba(15, 27, 38, 1);
  border: 1px solid rgba(28, 39, 52, 1);

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: border-color 0.3s;
  @media screen and (max-width: 1030px) {
    width: 64px;
    height: 44px;
  }
  @media screen and (max-width: 768px) {
    width: 100px;
    height: 44px;
  }
  &:hover {
    border: 1px solid #e35e2c;
  }
  &-active {
    border: 1px solid #e35e2c;
  }
  &__icon {
    width: 20px;
    height: 20px;
  }

  &__value {
    font-family: Montagu Slab;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    text-align: left;
    color: rgba(255, 255, 255, 1);
  }
}
</style>
