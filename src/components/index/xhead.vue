<template>
    <div class="header">
        <div class="pcHead ifPC">
            <div class="logo">
                <Icon type="logo-xbox" />
                &nbsp;个人 博客
            </div>
            <div class="navigation">
                <Menu mode="horizontal" @on-select="onSelect" width="auto" :active-name="activeName" class="menu">
                    <MenuItem name="index">
                        <Icon type="ios-home" />
                        网站首页
                    </MenuItem>
                    <MenuItem name="heart">
                        <Icon type="md-heart-outline" />
                        每日心情
                    </MenuItem>
                    <MenuItem name="about">
                        <Icon type="ios-analytics" />
                        关于我
                    </MenuItem>
                    <MenuItem name="message">
                        <Icon type="md-barcode" />
                        给我留言
                    </MenuItem>
                    <MenuItem name="music">
                        <Icon type="ios-musical-notes" />
                        音乐播放器
                    </MenuItem>
                    <MenuItem name="phone">
                        <Icon type="ios-list-box-outline" />
                        通讯录
                    </MenuItem>
                </Menu>
            </div>
            <div class="search">
                <Input v-model="search" search enter-button placeholder="Enter something..." @on-search="onSearch('pc')" />
            </div>
            <Drawer
            title="为你搜索到以下结果"
            v-model="showDraw"
            :width="drawWidth"
            :mask-closable="false"
            >
                <div class="notHaveResult" v-if="searchData.length === 0">无搜索结果 请尝试换关键字搜索</div>
                <ul class="drawer-ul">
                    <li
                    v-for="item of searchData"
                    :key="item.Id"
                    @click="modal(item)"
                    >
                        {{item.title}}
                    </li>
                </ul>
            </Drawer>
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
        <div class="mobileHead ifMobile">
            <!-- 移动端头部 -->
            <div class="mobile-menu">
                <Icon type="md-menu" size="25" @click="mobileMenu" />
            </div>
            <div class="mobile-title">
                <Icon type="logo-xbox" />个人 博客
            </div>
            <div class="mobile-search">
                <Icon type="md-search" size="25" @click="showinput" />
            </div>
            <!-- 搜索框 -->
            <div class="searchInput" :class="{showInput: showInput}">
                <Input v-model="search" @on-search="onSearch('mobile')" search enter-button placeholder="Enter something..." style="width:60%" />
            </div>
            <!-- 菜单框 -->
            <transition
            enter-active-class="animate bounceIn"
            leave-active-class="animate bounceOut"
            >
                <div class="menuBox" v-show="showMenu">
                    <ul class="menuUl" @click="closeMenu">
                        <li @click="onSelect('index')" class="menuLi">
                            <Icon type="ios-home" />
                            网站首页
                        </li>
                        <li @click="onSelect('heart')" class="menuLi">
                            <Icon type="md-heart-outline" />
                            每日心情
                        </li>
                        <li @click="onSelect('about')" class="menuLi">
                            <Icon type="ios-analytics" />
                            关于我
                        </li>
                        <li @click="onSelect('message')" class="menuLi">
                            <Icon type="md-barcode" />
                            给我留言
                        </li>
                        <li @click="onSelect('music')" class="menuLi">
                            <Icon type="ios-musical-notes" />
                            音乐播放器
                        </li>
                        <li @click="onSelect('phone')" class="menuLi">
                            <Icon type="ios-list-box-outline" />
                            通讯录
                        </li>
                    </ul>
                    <div class="closeMenu" @click="closeMenu">
                        <Icon type="md-close" size="30" />
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      // 发送给后端的参数
      search: '',
      // 返回的结果
      searchData: [],
      // 抽屉组件的显示/隐藏
      showDraw: false,
      // modal组件的显示/隐藏
      showModal: false,
      modalData: {},
      // 屏幕高度
      height: 0,
      // 以下为移动端头部变量
      // 显示搜索框
      showInput: false,
      // draw组件宽度
      drawWidth: 400,
      // 菜单显示/隐藏
      showMenu: false,
      activeName: 'index'
    }
  },
  methods: {
    onSearch (screen) {
      let self = this
      this.axios.post(this.api + 'Xhead/search', {
        content: self.search
      })
        .then(function (res) {
          self.searchData = res.data
          self.showDraw = true
          self.showInput = false
          // self.drawWidth = 400
          if (screen === 'pc') {
            self.drawWidth = 400
          } else if (screen === 'mobile') {
            self.drawWidth = 80
          }
        })
        .catch(function (error) {
          self.$Message.error('发生错误')
          console.log(error)
        })
    },
    onSelect (name) {
      if (name === 'music') {
        window.open('http://www.guojp.xyz/mymusic', '_self')
        return
      } else if (name === 'phone') {
        window.open('http://www.guojp.xyz/phone', '_self')
        return
      }
      this.$router.push(`/${name}`)
      // 防止刷新时跳回首页
      sessionStorage.setItem('routerAddress', this.$route.path)
      sessionStorage.setItem('activeName', name)
    },
    modal (item) {
      this.showModal = true
      this.modalData = item
    },
    // 移动端头部事件
    showinput () {
      this.showInput = !this.showInput
      this.search = ''
    },
    mobileSearch () {
      this.showDraw = true
      this.drawWidth = 80
    },
    mobileMenu () {
      this.showMenu = true
    },
    closeMenu () {
      this.showMenu = false
    }
  },
  created () {
    if (sessionStorage.getItem('activeName') !== null) {
      this.activeName = sessionStorage.getItem('activeName')
    } else {
      this.activeName = 'index'
    }
  }
}
</script>

