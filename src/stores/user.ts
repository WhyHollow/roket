import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const balance = ref(1000)
  const betAmount = ref(0)
  const cashoutMultiplier = ref(0)
  const isBetting = ref(false)
  const hasCrashed = ref(false)
  const currentMultiplier = ref(1)

  function adjustBalance(amount: number) {
    balance.value += amount
    console.log('Balance:' + balance.value.toFixed(2) + '$')
  }

  return {
    balance,
    betAmount,
    cashoutMultiplier,
    isBetting,
    hasCrashed,
    currentMultiplier,
    adjustBalance
  }
})
