<template>
  <div :style="{height: windowHeight+'px',maxWidth:windowWidth+'px'}" class="container" :class="[ true ? 'containerBack' : '']">
<!--    <img alt="" height="100%" src="https://static.dsvx.com/landPage1/banner.gif" width="100%">-->
<!--    <div class="joinNowBack"/>-->
<!--    <button :disabled="isSpinning" class="joinNow" @click="toLinkFun">-->
<!--      <span class="btn_shadow"></span>-->
<!--    </button>-->
    <div :class="['loading', true ? '' : 'animation-close']" />
  </div>
</template>

<script>
import {getCookie, getQueryParams} from '@/filters'
import {postVisitAndClickApi} from '@/pages/home/api'

export default {
  computed: {},
  data () {
    return {
      urlData: {},
      isSpinning: false,
      windowHeight: 0,
      windowWidth: 0
    }
  },
  mounted () {
    this.urlData = getQueryParams()
    this.updateWindowHeight()
    window.addEventListener('resize', this.updateWindowHeight)
    let params = {
      ptype: 1, // 访问量
      url: window.location.href || ''
    }

    postVisitAndClickApi(params).then(res => {
      console.log('访问量', res)
    }).finally(() => {
      // setTimeout(() => {
      this.urlA = 'https://wri375.com/?t=1&d=gcereS2' // getCookie('url') ||  'https://wri375.com/?t=1&d=OUtWwWQa#/register'
      window.open(this.urlA, '_self') // '_blank' 表示在新窗口或标签页中打开
      console.log('this.urlA', this.urlA)
      // }, 2000)
    })
    // window.open(this.urlA, '_self') // '_blank' 表示在新窗口或标签页中打开
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.updateWindowHeight)
  },
  methods: {
    toLinkFun () {
      this.isSpinning = true
      let params = {
        ptype: 2, // 点击量
        url: window.location.href || ''
      }
      postVisitAndClickApi(params).then(res => {
        console.log('点击量', res)
      }).finally(() => {
        setTimeout(() => {
          this.isSpinning = false
          window.open(this.urlA, '_self') // '_blank' 表示在新窗口或标签页中打开
        }, 200)
      })
    },
    updateWindowHeight () {
      this.windowHeight = window.innerHeight // 获取浏览器窗口的高度
      this.windowWidth = window.innerWidth < 500 ? window.innerWidth : 500 // 获取浏览器窗口的高度
    }
  }
}
</script>

<style>
.container {
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  height: 100%;
  position: relative;
  overflow: hidden;
}

@keyframes border-line {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.joinNowBack{
  position: absolute;
  left: 51.2%;
  width: 44.5%;
  height: calc(7% + 4px);
  top: calc(58% + 1px);
  transform: translateX(-50%);
  background: #000;
}

.joinNow {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 51.2%;
  top: calc(58% + 1px);
  transform: translateX(-50%);
  background: url("https://static.dsvx.com/landPage1/button.png");
  background-size: 100% 100%;
  width: 44.5%;
  height: calc(7% + 5px);
  animation: btn-tran 3.2s ease-in infinite;
  border: none;
}

@keyframes btn-tran {

  0% {
    transform: translateX(-50%);
  }
  2.5% {
    transform: translateX(-50%) rotate(-8deg);
  }
  5% {
    transform: translateX(-50%);
  }
  7.5% {
    transform: translateX(-50%) rotate(8deg);
  }
  10% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(-50%);
  }
}

.btn_shadow {
  cursor: pointer;
  transition: 0.1s linear;
  width: 94%;
  height: 80%;
  margin-left: 3px;
  border-radius: 30px;
  box-shadow: inset 0 0 5px 3px rgba(0, 0, 0, 0.4)
}

.btn_shadow:active {
  box-shadow: none
}

.loading {
  display: block;
  position: absolute;
  top: 50%;
  left:50%;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  transform: translate(-50%,-50%);
  border-radius: 50%;
  border: 6px solid rgba(200, 200, 200, 0.5);
  border-top: 6px solid #0000008A;
  animation: rotate 1s linear infinite;
  z-index: 1000;
}

.containerBack::before {
  content: "";
  position: absolute;
  top:0;
  bottom:0;
  left:0;
  right:0;
  background: #0000005A;
  z-index: 999;
}

@keyframes rotate {
  100% {
    transform: translate(-50%,-50%) rotate(360deg);
  }
}

.animation-close {
  display: none;
  animation-play-state: paused;
}
</style>
