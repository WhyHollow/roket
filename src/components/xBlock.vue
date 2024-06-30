<script setup lang="ts" name="XBlock">
import { computed } from 'vue'

interface XBlockProps {
  value: number
}
const props = defineProps<XBlockProps>()

const gradientClass = computed(() => {
  if (props.value <= 1.5) {
    return 'orange'
  } else if (props.value <= 3.0) {
    return 'fiol'
  } else if (props.value <= 4.5) {
    return 'red'
  } else if (props.value <= 6.0) {
    return 'blue'
  } else {
    return 'purple'
  }
})
</script>
<template>
  <div class="x-block" :class="'x-block-' + gradientClass">{{ value.toFixed(2) }}x</div>
</template>
<style lang="scss" scoped>
.x-block {
  width: 82px;
  height: 36px;

  border-radius: 50px;

  font-family: Montagu Slab;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  text-align: left;

  color: rgba(255, 255, 255, 1);

  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 6px;
  padding-right: 6px;
  &-orange {
    background: linear-gradient(90deg, #e65c00 0%, #f9d423 100%);
  }
  &-fiol {
    background: linear-gradient(90deg, #bf5ae0 0%, #a811da 100%);
  }
  &-red {
    background: linear-gradient(90deg, #ec008c 0%, #fc6767 100%);
  }
  &-blue {
    background: linear-gradient(90deg, #7474bf 0%, #348ac7 100%);
  }
  &-purple {
    background: linear-gradient(90deg, #673ab7 0%, #512da8 100%);
  }
}
@media screen and (max-width: 768px) {
  .x-block {
    width: 72px;
    height: 32px;
    font-size: 12px;
    line-height: 18px;
    padding-left: 6px;
    padding-right: 6px;
  }
}

@media screen and (max-width: 480px) {
  .x-block {
    width: 62px;
    height: 28px;
    font-size: 10px;
    line-height: 16px;
    padding-left: 6px;
    padding-right: 6px;
  }
}
</style>