<style lang='less' scoped>
@import '../../assets/css/animate.css';
.header{
    width: 100%;
    display: flex;
    .logo{
        flex: 1;
        font-size: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .navigation{
        flex: 4;
    }
    .search{
        flex: 1;
        display: flex;
        align-items: center;
        margin-right: 20px;
    }
}
.drawer-ul{
    list-style-type: none;
    li{
        height: 50px;
        line-height: 50px;
        padding-left: 10px;
        &:nth-child(even){
            background: #ececec;
        }
        &:hover{
            cursor: pointer;
        }
    }
}
.pcHead{
    display: flex;
    width: 100%;
}
.notHaveResult{
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.ivu-menu{
    width: 100%;
    display: flex;
    border: 0 !important;
}
.ivu-menu-horizontal.ivu-menu-light:after{
    background: transparent;
}
// 移动端布局
.mobileHead{
    width: 100%;
    display: flex;
    height: 50px;
    position: relative;
    .mobile-menu{
        width: 10%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .mobile-title{
        flex: 1;
        font-size: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .mobile-search{
        width: 10%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .searchInput{
        position: absolute;
        top: -100px;
        width: 100%;
        z-index: 99;
        display: flex;
        justify-content: center;
        transition: .4s;
    }
    .menuBox{
        width: 100%;
        background: white;
        z-index: 2;
        position: absolute;
        top: 0;
        left: 0;
        .closeMenu{
            position: absolute;
            top: 10px;
            right: 20px;
            z-index: 10;
        }
        .menuUl{
            width: 100%;
            list-style: none;
            .menuLi{
                width: 100%;
                height: 50px;
                line-height: 50px;
                box-sizing: border-box;
                padding: 3px 10px;
                border-bottom: 1px solid rgb(235, 235, 235);
                &:last-child{
                    border:0;
                }
                &:hover{
                    background: rgb(235, 235, 235);
                }
            }
        }
    }
}
// 显示搜索框 类
.showInput{
    top: 60px !important;
}
// 响应式,判断为PC/手机端,
.ifPC{
    display: flex;
}
.ifMobile{
    display: none;
}
@media screen and (max-width: 960px) {
    .ifPC{
        display: none;
    }
    .ifMobile{
        display: flex !important;
    }
    .drawer-ul{
        li{
            height: 40px !important;
            line-height: 40px !important;
        }
    }
}
</style>
