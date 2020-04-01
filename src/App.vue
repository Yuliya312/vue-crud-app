<template>
  <div id="app">
    <div class="container">
      <vNavigation />
      <router-view />
    </div>
  </div>

</template>



<script>

import vNavigation from './components/v-navigation'

export default {
  name: 'App',
  components: {
    vNavigation,
  },
  computed: {
  },
  methods: {
  },
  mounted() {
  },
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
