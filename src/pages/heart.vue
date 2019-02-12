<template>
    <div class="content">
        <div class="box">
            <div class="left" v-for="(item,index) of listData" :key="index">
                <Timeline>
                    <TimelineItem v-for="project of item" :key="project.Id">
                        <p class="time">{{project.year}}年 {{project.month}}月
                            <span v-if="project.date">{{project.date}}日</span></p>
                        <p class="content">{{project.content}}</p>
                    </TimelineItem>
                </Timeline>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      listData: []
    }
  },
  created () {
    let self = this
    this.axios.post(this.api + 'heart/queryDiary')
      .then(function (res) {
        self.listData = res.data
        // self.listData.reverse()
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
    .box{
        display: flex;
        justify-content: space-around;
        margin-top: 20px;
    }
}
@media (max-width: 600px) {
    .content{
        width: 100%;
        .box{
            width: 100%;
            flex-wrap: wrap;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            .left{
                width: 100%;
                box-sizing: border-box;
                padding: 0 50px;
                display: flex;
            }
        }
    }
}
</style>
