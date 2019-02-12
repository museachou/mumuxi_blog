<template>
    <div class="content">
        <div class="indexTab">
            <Tabs value="one">
                <TabPane label="个人博客日记" name="one">
                    <div class="data">
                        <ul class="data-ul">
                            <li
                            v-for="item of listData[0]"
                            @click="modal(item)"
                            :key="item.Id">
                            {{item.title}}
                            </li>
                        </ul>
                    </div>
                </TabPane>
                <TabPane label="网站建设" name="two">
                    <div class="data">
                        <ul class="data-ul">
                            <li
                            v-for="item of listData[1]"
                            @click="modal(item)"
                            :key="item.Id"
                            >
                            {{item.title}}
                            </li>
                        </ul>
                    </div>
                </TabPane>
                <TabPane label="推荐工具" name="three">
                    <div class="data">
                        <ul class="data-ul">
                            <li
                            v-for="item of listData[2]"
                            @click="modal(item)"
                            :key="item.Id"
                            >
                            {{item.title}}
                            </li>
                        </ul>
                    </div>
                </TabPane>
                <TabPane label="设计心情" name="four">
                    <div class="data">
                        <ul class="data-ul">
                            <li
                            v-for="item of listData[3]"
                            @click="modal(item)"
                            :key="item.Id"
                            >
                            {{item.title}}
                            </li>
                        </ul>
                    </div>
                </TabPane>
            </Tabs>
        </div>
        <div class="indexLater">
            <div class="indexLaterContent">
                <Card>
                    <p slot="title">
                        <Icon type="md-alarm" />
                        最近更新
                    </p>
                    <ul>
                        <li
                        v-for="item of laterData"
                        :key="item.Id"
                        @click="modal(item)"
                        >
                            {{item.title}}
                        </li>
                    </ul>
                </Card>
            </div>
        </div>
        <Modal
            v-model="showModal"
            >
            <div slot="header">
                <p style="font-size: 10px;">标题:</p>
                <p>{{modalData.title}}</p>
            </div>
            <div>
                <p style="font-size: 10px">内容:</p>
                <p v-html="modalData.content"></p>
            </div>
        </Modal>
    </div>
</template>

<script>
let self
export default {
  data () {
    return {
      listData: [],
      laterData: [],
      showModal: false,
      modalData: {
        title: '',
        content: ''
      }
    }
  },
  created () {
    self = this
    this.axios.post(this.api + 'Xcontent/queryTab')
      .then(function (res) {
        self.listData = res.data
      })
      .catch(function (error) {
        console.log(error)
      })
    this.axios.post(this.api + 'Xcontent/later')
      .then(function (res) {
        self.laterData = res.data
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  methods: {
    modal (item) {
      this.modalData.title = item.title
      this.modalData.content = item.content
      this.showModal = true
    }
    // modal (item) {
    //   this.$router.push(`/newstext/${item.tid}`)
    // }
  }
}
</script>

<style lang='less' scoped>
.content{
    width: 90%;
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    // height: 300px;
    .indexTab{
        width: 50%;
        height: 100%;
        height: 300px;
        box-sizing: border-box;
        padding: 5px;
    }
    .indexLater{
        width: 50%;
        height: 100%;
        height: 300px;
        box-sizing: border-box;
        padding-left: 5px;
        .indexLaterContent{
            width: 100%;
            height: 100%;
            height: 300px;
            ul{
                list-style-type: none;
                li{
                    height: 40px;
                    line-height: 40px;
                    padding-left: 5px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    &:hover{
                        cursor: pointer;
                    }
                    &:nth-child(odd){
                        background: rgba(239, 239, 239, 0.8);
                    }
                }
            }
        }
    }
}
.data{
    width: 100%;
    .data-ul{
        // list-style: disc !important;
        list-style: none;
        li{
            width: 100%;
            height: 40px;
            line-height: 40px;
            border-bottom: 1px solid black;
            transition: .4s;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            &:last-child{
                border-bottom: 0;
            }
            &:hover{
                font-size: 14px;
                cursor: pointer;
                list-style-type: square !important;
            }
        }
    }
}

@media (max-width: 960px) {
    .content{
        width: 100%;
        flex-direction: column !important;
        // margin-top:680px;
        .indexTab{
            width: 100%;
            font-size: 12px;
        }
        .indexLater{
            width: 100%;
            padding: 0;
            margin-top: 10px;
        }
    }
}
</style>
