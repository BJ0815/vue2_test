<template>
  <circle :cx="cx" :cy="cy" r="3" fill="#FC309D"></circle>
</template>

<script>
// import { Particle } from './core';
export default {
  name:  'BaseSvgCircle',
  props: ['cx', 'cy']
};
</script>

<style></style>
