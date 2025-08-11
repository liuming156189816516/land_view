<template>
  <div :style="{height: windowHeight+'px',maxWidth:windowWidth+'px'}" class="container">
    <!-- 字幕条 -->
    <!--        <continuousCarousel-->
    <!--          :items="letters"-->
    <!--          :pause-on-hover="true"-->
    <!--          :speed="60"-->
    <!--          background-color="#2d343678"-->
    <!--          color="#80ff6b80"-->
    <!--          class="captions"-->
    <!--          direction="left"-->
    <!--          font-size="2rem"-->
    <!--          spacing="1.5rem"-->
    <!--       />-->
    <div class="header" v-if="false">
      <div class="exampleText"><strong>Experiência mais rápida no seu celular.</strong></div>
      <button
        class="openBtn"
        @click="openExampleBtn"
      >Adicionar
      </button>
    </div>

    <div :style="{ transform: `translateX(${scrollOffset}px)` }" class="lettersArr">
      <span v-for="(item,index) in letters" :key="index" class="text">{{ item }}</span>
    </div>

    <div class="wheelContent">
      <div class="title">
        <img alt="" class="silkRibbon" src="https://static.dsvx.com//lunpan/silkRibbon.png">
      </div>
      <div :style="{height: windowWidth-50+'px',width:windowWidth -80 +'px',}"
           class="bg">
        <!-- 转盘 -->
        <div
          :class="{ spinning: isSpinning }"
          class="wheel"
          @animationend="handleAnimationEnd"
        >
        </div>
        <!-- 控制按钮 -->
        <button
          :disabled="isSpinning"
          class="goBtn"
          @click="startSpin"
        >
        </button>
      </div>
    </div>
    <!-- 提示弹窗 -->
    <div v-if="showDialog" class="dialog">
      <!--      <a :href="urlA" target="_self" @click="closeDialog">-->
      <a href="javascript: void(0)" @click="closeDialog">
        <div class="dialogContent">
          <button class="dialogBtn">
            <img alt="" class="dialogImg" src="https://static.dsvx.com//lunpan/pegueAgora.png">
          </button>
        </div>
      </a>
    </div>
    <!-- 提示弹窗 -->
    <div v-if="showExample" class="exampleModal dialog">
      <div class="exampleContent dialogContent">
        <div class="closeExample" @click="closeExampleFun">+</div>
        <div class="characters">
          Link copiado com sucesso!Toque em “<strong>Safari</strong>” ou “<strong>Chrome</strong>” para abrir e instalar
          o app.
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import continuousCarousel from '@/components/ContinuousCarousel'
import {setCookie, getCookie, getQueryParams} from '@/filters'
import {postVisitAndClickApi} from '@/pages/home/api'

export default {
  components: {
    continuousCarousel
  },
  data () {
    return {
      isSpinning: false,
      showDialog: false,
      windowHeight: 0,
      windowWidth: 0,
      letters: [
        '6***13 acabou de retirar 3.238',
        '7***26 acabou de retirar 1.469',
        '5***49 acabou de retirar 216',
        '3***63 acabou de retirar 700',
        '7***39 acabou de retirar 3.619',
        '9***20 acabou de retirar 532',
        '5***43 acabou de retirar 316',
        '3***13 acabou de retirar 25',
        '9***81 acabou de retirar 65',
        '5***22 acabou de retirar 132'
      ], // 要轮播的字母
      scrollOffset: 0,
      scrollSpeed: 1,
      containerWidth: 0,
      urlA: '',
      showExample: false,
      urlData: {}
    }
  },
  computed: {
    currentLetter () {
      return this.letters[this.currentIndex]
    }
  },
  mounted () {
    this.urlData = getQueryParams()
    this.updateWindowHeight()
    window.addEventListener('resize', this.updateWindowHeight)
    this.setContainerWidth()
    setInterval(this.updateScrollOffset, 15) // 50毫秒更新一次滚动位置
    let params = {
      ptype: 1, // 访问量
      url: window.location.href || ''
    }
    postVisitAndClickApi(params).then(res => {
      console.log('访问量', res)
    })
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.updateWindowHeight)
    this.pauseAutoPlay()
    this.$el.removeEventListener('mouseenter', this.pauseAutoPlay)
    this.$el.removeEventListener('mouseleave', this.startAutoPlay)
  },
  methods: {
    startSpin () {
      this.isSpinning = true
      this.urlA = getCookie('url') || 'https://wri375.com/?t=1&d=OUtWwWQa#/register'
      console.log('转盘面开始转动')
      let params = {
        ptype: 2, // 点击量
        url: window.location.href || ''
      }
      postVisitAndClickApi(params).then(res => {
        console.log('点击量', res)
      })
    },
    handleAnimationEnd () {
      console.log('转盘结束转动')
      window.open(this.urlA, '_self') // '_blank' 表示在新窗口或标签页中打开
    },
    closeDialog () {
      this.showDialog = false
      this.isSpinning = false
    },
    updateWindowHeight () {
      this.windowHeight = window.innerHeight // 获取浏览器窗口的高度
      this.windowWidth = window.innerWidth < 500 ? window.innerWidth : 500 // 获取浏览器窗口的高度
    },

    next () {
      this.transitionName = 'slide-up'
      this.currentIndex = (this.currentIndex + 1) % this.letters.length
    },
    startAutoPlay () {
      this.pauseAutoPlay()
      this.timer = setInterval(this.next, 1000)
    },
    pauseAutoPlay () {
      clearInterval(this.timer)
    },

    updateScrollOffset () {
      this.scrollOffset -= this.scrollSpeed

      if (this.scrollOffset < -this.containerWidth) {
        this.scrollOffset = this.containerWidth
      }
    },

    setContainerWidth () {
      this.containerWidth = 1850
    },
    openExampleBtn () {
      this.showExample = true
      let urlA = getCookie('url') || 'https://wri375.com/?t=1&d=OUtWwWQa#/register'
      let oInput = document.createElement('input')
      oInput.value = urlA.replace('?', '/pwa?').replace('#/register', '')
      document.body.appendChild(oInput)
      oInput.select() // 选择对象
      document.execCommand('Copy') // 执行浏览器复制命令
      oInput.className = 'oInput'
      oInput.style.display = 'none'
    },
    closeExampleFun () {
      this.showExample = false
    }
  }
}
</script>

