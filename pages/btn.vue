<script setup lang="ts">
import gsap from 'gsap'

onMounted(() => {
  gsap.to(
    {},
    {
      // xPercent
      opacity: 0,
    }
  )
})
</script>

<template>
  <button class="btn">
    <span>Click</span>
    <span>Click</span>
  </button>
</template>

<style lang="scss">
.btn {
  display: grid;
  overflow: hidden;

  & > * {
    grid-column: 1 / -1;
    grid-row: 1 / -1;
  }
}

span {
  transition: 0.2s opacity ease, 0.3s transform ease;
}

span:nth-child(1) {
  opacity: 1;
  transform: translateY(0);
}

span:nth-child(2) {
  opacity: 0;
  transform: translateY(-30px);
}

.btn:hover {
  span:nth-child(1) {
    opacity: 0;
    transform: translateY(30px);
  }

  span:nth-child(2) {
    opacity: 1;
    transform: translateY(0px);
  }
}
</style>
