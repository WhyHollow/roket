<script setup lang="ts" name="GameBackground"></script>

<template>
  <div class="game-background">
    <div class="game-background__container">
      <div class="game-background__section">
        <slot name="info"></slot>
        <slot name="side"></slot>
      </div>
      <div class="game-background__game">
        <slot name="game"></slot>
      </div>
    </div>
    <slot></slot>
  </div>
</template>
<style lang="scss" scoped>
.game-background {
  background:
    url('@/assets/backgroundSpace.png') center top / 100% 100% no-repeat,
    linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    linear-gradient(180deg, rgba(0, 0, 0, 0) 61.16%, #01101e 100%);
  background-blend-mode: overlay;
  position: relative;

  width: 100%;
  top: -269px;
  overflow: hidden;
  margin-bottom: -269px;
  @media screen and (max-width: 768px) {
    top: -4px;
    margin-bottom: -4px;
  }
  &__container {
    display: flex;
    padding: 48px 46px;
    padding-top: 269px;
    @media screen and (max-width: 768px) {
      padding-top: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 24px;
    }
  }

  &__section {
    margin-right: 24px;
    @media screen and (max-width: 768px) {
      margin-right: 0;
    }
  }
  &__game {
    padding-top: 62px;
    display: flex;
    width: 100%;
  }
}
</style>
