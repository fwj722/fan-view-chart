<template>
  <div class="board-header" flex>
    <div class="header-title">
      <el-tooltip content="返回" placement="right">
        <i class="el-icon-arrow-left" @click="$router.push('/home')"></i>
      </el-tooltip>
      <span v-if="config.title">{{ config.title.text }}</span>
    </div>
    <div class="control" flex-box="1">
      <slot>control box</slot>
    </div>
    <div class="right-box">
      <el-tooltip content="预览" placement="bottom">
        <i class="el-icon-view" @click="openScreen"></i>
      </el-tooltip>
      <el-tooltip content="发布" placement="bottom">
        <i class="el-icon-s-promotion"></i>
      </el-tooltip>
      <el-tooltip content="个人中心" placement="bottom">
        <i class="el-icon-s-custom"></i>
      </el-tooltip>
        <el-dropdown>
          <span class="el-dropdown-link">
             <el-tooltip content="主题" placement="bottom">
               <i  class="el-icon-s-platform theme"></i>
            </el-tooltip>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item disabled>双皮奶</el-dropdown-item>
            <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'BoardHeader',
    props: {
      config: {
        type: Object,
        required: true
      }
    },
    methods: {
      openScreen () {
        // let url = `${this.$base}/screen/${this.$route.params.id}`
        // this.$util.open(url)

        this.$router.push({ name: 'screen', params: { id: this.userId } })
      }
    }
  }
</script>
<style>
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .theme{
    font-size: 20px;
    vertical-align: middle;
    color: white;
  }
</style>
