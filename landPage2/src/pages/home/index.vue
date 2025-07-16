<template>
  <div :style="{height: windowHeight+'px',maxWidth:windowWidth+'px'}" class="container">
    <img alt="" height="100%" src="@/assets/img/banner.jpg" width="100%">
    <button :disabled="isSpinning" class="joinNow" @click="toLinkFun">
      <span class="btn_shadow"></span>
    </button>
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
    console.log('this.urlData', this.urlData)
    this.updateWindowHeight()
    window.addEventListener('resize', this.updateWindowHeight)
    let params = {
      ptype: 1, // 访问量
      url: window.location.href || ''
    }
    // postVisitAndClickApi(params).then(res => {
    //   console.log('访问量', res)
    // })
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.updateWindowHeight)
  },
  methods: {
    toLinkFun () {
      this.isSpinning = true
      this.urlA = getCookie('url') || 'https://wri375.com/?t=1&d=OUtWwWQa#/register'
      let params = {
        ptype: 2, // 点击量
        url: window.location.href || ''
      }
      postVisitAndClickApi(params).then(res => {
        console.log('点击量', res)
        this.isSpinning = false
      }).finally(() => {
        setTimeout(() => {
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

.joinNow {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  background: url("~@/assets/img/button.png");
  background-size: 100% 100%;
  top: calc(57% + 3px);
  width: 44%;
  height: calc(7% + 0px);
  animation: btn-tran 0.3s ease-in 2;
  border: none;
}

@keyframes btn-tran {
  0% {
    transform: translateX(-50%);
  }
  25% {
    transform: translateX(calc(-50% - 5px));
  }
  50% {
    transform: translateX(-50%);
  }
  75% {
    transform: translateX(calc(-50% + 5px));
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

</style>
