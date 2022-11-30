<template>
  <canvas class="canvas"></canvas>
  <div class="tools">
    <div @click="clear" class="btn">清除</div>
  </div>
</template>

<script setup>
import SignaturePad from 'signature_pad'
import { onMounted } from 'vue';

let signaturePad = {}
onMounted(() => {
  const canvas = document.querySelector('canvas')
  signaturePad = new SignaturePad(canvas)
  const resizeCanvas = () => {
    const ratio =  Math.max(window.devicePixelRatio || 1, 1)
    canvas.width = canvas.offsetWidth * ratio
    canvas.height = canvas.offsetHeight * ratio
    canvas.getContext('2d').scale(ratio, ratio)
    signaturePad.clear()
  }
  canvas.addEventListener('contextmenu', function(e){
    e.preventDefault()
  })
  resizeCanvas()
})

const clear = () => {
  signaturePad.clear()
}

</script>

<style scoped>
  .canvas {
    width: 600px;
    height: 400px;
    border: 1px solid red;
    touch-action: none;
  }
</style>