<script setup lang="ts">
import { gsap, ScrollTrigger, Flip } from 'gsap/all'

const list = [
  {
    id: 0,
    title: 'Кухня',
    img: 1,
    dots: [
      {
        top: 53,
        left: 25,
        text: 'Чистим плиту',
      },
      {
        top: 32,
        left: 28,
        text: 'Чистим фасад вытяжки',
      },
      {
        top: 58,
        left: 45,
        text: 'Чистим тумбу',
      },
    ],
  },
  {
    id: 1,
    title: 'Комнаты',
    img: 2,
    dots: [
      {
        top: 53,
        left: 25,
        text: 'Чистим плиту',
      },
      {
        top: 32,
        left: 28,
        text: 'Чистим фасад вытяжки',
      },
      {
        top: 58,
        left: 45,
        text: 'Чистим тумбу',
      },
    ],
  },
  {
    id: 2,
    title: 'Ванная',
    img: 1,
    dots: [
      {
        top: 53,
        left: 25,
        text: 'Чистим плиту',
      },
      {
        top: 32,
        left: 28,
        text: 'Чистим фасад вытяжки',
      },
      {
        top: 58,
        left: 45,
        text: 'Чистим тумбу',
      },
    ],
  },
  {
    id: 3,
    title: 'Прихожая',
    img: 2,
    dots: [
      {
        top: 53,
        left: 25,
        text: 'Чистим плиту',
      },
      {
        top: 32,
        left: 28,
        text: 'Чистим фасад вытяжки',
      },
      {
        top: 58,
        left: 45,
        text: 'Чистим тумбу',
      },
    ],
  },
]

const startAnim = () => {
  const mapSection = document.querySelector('.map')
  const image = document.querySelector('.map__images')

  const state = Flip.getState('.map__image')

  mapSection?.classList.add('fixed')

  document.querySelector('.map__image')?.append('map__images')

  // Flip.fit('.map__img1', '.map__image img', {
  //   scale: true,
  // })

  Flip.to(state, {
    // targets: '.map__img1',
    duration: 0.5,
    scale: true,
  })
  // .fromTo(
  //   '.map__content',
  //   {
  //     xPercent: -100,
  //   },
  //   {
  //     xPercent: 0,
  //     delay: 0.3,
  //   }
  // )
  // .fromTo(
  //   '.map__link',
  //   {
  //     opacity: 0,
  //     x: -40,
  //   },
  //   {
  //     opacity: 1,
  //     x: 0,
  //     stagger: 0.1,
  //     clearProps: 'all',
  //   }
  // )
}

const endAnim = () => {
  const mapSection = document.querySelector('.map')
  // const image = document.querySelector('.map__image')
  // const state = Flip.getState(image)

  mapSection?.classList.remove('fixed')

  // Flip.from(state, {
  //   duration: 0.3,
  //   scale: true,
  //   // absolute: true,
  // })

  // gsap.fromTo(
  //   '.map__content',
  //   {
  //     xPercent: 0,
  //   },
  //   {
  //     xPercent: -100,
  //   }
  // )
}

const activeItem = ref(0)

watch(activeItem, (newValue, oldValue) => {
  const newItem = document.querySelectorAll('.map__item')[newValue]
  const oldItem = document.querySelectorAll('.map__item')[oldValue]
  const tl = gsap.timeline()

  tl.set(oldItem, {
    zIndex: 1,
  })
    .set(oldItem.querySelectorAll('.dot'), {
      opacity: 0,
    })
    .set(newItem, {
      zIndex: 2,
    })
    .fromTo(
      newItem,
      {
        scale: 1.6,
        xPercent: 100,
      },
      {
        scale: 1,
        xPercent: 0,
        transformOrigin: 'left',
      }
    )
    .fromTo(
      newItem.querySelectorAll('.dot'),
      {
        opacity: 0,
      },
      {
        opacity: 1,
        stagger: 0.1,
      },
      '+=.3'
    )
})

onMounted(() => {
  gsap.set('.map__item:not(:first-child)', {
    opacity: 0,
  })
  document.querySelector('.map').style.height =
    document.querySelector('.map')?.scrollHeight + 'px'

  ScrollTrigger.create({
    trigger: '.map',
    start: 'top center',
    end: 'bottom',
    onEnter: () => {
      startAnim()
      // document.querySelector('.map')?.classList.add('fixed')
    },
    onLeaveBack: () => {
      endAnim()
      // document.querySelector('.map')?.classList.remove('fixed')
    },
  })
})
</script>

<template>
  <section class="map">
    <div class="map__images">
      <img src="/images/map/item-1.jpg" alt="" class="map__img1" />
    </div>

    <div class="map__wrap">
      <div class="map__content">
        <h3 class="title-h6 map__content-title">Как мы убираем</h3>
        <ul>
          <li
            v-for="item in list"
            :key="item.id"
            @click="activeItem = item.id"
            class="title-h2 map__link"
            :class="{ active: activeItem === item.id }"
          >
            {{ item.title }}
          </li>
        </ul>
      </div>
      <div class="map__image">
        <div v-for="item in list" :key="item.img" class="map__item">
          <div class="map__dots-img">
            <Dot
              v-for="dot in item.dots"
              :key="dot.text"
              :style="{
                top: dot.top + '%',
                left: dot.left + '%',
              }"
              :text="dot.text"
            />

            <img
              :src="`/images/map/item-${item.img}.jpg`"
              alt=""
              class="map__img"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.map {
  margin: 40px 16px;

  @media (min-width: 1200px) {
    margin: 75px 175px;
  }
}

.map__wrap {
}

.map__content {
  display: grid;
  background-color: #5a30f0;
  color: #fff;
  padding: 20px 16px;

  @media (max-width: 1199px) {
    flex-grow: 1;
  }

  @media (min-width: 1200px) {
    padding: 20px 30px;
    grid-template-rows: 1fr auto 1fr;
  }

  // @media (max-width: 1199px) {
  //   position: absolute;
  //   left: 0;
  //   top: 0;
  //   bottom: 0;
  //   width: 80%;
  // }

  @media (min-width: 1400px) {
    padding: 35px 60px;
  }
}

// .map__wrap {
//   display: none;
// }
.fixed .map__wrap {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  opacity: 0.4;
}
.map__wrap {
  display: flex;
  flex-direction: column;
  opacity: 0.1;
  pointer-events: none;

  @media (min-width: 1200px) {
    display: grid;
    grid-template-columns: 300px 1fr;
  }

  @media (min-width: 1400px) {
    grid-template-columns: 375px 1fr;
  }
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

  &.active,
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

  &.active::before,
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

.map__item {
  display: grid;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;

  & > * {
    grid-column: 1 / -1;
    grid-row: 1 / -1;
  }
}

.map__dots {
  // inset: 0;
}

.map__img {
  display: block;
  width: 100%;
  min-height: 100%;
  height: auto;
  // max-height: auto;
  object-fit: cover;
}

.map__dots-img {
  position: relative;
}
</style>
