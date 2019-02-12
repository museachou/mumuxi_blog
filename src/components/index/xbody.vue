<template>
    <div class="body">
        <div class="body-top">
            <div class="swiper" v-if="swiperImg.length > 0">
                <swiper :options="swiperOption">
                    <swiper-slide
                    class="swiper-img"
                    v-for="item of swiperImg"
                    :key="item.img_id"
                    >
                        <img :src="item.address" alt="" @click="swiperClick">
                    </swiper-slide>
                    <div class="swiper-pagination"  slot="pagination"></div>
                </swiper>
            </div>
            <div class="news">
                <div
                class="news-top"
                v-for="(item, index) of imgText"
                :key="item.Id"
                :class="{newsBottom: index === 1}"
                @click="newsClick(item)"
                >
                    <p class="news-tip-text">
                        {{item.title}}
                    </p>
                    <img :src="item.img" alt="">
                </div>
            </div>
            <div class="myinfo">
                <Card class="infoCard">
                    <p slot="title" style="font-size: 16px">
                        <Icon type="ios-information-circle-outline" size="16" />
                        我的名片
                    </p>
                    <div class="myinfoContent">
                        <div class="myinfoContentText">
                            <ul>
                                <li>网名: {{myinfo.name}}</li>
                                <li>职业: {{myinfo.job}}</li>
                                <li>现居: {{myinfo.address}}</li>
                                <li>Email: {{myinfo.mail}}</li>
                            </ul>
                        </div>
                        <div class="muinfoContentChat">
                            <Poptip placement="top-start" trigger="hover" title="本人QQ 欢迎来访" content="ID: 1714385126">
                                <img src="../../assets/img/QQ.png" alt="">
                            </Poptip>
                            <Poptip trigger="hover" title="本人微博 欢迎来访" content="ID: 我姓郭咯">
                                <img src="../../assets/img/微博.png" alt="">
                            </Poptip>
                            <Poptip placement="top-end" trigger="hover" title="本人微信 欢迎来访" content="ID: 1714385126">
                                <img src="../../assets/img/微信.png" alt="">
                            </Poptip>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
        <Modal
        v-model="showModal"
        :title="title"
        >
            <p>{{content}}</p>
        </Modal>
    </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  props: {
    myinfo: {
      type: Object
    },
    swiperImg: {
      type: Array
    },
    imgText: {
      type: Array
    }
  },
  data () {
    return {
      swiperOption: {
        // some swiper options/callbacks
        // 所有的参数同 swiper 官方 api 参数
        // ...
        effect: 'coverflow',
        loop: true,
        pagination: {
          el: '.swiper-pagination'
        }
      },
      showModal: false,
      title: '',
      content: ''
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  methods: {
    newsClick (item) {
      this.showModal = true
      this.title = item.title
      this.content = item.content
    },
    swiperClick () {
      this.$Message.warning('#这里还没想好要做什么')
    }
  }
}
</script>

<style lang='less' scoped>
    .body{
        width: 90%;
        display: flex;
        margin-top: 20px;
        .body-top{
            width: 100%;
            height: 300px;
            display: flex;
            .swiper{
                width: 50%;
                height: 100%;
                box-sizing: border-box;
                padding: 0 5px;
                .swiper-img{
                    width: 100%;
                    height: 100%;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
            }
            .news{
                width: 25%;
                height: 100%;
                box-sizing: border-box;
                padding: 0 5px;
                .news-top{
                    width: 100%;
                    height: 50%;
                    border-radius: 10px;
                    position: relative;
                    box-sizing: border-box;
                    padding-bottom: 5px;
                    img{
                        width: 100%;
                        height: 100%;
                        border-radius: 10px;
                        overflow: hidden;
                    }
                    .news-tip-text{
                        position: absolute;
                        width: 100%;
                        height: calc(100% - 5px);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        top: 0;
                        color: white;
                        font-size: 20px;
                        background: rgba(0, 0, 0, 0.59);
                        transition: .4s;
                        overflow: hidden;
                        border-radius: 10px;
                        &:hover{
                            font-size: 22px;
                            background: rgba(0,0,0,0.8);
                            cursor: pointer;
                        }
                    }
                }
                .newsBottom{
                    .news-top;
                    box-sizing: border-box;
                    padding-bottom: 0px;
                    padding-top: 5px;
                    .news-tip-text{
                        margin-top: 5px;
                    }
                }
            }
            .myinfo{
                width: 25%;
                height: 100%;
                .infoCard{
                    flex-direction: column;
                    height: 100%;
                    .myinfoContent{
                        font-size: 16px;
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        .myinfoContentText{
                            width: 100%;
                            margin-bottom: 10px;
                            ul{
                                width: 100%;
                                li{
                                    width: 100%;
                                    height: 40px;
                                    line-height: 40px;
                                    white-space: nowrap;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                }
                            }
                        }
                        .muinfoContentChat{
                            width: 100%;
                            display: flex;
                            flex: 1;
                            justify-content: space-between;
                            align-items: center;
                            img{
                                width: 50px;
                                height: 50px;
                            }
                        }
                    }
                }
            }
        }
    }
    // 写在外面的样式为 修改iview默认样式或者修改html默认样式
    .swiper-container{
        height: 100%;
    }
    .ivu-card-body{
        height: 100%;
    }
    ul,li{
        list-style: none;
    }
    // 响应式样式
    @media screen and (max-width: 960px) {
        .body{
            width: 100%;
            margin-top: 0;
            height: auto !important;
            .body-top{
                flex-wrap: wrap;
                height: auto;
                .swiper{
                    width: 100% !important;
                    height: 220px;
                }
                .news{
                    width: 100% !important;
                    margin-top: 10px;
                    height: 400px;
                }
                .myinfo{
                    width: 100% !important;
                    height: auto;
                    margin-top: 10px;
                }
            }
        }
    }
    @media screen and (max-width: 768px) {
        .body{
            width: 100%;
            margin-top: 0;
            .body-top{
                flex-wrap: wrap;
                .swiper{
                    height: 180px;
                }
                .news{
                    height: 300px;
                }
            }
        }
    }
</style>
