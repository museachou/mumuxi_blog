<template>
    <div class="content">
        <div class="top" v-for="(project, index) of listData" :key="index">
            <Card class="card" v-for="item of project" :key="item.Id">
                <p slot="title">
                    <Icon :type="item.icon" />
                    {{item.title}}
                </p>
                <div class="top-content">
                    {{item.content}}
                </div>
            </Card>
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
    this.axios.post(this.api + 'about/query')
      .then(function (res) {
        self.listData = res.data
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
</script>

<style lang='less' scoped>
.content{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.top{
    margin-top: 20px;
    width: 90%;
    display: flex;
    .top-content{
        height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 25px;
        font-weight: bold;
    }
}
.card{
    flex: 1;
    margin-right: 10px;
    &:last-child{
        margin-right: 0;
    }
}
@media (max-width: 768px) {
    .top{
        flex-wrap:wrap;
        flex-direction: column;
        margin-top: 0;
        .card{
            width: 100%;
            margin-bottom: 10px;
        }
    }
}
</style>
