<template>
    <div class="content" v-html="item.content">
        <!-- {{item.content}} -->
    </div>
</template>

<script>
let self
export default {
  data () {
    return {
      tid: '',
      item: {}
    }
  },
  created () {
    self = this
    this.tid = this.$route.params.tid
    let sub = this.tid.substring(0, 1)
    let table
    switch (sub) {
      case 'a':
        table = 'blog_report'
        break
      case 'b':
        table = 'tab_b'
        break
      case 'c':
        table = 'tab_c'
        break
      case 'd':
        table = 'tab_d'
        break
    }
    this.axios.post(this.api + 'xcontent/query_one', {
      tid: self.tid,
      table: table
    })
      .then(function (res) {
        console.log(res)
        self.item = res.data
        console.log(self.item.content)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
</script>

<style scoped>
.content{
    width: 100%;
}
</style>
