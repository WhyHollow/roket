import { defineStore } from 'pinia'

export const useCashoutStore = defineStore('cashout', {
  state: () => ({
    autoCashout: false,
    autoCashout50: false,
    autoCashoutValue: 1.05,
    autoCashout50Value: 1.05
  }),
  actions: {
    setAutoCashout(value: boolean) {
      this.autoCashout = value
    },
    setAutoCashout50(value: boolean) {
      this.autoCashout50 = value
    },
    setAutoCashoutValue(value: number) {
      this.autoCashoutValue = value
    },
    setAutoCashout50Value(value: number) {
      this.autoCashout50Value = value
    }
  }
})
