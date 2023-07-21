<template>
  <div id="lottie"></div>
</template>

<script setup>
import lottie from 'lottie-web'
import { onMounted } from 'vue';
import animationData from './cake.json'

onMounted (() => {
  const anim = lottie.loadAnimation({
    container: document.getElementById('lottie'),
    renderer: 'canvas',
    loop: false,
    autoplay: true,
    animationData: animationData
  })
  anim.play()
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