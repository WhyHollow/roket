<script setup lang="ts" name="CounterPlayers">
import { ref } from 'vue'
import IconPeople from '@/components/icons/IconPeople.vue'
const currentPlayers = ref<number>(1)
</script>
<template>
  <div class="game__players">
    <div><icon-people /></div>
    <div>{{ currentPlayers }} Players</div>
  </div>
</template>
<style lang="scss" scoped>
.game {
  &__players {
    display: flex;
    align-items: center;
    gap: 8px;
    color: rgba(255, 255, 255, 1);
    font-family: 'Montagu Slab', serif;
    font-optical-sizing: auto;

    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
  }
}
</style>
