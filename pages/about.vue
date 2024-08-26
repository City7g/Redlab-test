<script setup lang="ts">
const list = ['Text 1', 'Lore123m', 'Dima']
const active = ref(0)
</script>

<template>
  <div
    @click="active === list.length - 1 ? (active = 0) : active++"
    class="wrap"
  >
    <div class="wrap__lost">
      <TransitionGroup name="list" mode="out-in">
        <template v-for="(item, index) in list" :key="item">
          <p v-if="index === active">{{ item }}</p>
        </template>
      </TransitionGroup>
    </div>
  </div>
</template>

<style lang="scss">
.wrap {
  display: grid;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.wrap__lost {
  display: grid;
  text-align: center;
  outline: 1px solid red;

  & > * {
    grid-column: 1 / -1;
    grid-row: 1 / -1;
  }
}

p:nth-child(1) {
  outline: 1px solid yellow;
}

p:nth-child(2) {
  outline: 1px solid green;
}

p:nth-child(1) {
  outline: 1px solid blue;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.9s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
