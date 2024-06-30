<template>
  <div class="rocket-container">
    <img
      v-show="rocketVisible"
      src="@/assets/Rocket.png"
      alt="Rocket"
      :class="{ vertical: isVertical }"
      class="rocket"
      ref="rocket"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect, onMounted, onUnmounted } from 'vue'
import { useCrashStore } from '@/stores/crash'

const crashStore = useCrashStore()
const rocket = ref<HTMLImageElement | null>(null)
const rocketVisible = ref<boolean>(false)
const windowWidth = ref<number>(window.innerWidth)
const isVertical = computed(() => windowWidth.value <= 480)

const defaultScale = computed(() => (isVertical.value ? 1 : 2))
const rotateAngle = computed(() => (isVertical.value ? 0 : 60))

let startAnimationId: number | undefined = undefined
let flightAnimationId: number | undefined = undefined
let endAnimationId: number | undefined = undefined

const updateWidth = () => {
  windowWidth.value = window.innerWidth
}

const startRocketAnimation = () => {
  rocketVisible.value = true
  let startTranslateX = -500
  let startTranslateY = window.innerHeight + 100
  let startOpacity = 0

  function animateStartRocket() {
    startTranslateX += 250
    startTranslateY -= 40
    startOpacity += 0.1

    if (startTranslateX >= 0) {
      startTranslateX = 0
    }
    if (startTranslateY <= 0) {
      startTranslateY = 0
    }
    if (startOpacity >= 1) {
      startOpacity = 1
    }

    if (rocket.value) {
      rocket.value.style.transform = `rotate(${rotateAngle.value}deg)scale(${defaultScale.value})translateX(${startTranslateX}px) translateY(${startTranslateY}px )`
      rocket.value.style.opacity = startOpacity.toString()
    }

    if (startTranslateX < 0 || startTranslateY > 0 || startOpacity < 1) {
      startAnimationId = requestAnimationFrame(animateStartRocket)
    } else {
      flightAnimationId = requestAnimationFrame(rocketFlightAnimation)
    }
  }

  startAnimationId = requestAnimationFrame(animateStartRocket)
}

const rocketFlightAnimation = () => {
  let translateY = 0
  let translateX = 0
  let directionY = 1
  let directionX = 1
  let scaleValue = 0

  function animateRocket(timestamp: number) {
    translateY += directionY * Math.sin(timestamp / 100)
    translateX += directionX * Math.cos(timestamp / 100)

    if (Math.abs(translateY) >= 10) {
      directionY *= -1
    }
    if (Math.abs(translateX) >= 5) {
      directionX *= -1
    }

    scaleValue = defaultScale.value + 0.1 * Math.sin(timestamp / 100)

    if (rocket.value) {
      rocket.value.style.transform = `rotate(${rotateAngle.value}deg) scale(${scaleValue}) translateY(${translateY}px) translateX(${translateX}px)`
    }

    flightAnimationId = requestAnimationFrame(animateRocket)
  }

  flightAnimationId = requestAnimationFrame(animateRocket)
}

const endRocketAnimation = () => {
  let endTranslateY = 0
  let endOpacity = 1

  function animateEndRocket() {
    endTranslateY -= 15
    endOpacity -= 0.01

    if (rocket.value) {
      rocket.value.style.transform = `rotate(${rotateAngle.value}deg) scale(${defaultScale.value}) translateY(${endTranslateY}px)`
      rocket.value.style.opacity = endOpacity.toString()
    }

    if (endOpacity > 0) {
      endAnimationId = requestAnimationFrame(animateEndRocket)
    } else {
      if (endAnimationId !== undefined) {
        cancelAnimationFrame(endAnimationId)
        endAnimationId = undefined
        rocketVisible.value = false
      }
    }
  }

  endAnimationId = requestAnimationFrame(animateEndRocket)
}
onMounted(() => {
  window.addEventListener('resize', updateWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateWidth)
})
watchEffect(() => {
  if (crashStore.isPlaying) {
    startRocketAnimation()
  } else {
    if (startAnimationId !== undefined) {
      cancelAnimationFrame(startAnimationId)
      startAnimationId = undefined
    }
    if (flightAnimationId !== undefined) {
      cancelAnimationFrame(flightAnimationId)
      flightAnimationId = undefined
    }
    if (endAnimationId !== undefined) {
      cancelAnimationFrame(endAnimationId)
      endAnimationId = undefined
    }
  }
})
watchEffect(() => {
  if (crashStore.isCrashed) {
    endRocketAnimation()
  }
})
watchEffect(() => {
  windowWidth.value = window.innerWidth
})
</script>

<style scoped lang="scss">
.rocket-container {
  position: relative;
  width: 100%;
  height: 650px;
  overflow: hidden;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
}

.rocket {
  position: absolute;
  width: 100px;

  will-change: transform;
  transform-origin: center bottom;
  z-index: 10;
  top: 200px;
  left: calc(50% - 280px);
  @media screen and (max-width: 768px) {
  }
  @media screen and (max-width: 480px) {
    left: calc(50% - 50px);
  }
}
</style>
