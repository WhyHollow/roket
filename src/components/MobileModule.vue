<script setup lang="ts">
import { ref, nextTick } from 'vue'
import CounterPlayers from '@/components/CounterPlayers.vue'
import CashoutModule from '@/components/CashoutModule.vue'
import ArrowLeft from '@/components/icons/ArrowLeft.vue'

const isOpen = ref<boolean>(false)
const infoHeight = ref<string>('auto')

const toggleOpen = async () => {
  isOpen.value = !isOpen.value

  await nextTick()
  const infoElement = document.querySelector('.mobile-module__info') as HTMLElement
  if (infoElement) {
    infoHeight.value = isOpen.value ? `${infoElement.scrollHeight}px` : '0'
  }
}
</script>

<template>
  <div class="mobile-module">
    <transition name="slide-fade">
      <div v-if="isOpen" class="mobile-module__info" :style="{ height: infoHeight }">
        <div class="mobile-module__info_players">
          <counter-players />
        </div>
        <cashout-module />
        <!-- <x-history /> -->
      </div>
    </transition>

    <div
      class="mobile-module__toggleButton"
      :class="{ 'mobile-module__toggleButton-active': isOpen }"
      @click="toggleOpen"
    >
      {{ isOpen ? 'Close' : 'More Info' }}
      <arrow-left />
    </div>
  </div>
</template>

<style lang="scss">
.mobile-module {
  padding: 0 24px;
  margin-bottom: 32px;
  position: relative;

  &__info {
    border: 1px solid rgba(28, 39, 52, 1);
    background: rgba(3, 15, 26, 1);
    padding: 24px 12px;
    border-radius: 16px;
    margin-bottom: 8px;
    overflow: hidden;
    transition:
      height 0.3s ease,
      opacity 0.3s ease;

    &_players {
      border: 1px солидный rgba(28, 39, 52, 1);
      border-radius: 16px;
    }
  }

  &__toggleButton {
    border: 1px solid rgba(28, 39, 52, 1);
    background: rgba(3, 15, 26, 1);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: border-color 0.3s;
    cursor: pointer;
    font-family: Montagu Slab;
    font-size: 12px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);

    &:hover {
      border-color: #e35e2c;
    }

    svg {
      transform: rotate(90deg);
    }

    &-active {
      svg {
        transform: rotate(270deg);
      }
    }
  }

  .cashout-module {
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: 500px) {
      flex-direction: column;
      align-items: center;
    }
    &__section {
      width: 47%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-bottom: 0;
      @media screen and (max-width: 500px) {
        width: 97%;
      }
      &:first-child {
        margin-bottom: 0;
        @media screen and (max-width: 500px) {
          margin-bottom: 12px;
        }
      }
    }
  }

  .selector__wrapper {
    width: 95%;
  }

  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: all 0.3s ease;
  }

  .slide-fade-enter,
  .slide-fade-leave-to {
    height: 0;
    opacity: 0;
  }
}
</style>
