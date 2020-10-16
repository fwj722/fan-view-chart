<template>
  <div class="board-coverage" :style="config.style">
    <div flex="dir:top" style="height: 100%;">
      <div class="header-title" v-if="config.title.enable">{{ config.title.text }}</div>
      <div class="control" :class="{'selected':currentSelected}">
        <div class="context-menu-item"
             v-for="item in menuList" :key="item.order"
             @click="handleCommand(item)">
          <i :class="item.icon" :title="item.text"></i>
        </div>
      </div>
      <div class="control-body" flex-box="1">
        <div class="body-wrap" @click="cancelSelected">
          <el-scrollbar style="height: 100%;">
            <slot></slot>
          </el-scrollbar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import elScrollbar from '@/components/scrollbar/src/main'
  export default {
    name: 'BoardCoverage',
    components:{elScrollbar},
    props: {
      config: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        menuList: [
          { icon: 'el-icon-top', text: '上移一层', order: 'up' },
          { icon: 'el-icon-bottom', text: '下移一层', order: 'down' },
          { icon: 'el-icon-caret-top', text: '置顶', order: 'top' },
          { icon: 'el-icon-caret-bottom', text: '置底', order: 'bottom' }
        ]
      }
    },
    computed: {
      ...mapGetters(['currentSelected'])
    },
    methods: {
      // transform点击事件
      cancelSelected () {
        this.$store.dispatch('SingleSelected', null)
      },
      //  执行菜单命令
      handleCommand (item) {
        if (this.currentSelected) {
          this.$message(item.text)
          this.$store.dispatch('ContextMenuCommand', item.order)
        }
      }
    }
  }
</script>
