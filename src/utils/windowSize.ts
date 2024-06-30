import { ref, computed, onMounted, onUnmounted } from 'vue'

const windowWidth = ref(window.innerWidth)

const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth
}

const startListeningToResize = () => {
  window.addEventListener('resize', updateWindowWidth)
}

const stopListeningToResize = () => {
  window.removeEventListener('resize', updateWindowWidth)
}

const useWindowSize = () => {
  onMounted(() => {
    startListeningToResize()
  })

  onUnmounted(() => {
    stopListeningToResize()
  })

  return {
    windowWidth: computed(() => windowWidth.value)
  }
}

export default useWindowSize
