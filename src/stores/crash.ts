import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useBetStore } from './bet'

import { useUserStore } from './user'
export const useCrashStore = defineStore('crash', () => {
  const currentMultiplier = ref(1.0)
  const isPlaying = ref(false)
  const isCrashed = ref(false)
  const multiplierHistory = ref<number[]>([])
  const timeUntilNextGame = ref(0)
  let gameInterval: NodeJS.Timeout | undefined
  let crashTimeout: NodeJS.Timeout | undefined
  let startTime: number = 0

  const betStore = useBetStore()

  const userStore = useUserStore()

  function startGame() {
    resetGame()
    isPlaying.value = true
    userStore.adjustBalance(-betStore.currentBet)
    startTime = Date.now()
    gameInterval = setInterval(() => {
      const elapsedTime = (Date.now() - startTime) / 1000
      const growthRate = 0.01 * (1 + elapsedTime / 10)
      updateMultiplier(currentMultiplier.value + growthRate)
    }, 100)
    setRandomCrash()
  }

  function stopGame() {
    console.log('Crash')
    isPlaying.value = false
    isCrashed.value = true

    addToHistory(currentMultiplier.value)
    betStore.addBetToHistory(currentMultiplier.value)
    setTimeout(() => {
      betStore.clearBet()
    }, 100)

    setTimeout(() => {
      resetGame()
    }, 3500)
  }

  function updateMultiplier(newMultiplier: number) {
    if (!isPlaying.value || isCrashed.value) return
    currentMultiplier.value = newMultiplier
  }

  function addToHistory(multiplier: number) {
    multiplierHistory.value.push(multiplier)
  }

  function resetGame() {
    currentMultiplier.value = 1.0
    isCrashed.value = false
    isPlaying.value = false
    clearInterval(gameInterval)
    clearTimeout(crashTimeout)
  }

  function setRandomCrash() {
    const randomCrashTime = Math.floor(Math.random() * 5000) + 1000 // Crash between 1 and 6 seconds
    crashTimeout = setTimeout(() => {
      stopGame()
    }, randomCrashTime)
  }

  return {
    currentMultiplier,
    isPlaying,
    isCrashed,
    multiplierHistory,
    timeUntilNextGame,
    startGame,
    stopGame,
    updateMultiplier,
    resetGame
  }
})
