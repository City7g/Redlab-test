<script setup lang="ts">
const list = ['Дом', 'Офис']

const activeItem = ref(list[0])
</script>

<template>
  <div class="tabs">
    <div
      v-for="item in list"
      :key="item"
      @click="activeItem = item"
      class="tabs__item"
      :class="{ active: activeItem === item }"
    >
      <p class="tabs__text">{{ item }}</p>
    </div>
  </div>
</template>

<style lang="scss">
.tabs {
  display: flex;
  gap: 4px;
  padding: 3px;
  background-color: #fff;
  border-radius: 19px;
}

.tabs__item {
  padding: 8px 12px;
  border-radius: 16px;
  transition: 0.3s ease;
  transition-property: color, background-color;
  cursor: pointer;
  color: #636c81;
}

.tabs__item.active {
  color: #fff;
  background-color: $primary;
}

.tabs__text {
  font-size: 14px;
  line-height: 1.1;
  font-weight: 500;
}
</style>
