<script setup lang="ts">
const links = [
  'После ремонта',
  'Генеральная уборка',
  'Регулярная уборка',
  'Мойка окон',
]

const isMenuOpen = ref(false)
const isPaintHeader = ref(false)

const togglePaintHeader = () => {
  isPaintHeader.value = window.scrollY > 5
}

const handleESC = (event) => {
  if (event.key === 'Escape' || event.key === 'Esc') {
    isMenuOpen.value = false
  }
}

const handleClickOutside = (event) => {
  if (!event.target.closest('.header')) {
    isMenuOpen.value = false
  }
}

watch(isMenuOpen, (newValue) => {
  document.body.style.overflow = newValue ? 'hidden' : ''
})

onMounted(() => {
  togglePaintHeader()
  window.addEventListener('scroll', togglePaintHeader)
  document.addEventListener('keydown', handleESC)
  window.addEventListener('click', handleClickOutside)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', togglePaintHeader)
  document.removeEventListener('keydown', handleESC)
  window.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <header class="header" :class="{ shadow: isPaintHeader }">
    <Logo class="header__logo" />

    <Tabs />

    <nav class="header__nav" :class="{ show: isMenuOpen }">
      <ul class="header__nav-list">
        <li v-for="link in links" :key="link" class="header__nav-item">
          <p class="text-link header__nav-link">{{ link }}</p>
        </li>
      </ul>
    </nav>

    <div class="text-caption header__info">
      <p>+380 67 401 69 77</p>
      <span>|</span>
      <p>24/7</p>
    </div>

    <Burger
      @click="isMenuOpen = !isMenuOpen"
      class="header__burger"
      :class="{ active: isMenuOpen }"
    />
  </header>
</template>

<style lang="scss">
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding: 0px 16px;
  transition: 0.3s ease;
  transition-property: background-color, box-shadow;

  @media (min-width: 1200px) {
    height: 70px;
    padding: 0px 30px 0 54px;
  }
}

.header.shadow {
  background-color: #fff;
  box-shadow: 0 2px 14px rgba(0, 0, 0, 0.2);
}

.header__nav {
  @media (max-width: 1199px) {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    display: none;
    width: 100%;
    max-width: 300px;
    padding: 80px 30px 40px 30px;
    background-color: #fff;
    transition: 0.3s;
    // transition-property: transform;
    transition-behavior: allow-discrete;
    transform: scaleX(0);
    transform-origin: right;
  }
}

.header__nav.show {
  @media (max-width: 1199px) {
    display: block;
    transform: scaleX(1);

    @starting-style {
      transform: scaleX(0);
    }
  }
}

.header__nav-list {
  display: flex;
  gap: 16px;

  @media (max-width: 1199px) {
    flex-direction: column;
    gap: 32px;
  }

  @media (min-width: 1440px) {
    gap: 32px;
  }
}

.header__nav-link {
  transition: 0.3s color ease;
  cursor: pointer;

  @media (pointer: fine) {
    &:hover {
      color: #5a30f0;
    }
  }
}

.header__info {
  display: none;

  @media (min-width: 1200px) {
    display: flex;
    gap: 8px;
  }

  @media (min-width: 1440px) {
    gap: 12px;
  }
}

.header__burger {
  @media (min-width: 1200px) {
    display: none;
  }
}
</style>
