<template>
  <div id="lottie"></div>
</template>

<script setup>
import lottie from 'lottie-web'
// import LottieCompress from 'lottie-compress'
import { onMounted } from 'vue';
import animationData from './banner-1.json'

onMounted (() => {
  // const lottieCompress = new LottieCompress(animationData);
  // const ret = await lottieCompress.execute()
  // console.log(ret, 'ret')
  let directionFlag = false
  const anim = lottie.loadAnimation({
    container: document.getElementById('lottie'),
    renderer: 'canvas',
    loop: false,
    autoplay: true,
    animationData: animationData
  })
  const loop = () => {
    anim.setDirection(directionFlag ? -1 : 1)
    anim.play()
  }
  anim.addEventListener('complete', () => {
    directionFlag = !directionFlag
    loop()
  })
}) 
</script>

<style>
#lottie{
  background-color:#ffffff;
  width:100%;
  height:100%;
  display:block;
  overflow: hidden;
  transform: translate3d(0,0,0);
  text-align: center;
  opacity: 1;
}
</style>