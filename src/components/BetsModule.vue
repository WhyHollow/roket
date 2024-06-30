<script setup lang="ts" name="BetsModule">
import { computed } from 'vue'
//Store
import { useBetStore } from '@/stores/bet'
import { useCrashStore } from '@/stores/crash'

import BetButton from '@/components/BetButton.vue'
import BetSelector from '@/components/BetSelector.vue'

const betStore = useBetStore()
const crashStore = useCrashStore()

const betZero = computed(() => betStore.currentBet === 0)
const isPlaying = computed(() => crashStore.isPlaying)
const gameAction = () => {
  if (!isPlaying.value) {
    crashStore.startGame()
  } else {
    betStore.cashOut()
  }
}
</script>
<template>
  <div class="bets-module__wrap">
    <div class="bets-module__controls">
      <bet-button :value="1"></bet-button>
      <bet-button :value="5"></bet-button>
      <bet-selector :value="1"></bet-selector>
      <bet-button :value="10"></bet-button>
      <bet-button :value="25"></bet-button>
    </div>
    <div
      class="bets-module__button"
      :class="{ 'bets-module__button-disabled': betZero }"
      @click="betZero ? null : gameAction()"
    >
      {{ betZero || !isPlaying ? 'Bets' : 'Cashout' }}
    </div>
  </div>
</template>
<style lang="scss" scoped>
.bets-module {
  &__wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    @media screen and (max-width: 768px) {
      margin-bottom: 46px;
    }
  }
  &__controls {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 32px;
    @media screen and (max-width: 1030px) {
      gap: 10px;
    }
  }
  &__button {
    width: 204px;
    height: 44px;

    border-radius: 50px;

    display: flex;
    justify-content: center;
    align-items: center;

    background: linear-gradient(90deg, #f3ab1e 0%, #ef8421 52.04%, #ec6024 100%);
    box-shadow: 0px 0px 24px 0px rgba(255, 119, 28, 1);

    font-family: Montagu Slab;
    font-size: 14px;
    font-weight: 600;
    line-height: 24px;
    text-align: left;

    color: white;

    cursor: pointer;
    user-select: none;

    &:hover {
      background: linear-gradient(
        90deg,
        rgba(243, 171, 30, 0.75) 0%,
        rgba(239, 132, 33, 0.75) 52.04%,
        rgba(236, 96, 36, 0.75) 100%
      );
    }
    &-disabled {
      cursor: not-allowed;
      background: linear-gradient(
        90deg,
        rgba(243, 171, 30, 0.75) 0%,
        rgba(239, 132, 33, 0.75) 52.04%,
        rgba(236, 96, 36, 0.75) 100%
      );
    }
  }
}
</style>
