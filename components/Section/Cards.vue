<script setup lang="ts">
import { gsap, ScrollTrigger } from 'gsap/all'

const list = [
  {
    id: 0,
    title: 'Тщательно отобранный персонал',
    img: '1',
  },
  {
    id: 1,
    title: 'Качественная эко-химия',
    img: '2',
  },
  {
    id: 2,
    title: 'Контролируем качество',
    img: '3',
  },
  {
    id: 3,
    title: 'Работаем круглосуточно',
    img: '4',
  },
]

onMounted(() => {
  ScrollTrigger.batch('.card', {
    onEnter: (elements) => {
      gsap.from(elements, {
        opacity: 0,
        y: 100,
        stagger: 0.1,
      })
    },
  })
})
</script>

<template>
  <section class="cards">
    <div v-for="item in list" :key="item.id" class="card">
      <div class="card__front">
        <p class="text-subtitle card__text">{{ item.title }}</p>
        <img
          :src="`/images/card/item-${item.img}.png`"
          alt=""
          class="card__img"
        />
      </div>

      <div class="card__back">
        <p class="text-article">
          Не нужно тратить время, силы и ресурсы на разме- щение вакансий,
          проведе- ние собеседований, про- верку кандидатов на должность
          уборщицы. За счет больших объемов мы можем сделать это эффективнее.
        </p>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.cards {
  display: grid;
  gap: 40px;
  margin: 40px 16px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    margin: 60px 40px;
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
    margin: 75px 60px;
  }
}

.card {
  position: relative;
  padding: 20px 16px;
  height: 328px;
  background-color: #f3f6fb;
  border-radius: 8px;
  overflow: hidden;
  transition: 0.3s ease;
  transition-property: background-color, color;

  // &:hover {
  //   background-color: #5a30f0;
  //   color: #fff;
  // }
}

.card__front {
  text-align: center;
}

.card__back {
  padding: 20px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: $primary;
  color: #fff;
  transition: 0.5s all ease;
  transform: translateY(100%);
  border-radius: inherit;

  @media (min-width: 1400px) {
    padding: 30px;
  }
}

.card:hover .card__back {
  transform: translateY(0);
}

.card__img {
  position: absolute;
  left: 40px;
  right: 40px;
  width: calc(100% - 80px);
  bottom: 0;
  max-height: 60%;
  object-fit: contain;
  transition: 0.3s ease;
  transition-property: opacity, transform;

  @media (min-width: 1400px) {
    left: 55px;
    right: 55px;
    width: calc(100% - 110px);
  }
}

.card:hover .card__img {
  opacity: 0;
  transform: translateY(30px);
}
</style>
