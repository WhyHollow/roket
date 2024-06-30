<script setup lang="ts" name="CrashGame">
import CurrentMultiplier from '@/components/CurrentMultiplier.vue'
import RocketAnimation from '@/components/RocketAnimation.vue'
import BetsModule from '@/components/BetsModule.vue'
import { computed } from 'vue'
import useWindowSize from '@/utils/windowSize'
const { windowWidth } = useWindowSize()
const isVisible = computed(() => windowWidth.value >= 768)
</script>

<template>
  <div class="crash-game">
    <current-multiplier v-if="isVisible" />
    <rocket-animation />
    <bets-module v-if="isVisible" />
  </div>
</template>
<style lang="scss" scoped>
.crash-game {
  display: flex;
  flex: 1;
  align-items: center;
  flex-direction: column;
}
</style>
