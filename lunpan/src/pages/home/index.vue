<template>
  <div class="carousel-container">
    <div class="carousel">
      <transition :name="transitionName" mode="out-in">
        <div :key="currentIndex" class="letter">
          {{ currentLetter }}
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      letters: ['V', 'U', 'E', 'J', 'S'], // 要轮播的字母
      currentIndex: 0,
      transitionName: 'slide-up',
      timer: null
    }
  },
  computed: {
    currentLetter() {
      return this.letters[this.currentIndex]
    }
  },
  mounted() {
    this.startAutoPlay()
    // 鼠标悬停暂停
    this.$el.addEventListener('mouseenter', this.pauseAutoPlay)
    this.$el.addEventListener('mouseleave', this.startAutoPlay)
  },
  beforeDestroy() {
    this.pauseAutoPlay()
    this.$el.removeEventListener('mouseenter', this.pauseAutoPlay)
    this.$el.removeEventListener('mouseleave', this.startAutoPlay)
  },
  methods: {
    next() {
      this.transitionName = 'slide-up'
      this.currentIndex = (this.currentIndex + 1) % this.letters.length
    },
    startAutoPlay() {
      this.pauseAutoPlay()
      this.timer = setInterval(this.next, 1000)
    },
    pauseAutoPlay() {
      clearInterval(this.timer)
    }
  }
}
</script>

<style>
.carousel-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #1a1a1a;
}

.carousel {
  position: relative;
  width: 100px;
  height: 100px;
  font-size: 48px;
  color: #42b983;
  overflow: hidden;
  text-align: center;
}

.letter {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 向上滑动动画 */
.slide-up-enter-active {
  transition: all 0.5s ease;
  transform: translateX(100%);
}
.slide-up-enter-to {
  transform: translateX(0);
}
.slide-up-leave-active {
  transition: all 0.5s ease;
  transform: translateX(-100%);
}

/* 向下滑动动画（用于循环时） */
.slide-down-enter-active {
  transition: all 0.5s ease;
  transform: translateX(-100%);
}
.slide-down-enter-to {
  transform: translateX(0);
}
.slide-down-leave-active {
  transition: all 0.5s ease;
  transform: translateX(100%);
}
</style>
