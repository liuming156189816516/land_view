<template>
  <div>
    <LotteryGrid
      :prizes="customPrizes"
      :duration="5000"
    />
  </div>
</template>

<script>
import LotteryGrid from '@/components/LotteryGrid'

export default {
  components: {
    LotteryGrid
  },
  data() {
    return {
      customPrizes: [
        { name: '奖品1', probability: 0.1 },
        { name: '奖品2', probability: 0.15 },
        { name: '奖品3', probability: 0.2 },
        { name: '奖品4', probability: 0.1 },
        { name: '奖品5', probability: 0.15 },
        { name: '奖品6', probability: 0.1 },
        { name: '奖品7', probability: 0.1 },
        { name: '奖品8', probability: 0.1 }
      ]
    }
  },
}
</script>
