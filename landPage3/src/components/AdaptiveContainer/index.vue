<template>
  <div class="viewport-container">
    <div
      class="scale-wrapper"
      :style="scaleWrapperStyle"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdaptiveContainer',
  props: {
    designWidth: {
      type: Number,
      default: 375
    },
    designHeight: {
      type: Number,
      default: 667
    },
    mode: {
      type: String,
      default: 'width',
      validator: function (value) {
        return ['width', 'height', 'full'].includes(value)
      }
    },
    maxScale: {
      type: Number,
      default: Infinity
    },
    minScale: {
      type: Number,
      default: 0.1
    }
  },
  data() {
    return {
      scale: 1,
      windowWidth: 0,
      windowHeight: 0
    }
  },
  computed: {
    scaleWrapperStyle() {
      return {
        transform: `scale(${this.scale}) translate(-50%, -50%)`,
        width: `${this.designWidth}px`,
        height: `${this.designHeight}px`
      }
    }
  },
  mounted() {
    this.updateDimensions()
    this.updateScale()
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    updateDimensions() {
      this.windowWidth = document.documentElement.clientWidth
      this.windowHeight = document.documentElement.clientHeight
    },
    calcScale() {
      let scaleValue = 1
      const widthRatio = this.windowWidth / this.designWidth
      const heightRatio = this.windowHeight / this.designHeight

      switch (this.mode) {
        case 'width':
          scaleValue = widthRatio
          break
        case 'height':
          scaleValue = heightRatio
          break
        case 'full':
          scaleValue = Math.min(widthRatio, heightRatio)
          break
      }

      scaleValue = Math.min(this.maxScale, scaleValue)
      scaleValue = Math.max(this.minScale, scaleValue)
      return scaleValue
    },
    updateScale() {
      this.scale = this.calcScale()
    },
    handleResize() {
      this.updateDimensions()
      this.updateScale()
    }
  }
}
</script>

<style scoped>
.viewport-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
}

.scale-wrapper {
  position: absolute;
  left: 50%;
  top: 50%;
  transform-origin: 0 0;
  transition: transform 0.3s ease;
  backface-visibility: hidden;
  perspective: 1000;
}
</style>
