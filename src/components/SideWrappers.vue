<template name="SideWrapper">
  <div class="side__wrapper">
    <slot></slot>
  </div>
</template>
<style lang="scss" scoped>
.side__wrapper {
  padding: 8px 12px;
  border: 1px solid rgba(28, 39, 52, 1);
  border-radius: 18px;
  width: 204px;
  background-color: rgba(3, 15, 26, 1);
  @media screen and (max-width: 768px) {
    width: auto;
    border: none;
  }
}
</style>
