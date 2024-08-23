<script setup lang="ts">
import gsap from 'gsap'

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
  const config = { threshold: 0 }

  let observer = new IntersectionObserver(function (entries, self) {
    let targets = entries.map((entry) => {
      if (entry.isIntersecting) {
        self.unobserve(entry.target)
        return entry.target
      }
    })

    gsap.from(targets, {
      opacity: 0,
      y: 100,
      stagger: 0.1,
    })
  }, config)

  document.querySelectorAll('.card').forEach((card) => {
    observer.observe(card)
  })
})
</script>

<template>
  <section class="cards">
    <div v-for="item in list" :key="item.id" class="card">
      <p class="text-subtitle card__text">{{ item.title }}</p>
      <img
        :src="`/images/card/item-${item.img}.png`"
        alt=""
        class="card__img"
      />
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
  text-align: center;
  overflow: hidden;
}

.card__img {
  position: absolute;
  left: 40px;
  right: 40px;
  width: calc(100% - 80px);
  bottom: 0;
  max-height: 60%;
  object-fit: contain;

  @media (min-width: 1400px) {
    left: 55px;
    right: 55px;
    width: calc(100% - 110px);
  }
}
</style>
