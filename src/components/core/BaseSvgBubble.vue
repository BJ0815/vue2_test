<template>
  <svg class="scene">
    <slot></slot>
  </svg>
</template>

<script>
export default {
  name: 'BaseSvgBubble'
};
</script>

<style lang="css" scoped>
.scene {
  display: block;
  margin: 20px auto;
  width: 800px;
  height: 600px;
  background: black;
}
</style>
