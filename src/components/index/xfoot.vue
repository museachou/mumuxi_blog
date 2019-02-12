<template>
    <div class="content">
        <div class="box isPC">
          <div class="text">
            只做自己能力范围内的事,永远无法进步
          </div>
          <div class="img">
            <img src="../../assets/img/qq.jpg" alt="">
            <p style="font-size: 16px;color: white">欢迎扫码联系我</p>
            <img src="../../assets/img/wx.png" alt="">
          </div>
        </div>
        <div class="isMobile mBox">
          只做自己能力范围内的事,永远无法进步
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      title: 'hello world'
    }
  }
}
</script>

<style scoped lang='less'>
.content{
    width: 100%;
    height: 120px;
    background: black;
    .text{
      flex: 1;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 18px;
      color: white;
    }
    .img{
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-around;
      img{
        width: 100px;height: 100px;
      }
    }
}
.box{
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: space-between;
}
.content{
  width: 100%;
  .mBox{
    width: 100%;
    height: 60px !important;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
  }
}
.isPC{
  display: flex;
}
.isMobile{
  display: none !important;
}
@media screen and (max-width: 960px) {
  .content{
    height: 60px;
  }
  .isPC{
    display: none;
  }
  .isMobile{
    display: flex !important;
  }
}
</style>
