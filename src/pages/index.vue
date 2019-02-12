<template>
    <div class="content">
        <!-- <div v-if="width <= 1">
          <div class="mask" :style="{height: height+'px'}">
            目前仅支持电脑浏览,请使用PC端访问本站
          </div>
        </div> -->
        <div class="test">
          <xbody
          :imgText="imgText"
          :myinfo="myinfo"
          :swiperImg="swiperImg"
          ></xbody>
          <xcontent></xcontent>
          <xfoot></xfoot>
        </div>
    </div>
</template>

<script>
import xhead from '../components/index/xhead.vue'
import xbody from '../components/index/xbody.vue'
import xcontent from '../components/index/xcontent.vue'
import xfoot from '../components/index/xfoot.vue'
let self
export default {
  beforeMount () {
    this.height = document.documentElement.scrollHeight || document.body.scrollHeight
    this.width = document.documentElement.scrollWidth || document.body.scrollWidth
  },
  data () {
    return {
      title: 'hello world',
      value1: 0,
      height: 0,
      width: 0,
      // xbody组件数据
      myinfo: {},
      imgText: [],
      swiperImg: []
    }
  },
  components: {
    xhead,
    xbody,
    xcontent,
    xfoot
  },
  created () {
    self = this
    this.axios.post(this.api + 'Xbody/queryInfo')
      .then(function (res) {
        self.myinfo = res.data[0]
      })
      .catch(function (error) {
        console.log(error)
      })
    this.axios.post(this.api + 'xbody/querySwiper')
      .then(function (res) {
        self.swiperImg = res.data
      })
      .catch(function (error) {
        console.log(error)
      })
    this.axios.post(this.api + 'xbody/queryPT')
      .then(function (res) {
        self.imgText = res.data
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
</script>

<style lang='less' scoped>
.content{
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
}
.test{
  .content;
}
.mask{
  position: fixed;
  width: 100%;
  background: white;
  justify-content: center;
  align-items: center;
  display: flex;
  top: 0;
  left: 0;
  z-index: 100;
}
</style>
