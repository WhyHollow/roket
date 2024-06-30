<script setup lang="ts" name="GameInfo">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const routeName = computed(() => route.name)
const currentTime = ref<string>('')
const currentId = ref<number>(0)

onMounted(() => {
  updateCurrentTime()
  setInterval(updateCurrentTime, 1000)
})
const updateCurrentTime = () => {
  const now = new Date()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')
  currentTime.value = `${hours}:${minutes}:${seconds}`
}
</script>
<template>
  <div class="game__info">
    <h2>{{ routeName }}</h2>
    <div class="game__info_status">
      <div>{{ currentTime }}</div>
      <div>ID:{{ currentId }}</div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.game {
  &__info {
    margin-bottom: 110px;
    @media screen and (max-width: 768px) {
      margin-bottom: 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    h2 {
      font-family: 'Montagu Slab', serif;
      font-optical-sizing: auto;
      font-weight: 500;
      font-style: normal;
      background: linear-gradient(0deg, #e35e2c 0%, #ffbd2b 100%);
      background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 32px;
      text-transform: capitalize;
      margin-bottom: 12px;
    }
    &_status {
      color: rgba(255, 255, 255, 1);

      font-family: 'Montagu Slab', serif;
      font-optical-sizing: auto;

      font-weight: 400;
      font-size: 12px;
      line-height: 20px;
      display: flex;
      gap: 30px;
    }
  }
}
</style>
