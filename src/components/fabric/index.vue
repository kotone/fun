<template>
  <canvas id="canvas" width="300" height="300"></canvas>
</template>

<script setup>
import { fabric } from 'fabric'
import { onMounted } from 'vue';
onMounted(() => {
  var canvas = new fabric.Canvas('canvas')
  canvas.setBackgroundImage(
    'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/27d1b4e5f8824198b6d51a2b1c2d0d75~tplv-k3u1fbpfcp-zoom-crop-mark:400:400:400:400.awebp',
    canvas.renderAll.bind(canvas)
  )
  var rect = new fabric.Rect({
    top: 100,
    left: 100,
    width: 60,
    height: 70,
    lockRotation: true,
    fill: 'red'
  })
  canvas.add(rect)
  canvas.on('object:moving', function (e) {
    console.log(e, 'moving')
  })
  canvas.on('object:rotating', function (e) {
    console.log(e, 'rotating')
  })
  canvas.on('object:scaling', function (e) {
    console.log(e, 'scaling')
  })
})
</script>