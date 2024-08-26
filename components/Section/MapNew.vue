<script setup lang="ts">
import { gsap, ScrollTrigger, Flip } from 'gsap/all'

const section = ref<HTMLDivElement | null>(null)
const popup = ref<HTMLDivElement | null>(null)
const img1 = ref<HTMLDivElement | null>(null)

const anim = (action: string = 'add') => {
  const state = Flip.getState(popup.value)

  section.value?.classList[action]('fixed')

  Flip.from(state, {
    duration: 3,
    // prune: true,
    // scale: true,
  })
    .from('.some__dot', {
      opacity: 0,
      stagger: 0.2,
    })
    .from('.some__menu', {
      xPercent: -100,
    })
}

onMounted(() => {
  ScrollTrigger.create({
    trigger: section.value,
    start: 'top center',
    end: 'bottom',
    markers: true,
    onEnter: () => {
      anim()
    },
    onLeaveBack: () => {
      anim('remove')
    },
  })
})
</script>

<template>
  <div ref="section" class="some">
    <!-- <img ref="img1" src="/images/map/item-1.jpg" alt="" class="some__img1" /> -->

    <div ref="popup" class="some__popup">
      <div class="some__menu"></div>
      <div class="some__items">
        <div class="some__item">
          <div class="some__dot"></div>
          <div class="some__dot"></div>
          <div class="some__dot"></div>
          <div class="some__dot"></div>
          <div class="some__dot"></div>
          <img
            ref="img2"
            src="/images/map/item-1.jpg"
            alt=""
            class="some__img"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.some {
  margin: 50px;
}

.some > img {
  width: 100%;
}

.some__popup {
  overflow: hidden;
  object-fit: contain;
}

.some__item {
  position: relative;
  height: 100%;
}

.some__dot {
  position: absolute;
  top: 0;
  left: 0;
  display: none;
  width: 20px;
  height: 20px;
  background-color: red;

  &:nth-child(2) {
    left: 20px;
  }
  &:nth-child(3) {
    left: 40px;
  }
  &:nth-child(4) {
    left: 60px;
  }
  &:nth-child(5) {
    left: 80px;
  }
  &:nth-child(6) {
    left: 100px;
  }
  &:nth-child(7) {
    left: 120px;
  }
}

.fixed .some__dot {
  display: block;
}

.some__menu {
  background-color: #5a30f0;
}

.fixed .some__popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10000;
  display: grid;
  grid-template-columns: 200px 1fr;
  height: 100%;
  width: 100%;
}

.some__popup img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
