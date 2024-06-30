<script setup lang="ts">
//Info
import GameBackground from '@/components/GameBackground.vue'
import GameInfo from '@/components/GameInfo.vue'
import CurrentMultiplier from '@/components/CurrentMultiplier.vue'
//Side
import SideWrappers from '@/components/SideWrappers.vue'
import CounterPlayers from '@/components/CounterPlayers.vue'
import CashoutModule from '@/components/CashoutModule.vue'
//Game
import ScaleCrash from '@/components/ScaleCrash.vue'
import CrashGame from '@/components/CrashGame.vue'
//X History
import XHistory from '@/components/XHistory.vue'
//Bets History
import BetsHistory from '@/components/BetsHistory.vue'
//Bet
import BetsModule from '@/components/BetsModule.vue'
import MobileModule from '@/components/MobileModule.vue'
import { computed } from 'vue'
import useWindowSize from '@/utils/windowSize'
const { windowWidth } = useWindowSize()
const isVisible = computed(() => windowWidth.value >= 768)
</script>

<template>
  <main>
    <game-background>
      <template #info>
        <game-info />
        <current-multiplier v-if="!isVisible" />
      </template>
      <template v-if="isVisible" #side>
        <side-wrappers>
          <counter-players />
        </side-wrappers>

        <cashout-module />
      </template>
      <template #game>
        <scale-crash />
        <crash-game />
      </template>
      <mobile-module v-if="!isVisible" />
      <bets-module v-if="!isVisible" />
      <x-history v-if="isVisible" />
    </game-background>

    <bets-history> </bets-history>
  </main>
</template>
<style lang="scss" scoped></style>
