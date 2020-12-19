<template>
  <div>
    <figma-project/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FigmaProject from '@/components/FigmaProject.vue'

export default defineComponent({
  name: 'Home',
  components: { FigmaProject }
})
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: sans-serif;
}

.title-layer {
  height: 30px;
  position: absolute;
  top: -30px;
  left: 0;
  border-radius: 4px 4px 0 0;
  background-color: #5263d0;
  transition: 0.15s linear;
  color: #ffffff;
  opacity: 0;
  padding: 0 6px;
  display: flex;
  align-items: center;
}

.main-background-wrapper {
  position: relative;
}

.layer-wrapper {
  position: absolute;
}
</style>
