<template>
  <div id="app">
    <h1>Vue 2.0</h1>

    <TestCase></TestCase>
  </div>
</template>

<script>
import TestCase from "./components/TestCase";

export default {
  name: 'App',
  components: {
    TestCase
  }
}
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
