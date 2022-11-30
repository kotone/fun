<template>
  <canvas id="canvas"></canvas>
</template>

<script setup>
import * as THREE from 'three'
import { onMounted } from 'vue'

class Box {
  constructor (id) {
    const canvas = document.querySelector(id)
    this.renderer = new THREE.WebGLRenderer({canvas, antialias: true})
    // 网格
    this.cubes = []
  }
  init () {
    this.createCamera()
    this.creatScene()
    this.createLight()
    this.creatBox()
    this.cubes = [
      this.creatBox(0x44aa88,  0),
      // this.creatBox(0x8844aa, -2),
      // this.creatBox(0xaa8844,  2)
    ]
    requestAnimationFrame((time) => this.animate(time))
  }
  createCamera () {
    const camera = new THREE.PerspectiveCamera(75, 10, 0.2, 50)
    camera.position.z = 2
    this.camera = camera
  }
  creatScene () {
    const scene = new THREE.Scene()
    this.scene = scene
  }
  // 光
  createLight () {
    const color = 0xFFFFFF
    const intensity = 1
    const light = new THREE.DirectionalLight(color, intensity)
    light.position.set(-1, 2, 4)
    this.scene.add(light)
  }
  creatBox (color, x) {
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshPhongMaterial({color})
    const cube = new THREE.Mesh(geometry, material)
    this.scene.add(cube)
    cube.position.x = x
    return cube
  }
  animate (time) {
    const {cubes, renderer, scene, camera} = this
    time *= 0.001
    cubes.forEach((cube, ndx) => {
      const speed = 1 + ndx * .1
      const rot = time * speed
      cube.rotation.x = rot
      cube.rotation.y = rot
    })
    renderer.render(scene, camera)
    requestAnimationFrame((time) => this.animate(time))
  }
}
onMounted(() => {
  new Box('#canvas').init()
})
</script>