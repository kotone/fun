<template>
  <div :style="{display: isPc ? 'flex' : ''}" class="wrap">
    <section class="styleEditor" ref="styleWrapperRef">
      <pre v-html="currentStyleCode"></pre>
    </section>
    <div class="heartWrapper">
      <div class="heart" @click="handleClickHeart"></div>
      <div class="heart bounce" @click="handleClickHeart"></div>
      <canvas id="canvas"></canvas>
      <div class="brithday">
        <img class="brith-text" :class="heartFlag ? 'fadeInUp' : ''" src="../../assets/birthday.png" alt="">
        <div id="lottie" :class="heartFlag ? 'fadeIn' : ''"></div>
      </div>
    </div>
    
  </div>
</template>

<script setup>
import Prism from 'prismjs'
import { onMounted, ref, computed } from 'vue'
import lottie from 'lottie-web'
import Heart from './heart';
import animationData from '../lottie/cake.json'

document.title = '给最爱的小宝贝'

const currentStyleCode = ref('')
const styleWrapperRef = ref()
const drawTextFlag = ref(false)
const heartFlag = ref(false)
const clickFlag = ref(false)

const isPc = computed(() => {
  const userAgentInfo = navigator.userAgent
  let Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
  var flag = true
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false
      break
    }
  }
  return flag
})

const fullStyle = [
`/*
* Hi。宝贝！
* 你看这个页面。就是个什么也没有的网页。
* 我的工作呢就是给这个页面加上东西。
* 现在我带你一步一步给这个页面加上东西。
* 最后会有惊喜哦！
*/

/* 首先给所有元素加上过渡效果 */
* {
  -webkit-transition: all .5s;
  transition: all .5s;
  will-change: auto;
}
/* 白色背景太单调了。来点背景 */
body, html {
  color: #fff;
  background-color: darkslategray;
}

/* 文字太近了 */
.styleEditor {
  overflow: auto;
  ${isPc.value ? `width: 48vw;height: 96vh;` : `width: 96vw;height: 48vh;` }
  border: 1px solid;
  font-size: 14px;
  line-height: 1.5;
  padding: 10px;
}

/* 这些代码颜色都一样。加点儿高亮区别来 */
.token.selector{ color: rgb(133,153,0) }
.token.property{ color: rgb(187,137,0) }
.token.punctuation{ color: yellow }
.token.function{ color: rgb(42,161,152) }
.token.comment{ color: rgb(177,177,177) }

.styleEditor {
  transform-origin: 50% 0% 0;
  -webkit-transform-origin: 50% 0% 0;
}

/*
* 宝贝，今天教你写代码。
* 用代码画一个爱心。
*/

/* 首先，来一个画板 */
.heartWrapper {
  ${isPc.value ? `width: 48vw;
  height: 96vh;` : `width: 96vw;
  height: 43vh;`}
  margin: 10px auto;
  position: relative;
  border: 1px solid;
  background-color: white;
}

/* 画一个方块，当左心室和右心室 */
.heart {
  width: 100px;
  height: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -50px 0 0 -50px;
  border-radius: 20px;
  background: #E88D8D;
  transform: rotate(45deg);
}

/* 画上左心房 */
.heart::before {
  content: '';
  background: #E88D8D;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  position: absolute;
  left: -38px;
  top: 1px;
}
/* 再画上右心房 */
.heart::after {
  content: '';
  background: #E88D8D;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  position: absolute;
  right: -1px;
  top: -38px;
}
/* 太单调了，让心跳动起来 */
@keyframes throb {
  0% {
    transform: scale(1) rotate(45deg);
    opacity: 1;
  }
  100% {
    transform: scale(1.65) rotate(45deg);
    opacity: 0
  }
}
.bounce {
  opacity: 0.2;
  animation: throb 1s infinite linear;
}
/*
* Ok，完成！
* 点击下爱心试试。
*/
`
]
const interval = 1
const progressiveShowStyle = async (n = 0) => {
  const styleDom = document.createElement('style')
  let textNode = document.createTextNode(currentStyleCode.value)
  styleDom.appendChild(textNode)
  document.body.appendChild(styleDom)
  let codeStr = ''
  const showStyle = i => new Promise((resolve) => {
    const style = fullStyle[n]
    const char = style[i]
    if (!style || !char) {
      resolve()
      return
    }
    codeStr += char
    currentStyleCode.value = Prism.highlight(codeStr, Prism.languages.css)
    styleDom.textContent = codeStr
    setTimeout(() => {
      resolve(showStyle(i + 1))
      styleWrapperRef.value.scrollTop = 100000
    }, interval)
  })
  return showStyle(n)
}

const handleClickHeart = () => {
  if (!drawTextFlag.value || clickFlag.value) return
  clickFlag.value = true
  let heart = null
  let anim = null
  const doms = document.querySelectorAll('.heart')
  doms.forEach(dom => {
    dom.classList.remove('bounce')
    dom.classList.add('dissolve')
  })
  heart = new Heart(document.querySelector('#canvas'))
  anim = lottie.loadAnimation({
    container: document.getElementById('lottie'),
    renderer: 'canvas',
    loop: true,
    autoplay: true,
    animationData: animationData
  })
  setTimeout(() => {
    heart.render()
    anim.play()
    heartFlag.value = true
  }, 1000)
}

onMounted(async () => {
  await progressiveShowStyle(0)
  drawTextFlag.value = true
})
</script>

<style scoped>
#canvas {
  position: absolute;
  width: 100%;
  height: 100%;
}
.brithday {
  width: 100%;
  height: 100%;
}
.brith-text {
  position: absolute;
  width: 50%;
  left: 50%;
  top: 39%;
  transform: translate(-50%, -50%);
  opacity: 0;
  z-index: 2;
}
#lottie {
  position: absolute;
  width: 25%;
  height: 25%;
  left: 50%;
  top: 59%;
  transform: translate(-50%, -50%);
  z-index: 2;
  opacity: 0;
}

@keyframes dissolve {
  0% {
    transform: scale(1) rotate(45deg);
    opacity: 1;
  }
  70% {
    transform: scale(0.1) rotate(45deg);
    opacity: 1;
  }
  95% {
    transform: scale(0.1) rotate(45deg) translate(-600px, -600px);
    opacity: 1;
  }
  100% {
    transform: scale(0.1) rotate(45deg) translate(-600px, -600px);
    opacity: 0;
  }
}

.fadeInUp {
  animation: fadeInUp 1s linear 1.2s forwards;
}
.fadeIn {
  animation: fadeInUp 1s linear  forwards;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translate(-50%, -20%);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}
.dissolve {
  animation: dissolve 1.2s linear forwards;
}
.heart{
  z-index: 10;
}
pre {
  margin: 0;
  padding: 0;
}
.styleEditor {
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  box-sizing: border-box;
  margin: 20px auto 0;
}
</style>

