<script setup lang="ts">
defineProps<{
  top: number
  left: number
  text: string
}>()
</script>

<template>
  <div :style="{ top: top + '%', left: left + '%' }" class="dot">
    <div class="dot__close"></div>
    <p class="dot__text">{{ text }}</p>
  </div>
</template>

<style lang="scss">
.dot {
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: $primary;
  box-shadow: 0 0 0 10px rgba($primary, 0.2);
  transition: 0.3s box-shadow ease;

  &:hover {
    box-shadow: 0 0 0 0 rgba($primary, 0.2);
  }
}

.dot__text {
  display: none;
  position: absolute;
  z-index: 100000;
  left: 50%;
  bottom: 100%;
  transform: translate(-50%, -10px);
  border-radius: 2px;
  padding: 8px 10px;
  background-color: #fff;
  width: max-content;
  max-width: 200px;
  font-size: 13px;
  line-height: 1.3;
  font-weight: 500;
  color: #1d1d1d;
  transition: 0.3s;
  transition-behavior: allow-discrete;
  opacity: 0;

  &::after {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 4px solid transparent;
    border-top-color: #fff;
    content: '';
  }

  &::before {
    position: absolute;
    top: 100%;
    left: 15%;
    right: 15%;
    display: block;
    width: 70%;
    height: 25px;
    content: '';
  }
}

.dot:hover .dot__text,
.dot__text:hover {
  display: block;
  opacity: 1;

  @starting-style {
    opacity: 0;
  }
}

.dot__close {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
  transition: 0.3s all ease;
}

.dot:hover .dot__close {
  transform: translate(-50%, -50%) rotate(0deg);
}

.dot__close::after,
.dot__close::before {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-45deg);
  width: 12px;
  height: 2px;
  background-color: #fff;
  content: '';
}

.dot__close::before {
  transform: translate(-50%, -50%) rotate(45deg);
}
</style>
