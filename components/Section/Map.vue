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

let isAnim = false

const section = ref<HTMLDivElement | null>(null)
const popup = ref<HTMLDivElement | null>(null)

const activeTab = ref(list[0].id)

const anim = (action: string = 'add') => {
  const state = Flip.getState(document.querySelector('.map__images'))

  section.value?.classList[action]('fixed')

  const tl = Flip.from(state, {
    duration: 1,
  })

  if (action === 'add') {
    tl.from('.dot', {
      opacity: 0,
      stagger: 0.2,
    })
      .from(
        '.map__info',
        {
          xPercent: -100,
        },
        0.5
      )
      .fromTo(
        '.map__link-wrap',
        {
          x: -40,
          alpha: 0,
        },
        {
          x: 0,
          alpha: 1,
          stagger: 0.1,
        },
        0.8
      )
  }
}

watch(activeTab, (newValue, oldValue) => {
  const newItem = document.querySelectorAll('.map__item')[newValue]
  const oldItem = document.querySelectorAll('.map__item')[oldValue]
  const tl = gsap.timeline({
    onStart: () => (isAnim = true),
    onComplete: () => (isAnim = false),
  })

  tl.set(oldItem, {
    zIndex: 1,
  })
    .set(oldItem.querySelectorAll('.map__dot'), {
      opacity: 0,
    })
    .set(newItem, {
      zIndex: 2,
      display: 'block',
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
      newItem.querySelectorAll('.map__dot'),
      {
        opacity: 0,
      },
      {
        opacity: 1,
        stagger: 0.1,
      },
      '+=.3'
    )
    .set(oldItem, {
      display: 'none',
    })
})

onMounted(() => {
  document.querySelector('.map__height').style.height =
    document.querySelector('.map__height')?.scrollHeight + 'px'

  ScrollTrigger.create({
    trigger: document.body,
    start: 'bottom bottom+=150',
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
  <div class="map__height">
    <div ref="section" class="map">
      <div ref="popup" class="map__popup">
        <div class="map__info">
          <h3 class="title-h6 map__title">Как мы убираем</h3>
          <div class="map__menu">
            <div v-for="item in list" :key="item.id" class="map__link-wrap">
              <p
                @click="isAnim || (activeTab = item.id)"
                class="title-h2 map__link"
                :class="{ active: activeTab === item.id }"
              >
                {{ item.title }}
              </p>
            </div>
          </div>
        </div>
        <div class="map__images">
          <div class="map__items">
            <template v-for="item in list" :key="item.id">
              <div class="map__item">
                <Dot
                  v-for="dot in item.dots"
                  :key="dot.text"
                  :text="dot.text"
                  :top="dot.top"
                  :left="dot.left"
                  class="map__dot"
                />
                <img
                  ref="img2"
                  :src="`/images/map/item-${item.img}.jpg`"
                  alt=""
                  class="map__img"
                />
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.map__height {
  margin: 50px;

  @media (min-width: 1200px) {
    margin: 50px 75px;
  }
}

.map > img {
  width: 100%;
}

.map__popup {
  object-fit: contain;
}

.map__item {
  position: relative;
  height: 100%;
}

.map__dot {
  display: none;
}

.fixed .map__dot {
  display: block;
}

.map__info {
  display: none;
  padding: 25px 40px;
  background-color: $primary;
  color: #fff;

  @media (min-width: 992px) {
    grid-template-rows: 1fr auto 1fr;
  }

  @media (min-width: 1400px) {
    padding: 35px 60px;
  }
}

.fixed .map__info {
  display: grid;
}

.map__link {
  position: relative;
  transition: 0.3s ease;
  transition-property: color, transform;
  color: rgba(#fff, 0.7);
  padding: 11px 0;
  cursor: pointer;

  &:hover {
    color: #fff;
  }

  &::before {
    position: absolute;
    left: -55px;
    top: 50%;
    transform: translateY(-50%);
    content: '→';
    color: inherit;
    transition: 0.3s ease;
    transition-property: opacity, transform;
    opacity: 0;
  }
}

.map__link.active {
  position: relative;
  font-style: italic;
  transform: translateX(50px);

  &::before {
    opacity: 1;
  }
}

.fixed .map__popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10000;
  display: grid;
  height: 100%;
  width: 100%;
  overflow: hidden;

  @media (max-width: 991px) {
    grid-template-rows: 1fr 1fr;
  }

  @media (min-width: 992px) {
    grid-template-columns: 300px 1fr;
  }

  @media (min-width: 1400px) {
    grid-template-columns: 375px 1fr;
  }
}

.map__popup img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.map__images {
  scrollbar-width: none;
}

.map__images,
.map__items {
  display: grid;
  max-height: 100vh;

  & > * {
    grid-column: 1 / -1;
    grid-row: 1 / -1;
  }
}

.fixed .map__items {
  overflow: auto;
}

.map__item {
  height: 100%;
}

.map__item:not(:first-child) {
  display: none;
}
</style>
