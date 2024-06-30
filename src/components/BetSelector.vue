<script setup lang="ts" name="BetSelector">
import { computed } from 'vue'
//Store
import { useBetStore } from '@/stores/bet'

const betStore = useBetStore()
const betZero = computed(() => betStore.currentBet === 0)
const setValue = (value: number) => {
  const newBet = betStore.currentBet + value
  if (newBet < 0) {
    betStore.placeBet(0)
  } else {
    betStore.placeBet(newBet)
  }
}
const updateBet = (event: Event) => {
  const input = event.target as HTMLInputElement
  const newBet = parseInt(input.value, 10)
  if (!isNaN(newBet) && newBet >= 0) {
    betStore.placeBet(newBet)
  } else if (newBet < 0) {
    betStore.placeBet(0)
  }
}
</script>
<template>
  <div class="bet-selector">
    <div
      class="bet-selector__minus"
      :class="{ 'bet-selector__minus-disabled': betZero }"
      @click="betZero ? null : setValue(-5)"
    >
      &ndash;
    </div>
    <div class="bet-selector__box">
      <div class="bet-selector__text">Bet</div>
      <input
        class="bet-selector__value"
        type="number"
        :value="betStore.currentBet"
        @input="updateBet"
        min="0"
      />
    </div>
    <div class="bet-selector__plus" @click="setValue(5)">+</div>
  </div>
</template>
<style lang="scss" scoped>
.bet-selector {
  width: 100px;
  height: 44px;
  font-size: 16px;
  border-radius: 50px;
  background: rgba(15, 27, 38, 1);
  border: 1px solid rgba(28, 39, 52, 1);
  padding: 0px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;
  @media screen and (max-width: 1030px) {
    width: 64px;
    height: 44px;
  }
  @media screen and (max-width: 768px) {
    width: 100px;
    height: 44px;
  }
  &__minus {
    background: linear-gradient(0deg, #e35e2c 0%, #ffbd2b 100%);
    background-clip: text;
    -webkit-text-fill-color: transparent;

    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;

    border: 1px solid rgba(28, 39, 52, 1);
    border-radius: 50px;
    transition: border-color 0.3s;

    cursor: pointer;

    &:hover {
      border: 1px solid #e35e2c;
    }
    &-disabled {
      cursor: not-allowed;
      opacity: 0.5;
      &:hover {
        border: 1px solid rgba(28, 39, 52, 1);
      }
    }
  }
  &__box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  &__plus {
    background: linear-gradient(135deg, #3880fd 29.17%, #3cbdfb 75%);
    color: rgba(255, 255, 255, 1);

    width: 24px;
    height: 24px;

    display: flex;
    align-items: center;
    justify-content: center;

    border: 1px solid rgba(55, 138, 237, 1);

    border-radius: 50px;
    transition: border-color 0.3s;

    cursor: pointer;

    &:hover {
      border: 1px solid #e35e2c;
    }
  }
  &__text {
    font-family: Montagu Slab;
    font-size: 10px;
    font-weight: 400;
    line-height: 10px;
    text-align: left;
    color: rgba(151, 151, 151, 1);
  }
  &__value {
    font-family: Montagu Slab;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    text-align: left;
    color: rgba(255, 255, 255, 1);
    background: transparent;
    border: none;
    text-align: center;
    width: 40px;
    outline: none;
    &::placeholder {
      color: rgba(151, 151, 151, 1);
    }
    -moz-appearance: textfield;
    -webkit-appearance: none;
    appearance: none;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &::-moz-inner-spin-button {
      -moz-appearance: none;
      margin: 0;
    }
  }
}
</style>
