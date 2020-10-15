<template>
  <section>
    <p>[目前總數]: {{ total }}</p>
    <input type="range" min="100" max="3500" :step="total" v-model="total" />
    <svg viewbox="-500 -500 1000 1000" class="scene">
      <BaseSvgCircle
        v-for="(particles, i) in elements"
        :key="i"
        :cx="particles.p.x"
        :cy="particles.p.y"
      ></BaseSvgCircle>
    </svg>
  </section>
</template>

<script>
import Vue from "vue";
import Stats from "stats.js";
import { Particle } from "./core";

import BaseSvgCircle from "./BaseSvgCircle";

const stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
// let anime = null;
export default {
  components: {
    BaseSvgCircle
  },
  data: function() {
    return {
      total: 100,
      anime: null,
      elements: Array(100)
        .fill(0)
        .map(() => new Particle()),
    };
  },
  watch: {
    total: function(val) {
      this.cancelAnime()
      Vue.set(this, 'elements', Array(+val)
        .fill(0)
        .map(() => new Particle()));
      this.move()
    },
  },
  mounted() {
    this.move();
    document.body.appendChild(stats.dom);
  },
  beforeDestroy() {
    this.cancelAnime()
  },
  methods: {
    cancelAnime () {
      return this.anime && cancelAnimationFrame(this.anime);
    },
    move() {
      stats.begin();
      for (let i = 0; i < +this.total; i++) {
        const particles = this.elements[i];
        if (particles) {
          particles.p.x += Math.round(particles.v.x / 60);
          particles.p.y += Math.round(particles.v.y / 60);

          if (particles.hitsWallX()) {
            particles.v.x *= -1;
          }
          if (particles.hitsWallY()) {
            particles.v.y *= -1;
          }
        }
      }
      stats.end();
      this.anime = requestAnimationFrame(this.move);
    },
  },
};
</script>

<style lang="css" scoped>
.scene {
  display: block;
  margin: 0 auto;
  width: 500px;
  height: 500px;
  background: black;
}
</style>
