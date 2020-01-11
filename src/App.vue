<template>
  <div id="app">
    <Header></Header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
<player></player>
  </div>
</template>

<script>
import Header from './components/m-header/m-header'
import tab from './components/tab/tab'
import player from './components/player/player'
export default {
  name: 'App',
  components: {
    Header,
    tab,
    player
  }
}
</script>

<style scoped></style>
