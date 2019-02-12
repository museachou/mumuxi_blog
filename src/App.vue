<template>
  <div id="app">
    <div>
      <xhead></xhead>
    </div>
    <router-view/>
  </div>
</template>

<script>
import xhead from './components/index/xhead.vue'
export default {
  name: 'App',
  data () {
    return {
      height: 0,
      width: 0
    }
  },
  components: {
    xhead
  },
  created () {
  },
  beforeMount () {
    this.width = document.documentElement.clientWidth || document.body.clientWidth
  }
}
</script>

<style scoped>
</style>
