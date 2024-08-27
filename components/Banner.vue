<script setup lang="ts">
import gsap from 'gsap'

const banner = ref<HTMLDivElement | null>(null)

let isScrolled = false

onMounted(() => {
  window.addEventListener('scroll', () => {
    if (window.scrollY < 5) {
      gsap.to(banner.value, {
        scale: 1,
      })
    } else if (document.querySelector('.map')?.classList.contains('fixed')) {
      gsap.to(banner.value, {
        scale: 0,
        transformOrigin: 'bottom',
      })
    } else {
      gsap.to(banner.value, {
        scale: 0.8,
      })
    }
  })

  // oversol

  window.addEventListener('mousemove', (e) => {
    const bannerSize = banner.value?.getBoundingClientRect()!
    const distanceX = bannerSize?.left + bannerSize?.width / 2 - e.clientX
    const distanceY = bannerSize?.top + bannerSize?.height / 2 - e.clientY

    if (Math.abs(distanceX) < 200 && Math.abs(distanceY) < 200) {
      gsap.to(banner.value, {
        x: -distanceX / 4,
        y: -distanceY / 4,
        ease: 'sine.out',
      })
    } else {
      gsap.to(banner.value, {
        x: 0,
        y: 0,
        ease: 'sine.out',
      })
    }
  })
})
</script>

<template>
  <div ref="banner" class="banner">
    <div class="banner__block"></div>
    <p class="banner__text">Заказать уборку</p>
  </div>
</template>

<style lang="scss">
.banner {
  display: grid;
  justify-content: center;
  align-items: center;
  width: 195px;
  height: 195px;
  border-radius: 50%;
  color: #fff;
  position: fixed;
  left: 50%;
  bottom: -50px;
  z-index: 1000000;
  text-align: center;
  transform: translateX(-50%);

  & > * {
    grid-column: 1 / -1;
    grid-row: 1 / -1;
  }
}

.banner__block {
  width: 100%;
  height: 100%;
  background-color: $primary;
  border-radius: 50%;
}

.banner__text {
  padding: 30px;
  font-size: 16px;
  line-height: 1.3;
  font-weight: 500;
  text-transform: uppercase;
  animation: rotate 30s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
