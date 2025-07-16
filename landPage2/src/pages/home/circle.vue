<template>
  <div :style="{height: windowHeight+'px',maxWidth:windowWidth+'px'}" class="container">

    <div class="wheelContent">
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
      scrollSpeed: 1,
      containerWidth: 0,
      urlA: '',
      urlData: {}
    }
  },
  computed: {

  },
  mounted () {
    this.updateWindowHeight()
    window.addEventListener('resize', this.updateWindowHeight)
    this.urlData = getQueryParams()
    if (this.urlData.params.ttclid) {
      setTimeout(() => {
        let params = {
          ptype: 1, // 访问量
          ttclid: this.urlData.params.ttclid,
          url: getCookie('url') || '',
          url2: window.location.href || ''
        }
        postVisitAndClickApi(params).then(res => {
          console.log('访问量', res)
        })
      }, 1000)
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.updateWindowHeight)
  },
  methods: {
    startSpin () {
      this.isSpinning = true
      this.urlA = getCookie('url') || 'https://wri375.com/?t=1&d=OUtWwWQa#/register'
      console.log('转盘面开始转动')
      if (this.urlData.params.ttclid) {
        let params = {
          ptype: 2, // 点击量
          ttclid: this.urlData.params.ttclid,
          url: getCookie('url') || '',
          url2: window.location.href || ''
        }
        postVisitAndClickApi(params).then(res => {
          console.log('点击量', res)
        })
      }
    },
    handleAnimationEnd () {
      // this.showDialog = true
      console.log('转盘结束转动')
      this.urlA = getCookie('url') || 'https://wri375.com/?t=1&d=OUtWwWQa#/register'
      window.open(this.urlA, '_self') // '_blank' 表示在新窗口或标签页中打开
      // window.location.replace(this.urlA) // 历史记录中删除当前页面
    },

    updateWindowHeight () {
      this.windowHeight = window.innerHeight // 获取浏览器窗口的高度
      this.windowWidth = window.innerWidth < 500 ? window.innerWidth : 500 // 获取浏览器窗口的高度
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
