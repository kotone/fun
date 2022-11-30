<script setup>
import * as THREE from 'three'
import { onMounted, ref } from 'vue'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
onMounted(() => {
  init3D()
})
const init3D = () => {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color('#eee')
  const canvas = document.querySelector('#three')
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight);
  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.2,
    500
  )
  camera.position.z = 10
  const gltfLoader = new GLTFLoader()
  // 纹理素材
  const materials = {
    'material_1': new THREE.TextureLoader().load('/klee_fbx/textures/material_1_baseColor.jpeg'),
    'material_2': new THREE.TextureLoader().load('/klee_fbx/textures/material_2_baseColor.jpeg'),
    'material_3': new THREE.TextureLoader().load('/klee_fbx/textures/material_3_baseColor.png'),
    'material': new THREE.TextureLoader().load('/klee_fbx/textures/material_baseColor.jpeg')
  }
  gltfLoader.load('/klee_fbx/scene.gltf', (gltf) => {
    var model = gltf.scene
    model.traverse((o) => {
      if (o.material && o.material.name) {
        //将图片作为纹理加载
        let explosionTexture = materials[o.material.name]
        //调整纹理图的方向
        explosionTexture.flipY = false
        //将纹理图生成基础网格材质(MeshBasicMaterial)
        const material = new THREE.MeshBasicMaterial({
          map: explosionTexture,
          side: THREE.DoubleSide
        })
        //给模型每部分上材质
        o.material = material
      }
      if (o.isMesh) {
        o.castShadow = true
        o.receiveShadow = true
      }
    })
    gltf.scene.scale.set(0.04, 0.04, 0.04)
    scene.add(model)
  })
  // 控制器
  const setControl = () => {
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
  }
  function animate() {
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
  }
  setControl()
  animate()
}

</script>

<template>
  <canvas id="three"></canvas>
</template>

<style scoped>
#three {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
}
</style>
