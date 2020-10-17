<template>
  <div class="dv-home">
    <!--预留60像素备用导航栏或者放置数据图表之类的东西-->
    <header><span class="head-title">Fan大数据可视化在线编辑</span></header>
    <div class="dv-container">
      <div class="dv-ctrl">
        <a href="" class="btn" @click.stop.prevent="openAdmin">
          <i class="iconfont iconkongzhitai"></i>
          <p>进入控制台</p>
        </a>
        <a href="" class="btn" @click.stop.prevent="openScreen">
          <i class="iconfont iconyulan1"></i>
          <p>页面预览</p>
        </a>
        <a href="" class="btn" @click.stop.prevent="resetLocalData">
          <i class="iconfont iconchushihua"></i>
          <p>本地数据初始化</p>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  import { initLocalData } from '../api/app/app-request'

  export default {
    name: 'home',
    data () {
      return {
        userId: ''
      }
    },
    created () {
      this.userId = 'dv1e443967LZP2Dj'
    },
    methods: {
      openAdmin () {
        // let url = `${this.$base}/admin/${this.userId}`
        // this.$util.open(url)
        this.$router.push({ name: 'admin', params: { id: this.userId } })
      },
      openScreen () {
        // let url = `${this.$base}/screen/${this.userId}`
        // this.$util.open(url)

        this.$router.push({ name: 'screen', params: { id: this.userId } })
      },
      resetLocalData () {
        initLocalData().then(res => {
          this.$message({ type: 'success', message: res.message })
        })
      }
    }
  }
</script>
