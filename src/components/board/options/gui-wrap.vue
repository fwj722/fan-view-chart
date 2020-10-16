<!--
 * @Description: 
 * @Author: fanwenjing
 * @LastEditors: fanwenjing
 * @Date: 2020-10-16 09:38:20
 * @LastEditTime: 2020-10-16 10:35:30
-->
<template>
  <div class="gui-wrap" :class="{'disable':!visible && !simple}">
    <div class="wrap-name">
       <span class="wrap-arrow" @click="simpleToggle" :class="[{'show':visible},{'simple':simple}]">
          <i class="el-icon-arrow-right"></i>
       </span>
      <span class="wrap-label">{{label}}</span>
      <span class="wrap-toggle" @click="toggleVisible" v-if="!simple">
        <el-icon :name="visible?'ios-eye':'ios-eye-off'" size="14"></el-icon>
      </span>
    </div>
    <collapse-transition>
      <div v-if="visible">
        <slot></slot>
      </div>
    </collapse-transition>
  </div>
</template>

<script>

  import CollapseTransition from '@/utils/collapse-transition'

  export default {
    components: { CollapseTransition },
    props: {
      label: String,
      value: Boolean,
      simple: Boolean
    },
    data () {
      return {
        visible: false
      }
    },
    created () {
      this.visible = this.value
    },
    methods: {
      toggleVisible () {
        this.visible = !this.visible
      },
      simpleToggle () {
        if (this.simple) {
          this.visible = !this.visible
        }
      }
    },
    watch: {
      visible () {
        this.$emit('input', this.visible)
        this.$emit('on-change', this.visible)
      },
      value () {
        this.visible = this.value
      }
    }
  }
</script>
