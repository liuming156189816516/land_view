<!-- ContinuousCarousel.vue -->
<template>
  <div
    class="carousel-container"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    :style="containerStyle"
  >
    <div
      class="carousel-track"
      :style="trackStyle"
      :class="directionClass"
    >
      <div
        v-for="(item, index) in duplicatedItems"
        :key="index"
        class="letter"
        :style="letterStyle"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContinuousCarousel',
  props: {
    items: {  // 	轮播内容数组
      type: Array,
      default: () => ['V', 'U', 'E', 'J', 'S']
    },
    speed: {  // 	完整轮播周期时间（秒），数值越大滚动越慢
      type: Number,
      default: 10
    },
    direction: {  // 	滚动方向，可选值：left/right
      type: String,
      default: 'left',
      validator: value => ['left', 'right'].includes(value)
    },
    pauseOnHover: {  // 	是否启用鼠标悬停暂停功能
      type: Boolean,
      default: true
    },
    fontSize: {  // 	文字大小
      type: String,
      default: '4rem'
    },
    spacing: {  // 	文字间距
      type: String,
      default: '2rem'
    },
    color: {  // 	文字颜色
      type: String,
      default: '#42b983'
    },
    backgroundColor: {  // 	背景颜色
      type: String,
      default: '#1a1a1a'
    }
  },
  data() {
    return {
      isPaused: false
    }
  },
  computed: {
    duplicatedItems() {
      return [...this.items, ...this.items]
    },
    containerStyle() {
      return {
        backgroundColor: this.backgroundColor
      }
    },
    letterStyle() {
      return {
        fontSize: this.fontSize,
        color: this.color,
        margin: `0 ${this.spacing}`
      }
    },
    trackStyle() {
      return {
        animationDuration: `${this.speed}s`,
        animationPlayState: this.isPaused ? 'paused' : 'running'
      }
    },
    directionClass() {
      return `direction-${this.direction}`
    }
  },
  methods: {
    handleMouseEnter() {
      if (this.pauseOnHover) this.isPaused = true
    },
    handleMouseLeave() {
      if (this.pauseOnHover) this.isPaused = false
    }
  }
}
</script>

<style scoped>
.carousel-container {
  overflow: hidden;
  position: relative;
  padding: 1rem 0;
}

.carousel-track {
  display: inline-flex;
  white-space: nowrap;
  animation: scroll-left linear infinite;
}

.carousel-track.direction-right {
  animation-name: scroll-right;
}

.letter {
  flex-shrink: 0;
  font-weight: bold;
  transition: all 0.3s ease;
}

@keyframes scroll-left {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@keyframes scroll-right {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}
</style>
