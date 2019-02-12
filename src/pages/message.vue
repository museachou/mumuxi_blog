<template>
    <div class="content">
        <div class="input">
            <Input
            type="textarea"
            v-model="inputContent"
            :rows="10"
            placeholder="请输入您的留言,可以是对网站的建议,或者是任何你想说的话"
            />
        </div>
        <div class="btn">
            <Button type="success" @click="postMessage">发表留言</Button>
        </div>
        <div class="message">
            <Divider orientation="center">以下为最近用户的留言</Divider>
            <ul class="messageUl">
                <li class="messageLi" v-for="item of listData" :key="item.Id">
                    <div class="messageContent">
                        <div class="info">{{item.name}}            {{item.time}}</div>
                        <div style="word-wrap:break-word;font-size:20px;font-weight:bold" class="isMobile">
                            {{item.content}}
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      inputContent: '',
      listData: []
    }
  },
  methods: {
    postMessage () {
      if (this.inputContent === '') {
        this.$Message.warning('请勿发表空留言')
        return
      }
      let self = this
      this.axios.post(this.api + 'message/insertMessage', {
        message: self.inputContent
      })
        .then(function (res) {
          if (res.data !== {} && res.data !== null) {
            self.$Message.success('发表留言成功')
            self.listData.unshift(res.data)
            self.inputContent = ''
          } else {
            self.$Message.error('留言发表失败,请稍后重试')
          }
        })
        .catch(function (error) {
          self.$Message.error('发生错误,请按f12查看错误信息')
          console.log(error)
        })
    }
  },
  created () {
    let self = this
    this.axios.post(this.api + 'message/queryMessage')
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
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .input{
        width: 90%;
        margin-top: 20px;
    }
    .btn{
        width: 90%;
        display: flex;
        justify-content: flex-end;
        margin-top: 20px;
    }
    .message{
        width: 100%;
        .messageUl{
            .messageLi{
                height: 80px;
                display: flex;
                align-items: center;
                .messageContent{
                    width: 100%;
                    box-sizing: border-box;
                    padding-left: 30px;
                    .info{
                        white-space: pre;
                        margin-bottom: 10px;
                    }
                }
                &:nth-child(odd){
                    background: #ededed;
                }
            }
        }
    }
}
@media (max-width: 768px) {
    .isMobile{
        font-size: 12px !important;
    }
    .messageLi{
        height: 60px !important;
    }
}
</style>
