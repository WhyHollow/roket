import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { useCashoutStore } from './cashout'
import { useCrashStore } from './crash'
import { useUserStore } from './user'

export const useBetStore = defineStore('bet', () => {
  const currentBet = ref(0)
  const betHistory = ref<{ multiplier: number; amount: number }[]>([])

  const cashoutStore = useCashoutStore()
  const crashStore = useCrashStore()
  const userStore = useUserStore()

  const isAutoCashoutEnabled = computed(() => cashoutStore.autoCashout)
  const isAutoCashoutHalfEnabled = computed(() => cashoutStore.autoCashout50)
  const autoCashoutValue = computed(() => cashoutStore.autoCashoutValue)
  const autoCashoutHalfValue = computed(() => cashoutStore.autoCashout50Value)

  function placeBet(amount: number) {
    currentBet.value = amount
  }

  function cashOut() {
    console.log('CashOut:' + currentBet.value * crashStore.currentMultiplier)
    userStore.adjustBalance(currentBet.value * crashStore.currentMultiplier)
    clearBet()
  }

  function cashOutHalf() {
    const cashValue = (currentBet.value / 2) * crashStore.currentMultiplier
    console.log('CashOut Half:' + cashValue)
    userStore.adjustBalance(cashValue)
    currentBet.value = currentBet.value / 2
  }

  function clearBet() {
    currentBet.value = 0
  }

  function addBetToHistory(multiplier: number) {
    if (currentBet.value > 0) {
      betHistory.value.push({ multiplier, amount: currentBet.value })
    }
  }

  watch(
    () => crashStore.currentMultiplier,
    (newMultiplier) => {
      if (isAutoCashoutEnabled.value && newMultiplier >= autoCashoutValue.value) {
        cashOut()
      }
      if (isAutoCashoutHalfEnabled.value && newMultiplier >= autoCashoutHalfValue.value) {
        cashOutHalf()
      }
    }
  )

  return {
    currentBet,
    betHistory,
    placeBet,
    clearBet,
    addBetToHistory,
    cashOut,
    cashOutHalf,
    isAutoCashoutEnabled,
    isAutoCashoutHalfEnabled,
    autoCashoutValue,
    autoCashoutHalfValue
  }
})
