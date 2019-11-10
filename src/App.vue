<template>
  <div id="app">
    <Header></Header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>

  </div>
</template>

<script>
import Header from './components/m-header/m-header'
import tab from './components/tab/tab'
export default {
  name: 'App',
  components: {
    Header,
    tab
  }
}
</script>

<style scoped></style>
