<template>
  <section>
    <p>[目前總數]: {{ total }}</p>
    <input type="number" v-model="total" />
    <BaseSvgBubble>
      <BaseSvgCircle
        v-for="(particles, i) in elements"
        :key="i"
        :cx="particles.p.x"
        :cy="particles.p.y"
      ></BaseSvgCircle>
    </BaseSvgBubble>
  </section>
</template>

<script>
import BaseSvgBubble from "./core/BaseSvgBubble.vue";
import Stats from "stats.js";
import { DEFAULT, genBubbles } from "./core";

import BaseSvgCircle from "./core/BaseSvgCircle";

const stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom

export default {
  name: "TestCase",
  components: {
    BaseSvgBubble,
    BaseSvgCircle,
  },
  data: function() {
    return {
      total: DEFAULT.TOTAL,
      anime: null,
      elements: genBubbles(DEFAULT.TOTAL),
    };
  },
  watch: {
    total: function(val) {
      this.elements = genBubbles(val);
    },
  },
  mounted() {
    this.render();
    document.body.appendChild(stats.dom);
  },
  beforeDestroy() {
    this.cancelAnime();
  },
  methods: {
    render() {
      this.cancelAnime();
      this.anime = requestAnimationFrame(this.render);
      this.move();
    },
    cancelAnime() {
      return this.anime && cancelAnimationFrame(this.anime);
    },
    move() {
      stats.begin();
      for (let i = 0; i < +this.total; i++) {
        const particles = this.elements[i];
        if (particles) {
          if (particles.hitsWallX()) particles.v.x *= -1;
          if (particles.hitsWallY()) particles.v.y *= -1;
          particles.p.y += particles.v.y;
          particles.p.x += particles.v.x;
        }
      }
      stats.end();
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
