<template>
  <div class="lottery-container">
    <div class="lottery-grid">
      <div
        v-for="(item, index) in prizes"
        :key="index"
        class="lottery-item"
        :class="{ active: activeIndex === index }"
      >
        {{ item.name }}
      </div>
      <div class="lottery-btn" @click="startLottery" :disabled="isRolling">
        {{ isRolling ? '抽奖中...' : '开始抽奖' }}
      </div>
    </div>

    <div v-if="showResult" class="result-modal">
      <div class="result-content">
        <h3>恭喜您!</h3>
        <p>获得: {{ resultPrize.name }}</p>
        <button @click="showResult = false">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LotteryGrid',
  props: {
    prizes: {
      type: Array,
      default: () =>[]
    },
    duration: {
      type: Number,
      default: 3000
    }
  },
  data() {
    return {
      activeIndex: -1,
      isRolling: false,
      showResult: false,
      resultPrize: null,
      rollSpeed: 100, // 初始速度
      minSpeed: 50,    // 最小速度
      speedStep: 5,    // 速度变化步长
      rollDuration: 3000, // 总抽奖时长(ms)
      rollTimer: null
    }
  },
  computed: {
    // 计算累计概率分布
    probabilityDistribution() {
      let distribution = [];
      let sum = 0;
      for (let prize of this.prizes) {
        sum += prize.probability;
        distribution.push(sum);
      }
      return distribution;
    }
  },
  methods: {
    startLottery() {
      if (this.isRolling) return;

      this.isRolling = true;
      this.showResult = false;
      this.activeIndex = -1;

      // 随机决定中奖奖品
      const random = Math.random();
      let prizeIndex = 0;
      for (let i = 0; i < this.probabilityDistribution.length; i++) {
        if (random < this.probabilityDistribution[i]) {
          prizeIndex = i;
          break;
        }
      }

      // 计算需要转动的圈数(至少3圈)
      const minCircles = 3;
      const totalSteps = minCircles * 8 + prizeIndex;
      let currentStep = 0;

      // 开始转动
      this.rollTimer = setInterval(() => {
        this.activeIndex = currentStep % 8;

        // 逐渐加速
        if (this.rollSpeed > this.minSpeed && currentStep < totalSteps - 10) {
          this.rollSpeed -= this.speedStep;
        }

        // 最后几步减速
        if (currentStep >= totalSteps - 10 && this.rollSpeed < 200) {
          this.rollSpeed += this.speedStep * 2;
        }

        currentStep++;

        // 停止条件
        if (currentStep > totalSteps) {
          clearInterval(this.rollTimer);
          this.isRolling = false;
          this.rollSpeed = 100; // 重置速度
          this.resultPrize = this.prizes[prizeIndex];
          this.showResult = true;
        }
      }, this.rollSpeed);
    }
  }
}
</script>

<style scoped>
.lottery-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.lottery-grid {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: repeat(3, 100px);
  gap: 10px;
  position: relative;
}

.lottery-item {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  color: #333;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.lottery-item.active {
  background-color: #ffeb3b;
  box-shadow: 0 0 15px #ffeb3b;
}

.lottery-btn {
  grid-column: 2;
  grid-row: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ff5722;
  color: white;
  border-radius: 50%;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  user-select: none;
}

.lottery-btn:hover:not([disabled]) {
  background-color: #e64a19;
}

.lottery-btn[disabled] {
  opacity: 0.7;
  cursor: not-allowed;
}

.result-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.result-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  max-width: 300px;
}

.result-content h3 {
  color: #ff5722;
  margin-top: 0;
}

.result-content button {
  margin-top: 15px;
  padding: 8px 20px;
  background-color: #ff5722;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.result-content button:hover {
  background-color: #e64a19;
}
</style>
