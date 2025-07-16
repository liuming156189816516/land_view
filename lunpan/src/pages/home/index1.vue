<template>
  <div class="lottery-container">
    <h1>幸运大转盘</h1>
    <div class="wheel-container">
      <canvas ref="wheelCanvas" width="400" height="400"></canvas>
    </div>

    <div class="controls">
      <div class="control-group">
        <label for="spinTime">转动时间(秒):</label>
        <input id="spinTime" type="number" v-model.number="spinTime" min="1" max="10">
      </div>
      <div class="control-group">
        <label for="spinRounds">转动圈数:</label>
        <input id="spinRounds" type="number" v-model.number="spinRounds" min="3" max="10">
      </div>
      <button @click="startSpin" :disabled="isSpinning">开始抽奖</button>
    </div>

    <div v-if="showPrizeModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="showPrizeModal = false">&times;</span>
        <h2>恭喜您!</h2>
        <p>您获得了: <strong>{{ prizeText }}</strong></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LotteryWheel',
  data() {
    return {
      prizes: ['一等奖', '二等奖', '三等奖', '四等奖', '五等奖', '六等奖', '七等奖', '八等奖'],
      colors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#8AC24A', '#EA80FC'],
      spinTime: 5, // 默认转动时间(秒)
      spinRounds: 5, // 默认转动圈数
      isSpinning: false,
      currentRotation: 0,
      showPrizeModal: false,
      prizeText: ''
    }
  },
  mounted() {
    this.drawWheel();
  },
  methods: {
    drawWheel() {
      const canvas = this.$refs.wheelCanvas;
      const ctx = canvas.getContext('2d');
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(centerX, centerY) - 10;

      // 清空画布
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 绘制轮盘分区
      const arc = (2 * Math.PI) / this.prizes.length;
      for (let i = 0; i < this.prizes.length; i++) {
        ctx.beginPath();
        ctx.fillStyle = this.colors[i % this.colors.length];
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, i * arc, (i + 1) * arc);
        ctx.fill();

        // 绘制文字
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(i * arc + arc / 2);
        ctx.textAlign = 'right';
        ctx.fillStyle = '#fff';
        ctx.font = '16px Arial';
        ctx.fillText(this.prizes[i], radius - 20, 5);
        ctx.restore();
      }

      // 绘制中心圆
      ctx.beginPath();
      ctx.fillStyle = '#fff';
      ctx.arc(centerX, centerY, 20, 0, 2 * Math.PI);
      ctx.fill();
    },

    startSpin() {
      if (this.isSpinning) return;

      this.isSpinning = true;
      this.showPrizeModal = false;

      // 随机选择中奖区域
      const prizeIndex = Math.floor(Math.random() * this.prizes.length);
      const targetAngle = (2 * Math.PI * this.spinRounds) + (2 * Math.PI - (prizeIndex * (2 * Math.PI / this.prizes.length) + Math.PI / this.prizes.length))

      const startTime = Date.now();
      const endTime = startTime + this.spinTime * 1000;

      const animate = () => {
        const now = Date.now();
        const progress = Math.min(1, (now - startTime) / (endTime - startTime));

        // 使用缓动函数使旋转更自然
        const easeOutProgress = 1 - Math.pow(1 - progress, 3);
        this.currentRotation = easeOutProgress * targetAngle;

        this.rotateWheel();

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          this.isSpinning = false;
          this.prizeText = this.prizes[prizeIndex];
          this.showPrizeModal = true;
        }
      };

      animate();
    },

    rotateWheel() {
      const canvas = this.$refs.wheelCanvas;
      const ctx = canvas.getContext('2d');
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // 清空画布
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 保存当前状态
      ctx.save();

      // 旋转画布
      ctx.translate(centerX, centerY);
      ctx.rotate(this.currentRotation);
      ctx.translate(-centerX, -centerY);

      // 绘制轮盘
      const radius = Math.min(centerX, centerY) - 10;
      const arc = (2 * Math.PI) / this.prizes.length;
      for (let i = 0; i < this.prizes.length; i++) {
        ctx.beginPath();
        ctx.fillStyle = this.colors[i % this.colors.length];
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, i * arc, (i + 1) * arc);
        ctx.fill();

        // 绘制文字
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(i * arc + arc / 2);
        ctx.textAlign = 'right';
        ctx.fillStyle = '#fff';
        ctx.font = '16px Arial';
        ctx.fillText(this.prizes[i], radius - 20, 5);
        ctx.restore();
      }

      // 绘制中心圆
      ctx.beginPath();
      ctx.fillStyle = '#fff';
      ctx.arc(centerX, centerY, 20, 0, 2 * Math.PI);
      ctx.fill();

      // 恢复状态
      ctx.restore();
    }
  }
}
</script>

<style scoped>
.lottery-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

.wheel-container {
  position: relative;
  width: 400px;
  height: 400px;
  margin: 20px 0;
}

.pointer {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-top: 40px solid #ff0000;
  z-index: 10;
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  max-width: 300px;
}

.control-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #45a049;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 80%;
  text-align: center;
  position: relative;
}

.close {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 24px;
  cursor: pointer;
}

h1 {
  color: #333;
}
</style>
