<script setup lang="ts">
const some = ref(1)
const one = ref(1)

onUpdated(() => {
  console.log('onUpdated')
})

const ooo = () => {
  some.value += 1
}
</script>

<template>
  <h1 @click="ooo">Test - {{ some }}</h1>
  <h1 v-memo="[some]" @click="one++">One - {{ one }}</h1>
</template>
