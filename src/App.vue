<template>
  <div id="app">
    <CalendarWeek />
    <CalendarEntry />
  </div>
</template>

<script setup>
  import CalendarWeek from './components/CalendarWeek.vue';
  import CalendarEntry from './components/CalendarEntry.vue';
</script>

<style lang="scss">
html, body, #app {
  height: 100%;
}
</style>

<style lang="scss" scoped>
#app {
  background: #6e6e6e;
  display: flex;
  flex-direction: column;
  align-items: center;
  -webkit-align-items: center;
  justify-content: center;
  -webkit-justify-content: center;
}
</style>
