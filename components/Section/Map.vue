<script setup lang="ts">
import { gsap, ScrollTrigger, Flip } from 'gsap/all'

const startAnim = () => {
  const mapSection = document.querySelector('.map__wrap')
  const image = document.querySelector('.map__image')
  const tl = gsap.timeline({
    // delay: 0.15,
  })
  const state = Flip.getState(image)

  mapSection?.classList.add('fixed')

  Flip.from(state, {
    duration: 0.5,
    scale: true,
    // fade: 'data-flip-id',
    // absolute: true,
  })

  tl.fromTo(
    '.map__content',
    {
      xPercent: -100,
    },
    {
      display: 'grid',
      xPercent: 0,
      delay: 0.3,
    }
  ).fromTo(
    '.map__link',
    {
      opacity: 0,
      x: -40,
    },
    {
      opacity: 1,
      x: 0,
      stagger: 0.1,
    }
  )
}

const endAnim = () => {
  const mapSection = document.querySelector('.map__wrap')
  const image = document.querySelector('.map__image')
  const state = Flip.getState(image)

  mapSection?.classList.remove('fixed')

  Flip.from(state, {
    duration: 0.3,
    scale: true,
    // absolute: true,
  })

  gsap.fromTo(
    '.map__content',
    {
      xPercent: 0,
    },
    {
      display: 'none',
      xPercent: -100,
    }
  )
}

const activeItem = ref(0)

onMounted(() => {
  document.querySelector('.map').style.height =
    document.querySelector('.map__wrap')?.scrollHeight + 'px'
  // ScrollTrigger.create({
  //   trigger: '.map',
  //   // markers: true,
  //   start: 'top center',
  //   end: 'bottom',
  //   onEnter: () => {
  //     startAnim()
  //     document.querySelector('.map')?.classList.add('fixed')
  //   },
  //   onLeaveBack: () => {
  //     endAnim()
  //     document.querySelector('.map')?.classList.remove('fixed')
  //   },
  // })

  window.addEventListener('click', () => {
    Math.random() > 0.5 ? startAnim() : endAnim()
  })
})
</script>

<template>
  <section class="map">
    <div class="map__wrap">
      <div class="map__content">
        <h3 class="title-h6 map__content-title">Как мы убираем</h3>
        <ul>
          <li @click="activeItem = 0" class="title-h2 map__link">Кухня</li>
          <li @click="activeItem = 1" class="title-h2 map__link">Комнаты</li>
          <li @click="activeItem = 0" class="title-h2 map__link">Ванная</li>
          <li @click="activeItem = 1" class="title-h2 map__link">Прихожая</li>
        </ul>
      </div>
      <div class="map__image">
        <!-- <TransitionGroup name="map" mode="in-out"> -->
        <img src="/images/map/item-1.jpg" alt="" class="map__img" />
        <img src="/images/map/item-2.jpg" alt="" class="map__img" />
        <!-- </TransitionGroup> -->
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.map {
  margin: 75px 175px;
}

.map__content {
  display: none;
  grid-template-rows: 1fr auto 1fr;
  position: fixed;
  top: 0;
  left: 0;
  width: 350px;
  bottom: 0;
  z-index: 1000;
  background-color: #5a30f0;
  color: #fff;
  padding: 20px 30px;

  @media (min-width: 1400px) {
    padding: 35px 60px;
  }
}

// .fixed .map__content {
//   display: grid;
// }

.fixed .map__image {
  position: fixed;
  top: 0;
  left: 350px;
  right: 0;
  bottom: 0;
  z-index: 1000;
  object-fit: cover;
  object-position: left center;
}

// .map__image.fixed .map__img {
//   width: 100%;
//   height: 100%;
// }

.map__link {
  padding: 12px 20px;
  position: relative;
  transition: 0.5s all ease;
  color: rgba(#fff, 0.6);
  cursor: pointer;

  &:hover {
    transform: translateX(50px);
    color: #fff;
  }

  &::before {
    position: absolute;
    top: 50%;
    left: -30px;
    transform: translateY(-50%);
    color: rgba(#fff, 0);
    transition: 0.5s all ease;
    content: '→';
  }

  &:hover::before {
    color: #fff;
  }
}

.map__image {
  display: grid;
  overflow: hidden;

  & > * {
    grid-column: 1 / -1;
    grid-row: 1 / -1;
  }
}

.map__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.map-leave-active {
  transition: all 0.3s ease;
}
.map-leave-to {
  opacity: 1;
  transform: scale(1);
}

.map-enter-active {
  transform-origin: left center;
  transition: all 0.3s ease;
}
.map-enter-from {
  opacity: 0;
  transform: scale(1.2);
}

// .map-enter-active,
// .map-leave-active {
//   transition: all 0.5s ease;
// }
// .map-enter-from,
// .map-leave-to {
//   opacity: 0;
//   transform: translateX(30px);
// }
</style>
