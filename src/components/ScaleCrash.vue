<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue'
import { useCrashStore } from '@/stores/crash'

const crashStore = useCrashStore()

const scaledItems = ref<string[]>(['1.80', '1.60', '1.40', '1.20', '1.00'])
let closestMultiplier = ref<string>('1.00')

const updateScaledItems = (currentMultiplier: number) => {
  if (currentMultiplier <= 1.4) {
    scaledItems.value = ['1.80', '1.60', '1.40', '1.20', '1.00']
    let closestIndex = -1
    let closestDiff = Infinity
    scaledItems.value.forEach((item, index) => {
      const diff = Math.abs(parseFloat(item) - currentMultiplier)
      if (diff < closestDiff) {
        closestDiff = diff
        closestIndex = index
      }
    })
    closestMultiplier.value = scaledItems.value[closestIndex]
    return
  }

  const newScaledItems: string[] = []
  for (let i = 0; i < 5; i++) {
    const value = (currentMultiplier + (2 - i) * 0.2).toFixed(2)
    newScaledItems.push(value)
  }

  scaledItems.value = newScaledItems

  let closestIndex = -1
  let closestDiff = Infinity
  newScaledItems.forEach((item, index) => {
    const diff = Math.abs(parseFloat(item) - currentMultiplier)
    if (diff < closestDiff) {
      closestDiff = diff
      closestIndex = index
    }
  })

  closestMultiplier.value = newScaledItems[closestIndex]

  for (let i = closestIndex + 1; i < newScaledItems.length; i++) {
    newScaledItems[i] = (parseFloat(newScaledItems[i - 1]) + 0.2).toFixed(2)
  }

  scaledItems.value = newScaledItems
}

// const currentIndex = computed(() => {
//   return scaledItems.value.findIndex((item) => parseFloat(item) <= crashStore.currentMultiplier)
// })

watch(
  () => crashStore.currentMultiplier,
  (newMultiplier: number) => {
    updateScaledItems(newMultiplier)
  }
)
watchEffect(() => {
  if (crashStore.isCrashed) {
    setTimeout(() => {
      scaledItems.value = ['1.80', '1.60', '1.40', '1.20', '1.00']
    }, 3500)
  }
})
</script>
<template>
  <div class="scale-container">
    <div v-for="(item, index) in scaledItems" :key="index" class="scale-container__item">
      <div class="scale-container__label-container">
        <div
          class="scale-container__white-dot"
          :class="{
            'scale-container__white-dot-big': +item === +closestMultiplier && index >= 2
          }"
        ></div>

        <div
          class="scale-container__label"
          :class="{
            'scale-container__label-big': +item === +closestMultiplier && index >= 2
          }"
        >
          {{ item }}x
        </div>
      </div>
      <div class="scale-container__gray-dots-container" v-if="index != scaledItems.length - 1">
        <div
          class="scale-container__gray-dot"
          v-for="i in 5"
          :key="i"
          :class="{
            animate: +i === +closestMultiplier && index >= 2
          }"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scale-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  flex: none;
  width: 10%;
}

.scale-container__item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: all 0.5s ease;
}

.scale-container__label-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.scale-container__white-dot {
  width: 8px;
  height: 8px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 14px 0px rgba(216, 216, 216, 1);
  border-radius: 50%;
  transition: all 2.5s ease;
}

.scale-container__white-dot--active {
  width: 12px;
  height: 12px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 14px 4px rgba(216, 216, 216, 1);
}
.scale-container__white-dot-big {
  width: 10px;
  height: 10px;
}
.scale-container__label {
  font-family: Montagu Slab;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
  transition: all 0.5s ease;
}
.scale-container__label-big {
  font-size: 30px;
}
.scale-container__item--active .scale-container__label {
  font-size: 18px;
  font-weight: 700;
}

.scale-container__gray-dots-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 1px;
}

.scale-container__gray-dot {
  width: 6px;
  height: 6px;
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 0px 14px 0px rgba(216, 216, 216, 0.5);
  border-radius: 50%;
  margin-bottom: 16px;
}

.scale-container__gray-dot:first-child {
  margin-top: 16px;
}

.scale-container__gray-dot:last-child {
  margin-bottom: 0;
}
@keyframes grow {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

.animate {
  animation: grow 0.6s ease-in-out;
}
</style>
