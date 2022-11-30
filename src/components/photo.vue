<template>
  <canvas id="canvas"></canvas>
</template>

<script setup>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { onMounted } from 'vue'

const mian = () => {
  const canvas = document.querySelector('#canvas')
  const renderer = new THREE.WebGLRenderer({canvas})
  renderer.setSize(window.innerWidth, window.innerHeight);
  const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 100)
  camera.position.z = 3

  const controls = new OrbitControls(camera, canvas)
  controls.target.set(0, 0, 0)
  controls.update()

  const scene = new THREE.Scene()
  const loader = new THREE.CubeTextureLoader()
  const texture = loader.load([
    'https://threejs.org/manual/examples/resources/images/cubemaps/computer-history-museum/pos-x.jpg',
    'https://threejs.org/manual/examples/resources/images/cubemaps/computer-history-museum/neg-x.jpg',
    'https://threejs.org/manual/examples/resources/images/cubemaps/computer-history-museum/pos-y.jpg',
    'https://threejs.org/manual/examples/resources/images/cubemaps/computer-history-museum/neg-y.jpg',
    'https://threejs.org/manual/examples/resources/images/cubemaps/computer-history-museum/pos-z.jpg',
    'https://threejs.org/manual/examples/resources/images/cubemaps/computer-history-museum/neg-z.jpg',
  ])
  scene.background = texture
  // const loader = new THREE.TextureLoader()
  // const texture = loader.load(
  //   'https://threejs.org/manual/examples/resources/images/equirectangularmaps/tears_of_steel_bridge_2k.jpg',
  //   () => {
  //     const rt = new THREE.WebGLCubeRenderTarget(texture.image.height)
  //     rt.fromEquirectangularTexture(renderer, texture)
  //     scene.background = rt.texture
  //   }
  // )
  const resizeRendererToDisplaySize = (renderer) => {
    const canvas = renderer.domElement
    const width = canvas.clientWidth
    const height = canvas.clientHeight
    const needResize = canvas.width !== width || canvas.height !== height
    if (needResize) {
      renderer.setSize(width, height, false)
    }
    return needResize
  }
  const animate = () => {
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement
      camera.aspect = canvas.clientWidth / canvas.clientHeight
      camera.updateProjectionMatrix()
    }
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
  }
  animate()
}
onMounted(() => {
  mian()
})
</script>