<style scoped>

.container {
  background: url('https://static.dsvx.com//lunpan/maxBg.png') no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.captions {
  margin-top: 60px;
  z-index: 100;
}

.wheelContent {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.title {
  width: 100%;
  margin-top: 50px;
}

.silkRibbon {
  width: 80%;
}

.bg {
  background: url("https://static.dsvx.com//lunpan/big.png") no-repeat;
  background-size: 100%;
  /*width: 450px;*/
  /*height: 480px;*/
  position: relative;
}

/* 转盘样式 */
.wheel {
  width: 80%;
  height: calc((100% - 30px) * 0.8);
  border-radius: 50%;
  background: url("https://static.dsvx.com//lunpan/material1.png") no-repeat;
  background-size: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 24px;
  position: absolute;
  transform: translate(-49.45%, calc((-100% - 30px) * 0.5)) rotate(0deg);
  left: 50%;
  top: 50%;

}

/* 旋转动画 */
.spinning {
  animation: spin 3s ease-in-out forwards;
}

@keyframes spin {
  0% {
    transform: translate(-49.45%, calc((-100% - 30px) * 0.5)) rotate(0deg);

  }
  100% {

    transform: translate(-49.45%, calc((-100% - 30px) * 0.5)) rotate(1320deg); /* 4圈（1440 = 4×360） */
    /* 3圈可以用1080deg */
  }
}

/* 弹窗样式 */
.dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
}

.dialogContent {
  background: url("https://static.dsvx.com//lunpan/modal.png") no-repeat;
  background-size: 220px 120px;
  width: 220px;
  height: 120px;
  border-radius: 40px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  border: #ff5722 solid 8px;

}

.dialogBtn {
  background: url("https://static.dsvx.com//lunpan/modalBtn.png") no-repeat;
  background-size: 150px 60px;
  width: 150px;
  height: 60px;
}

.dialogImg {
  width: 120px;
}

.goBtn {
  background: url("https://static.dsvx.com//lunpan/go.png") no-repeat;
  background-size: 120px 135px;
  width: 120px;
  height: 135px;
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: calc(50% - 15px);
}

button {
  border: none;
  cursor: pointer;
}

button:disabled {
  cursor: not-allowed;
}

.lettersArr {
  display: flex;
  margin-top: 15px;
  width: 4200px;
  background: #2d343678;
  color: #80ff6b80;
  /*font-size: 2rem;*/
  /*font-size: 32px;*/
  font-size: clamp(26px, 2.5vw, 30px);
  vertical-align: middle;
  padding: 16px 0;
}

.text {
  display: block;
  margin: 0 10px;
  font-weight: bold;
}

.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-right: 15px;
}

.exampleText {
  width: 80%;
  height: 38px;
  display: flex;
  justify-content: left;
  align-items: center;
  background: #2d343678;
  color: #80ff6b80;
  padding: 0 15px;
  font-size: clamp(13px, 2.5vw, 19px);
}

.openBtn {
  width: 18%;
  background: url("https://static.dsvx.com//lunpan/modalBtn.png") no-repeat;
  border-radius: 12px;
  background-size: 100% 38px;
  height: 38px;
  color: #FFFFFF;
  font-weight: bold;
}

.exampleModal {

}

.exampleContent {
  width: 300px;
  position: relative;
  border-radius: 50px;
  background-size: 300px 120px;

}

.characters {
  color: #fff;
}

.closeExample {
  position: absolute;
  right: 15px;
  top: 0;
  font-weight: 10;
  font-size: 28px;
  color: #fff;
  transform: rotate(45deg);
  cursor: pointer;
}

</style>
