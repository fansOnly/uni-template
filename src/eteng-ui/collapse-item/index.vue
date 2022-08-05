<template>
  <div class="et-collapse-item">
    <et-cell :title="title" :text="text" :border="expanded && border" :title-width="titleWidth" :is-link="isLink" :disabled="disabled" :class="customClass" :custom-style="customStyle" :title-style="titleStyle" :text-style="textStyle" hover-class="none" @click="onClick">
      <template slot="title">
        <slot name="title"></slot>
      </template>
      <template slot="text">
        <slot name="text"></slot>
      </template>
      <et-icon slot="icon" :class="['et-collapse-item-icon', expanded ? 'is-expanded' : null]" :name="icon" size="20" />
    </et-cell>
    <view class="et-collapse-item-body" :style="bodyStyled">
      <view class="et-collapse-item-content">
        <slot></slot>
      </view>
    </view>
  </div>
</template>

<script>
  import { getRect } from '@/shared/platform'
  import { getParentInstance } from '@/shared'
  export default {
    name: 'et-collapse-item',
    props: {
      // 面板的值属性
      name: null,
      // 左侧标题 - 透传
      title: null,
      // 右侧文本内容 - 透传
      text: null,
      // 左侧标题宽度，不设置默认为铺满 - 透传
      titleWidth: {
        type: [String, Number],
        default: 80
      },
      // 是否链接模式，为 true 时显示右侧图标 - 透传
      isLink: {
        type: Boolean,
        default: true
      },
      // 右侧图标
      icon: {
        type: String,
        default: 'arrow-down'
      },
      // 是否显示标题下边框 - 透传
      border: {
        type: Boolean,
        default: true
      },
      // 是否禁用当前面板 - 透传
      disabled: {
        type: Boolean,
        default: false
      },
      // 自定义组件class - 透传
      customClass: null,
      // 自定义组件样式 - 透传
      customStyle: null,
      // 自定义标题样式 - 透传
      titleStyle: null,
      // 自定义右侧文本样式 - 透传
      textStyle: null
    },
    data() {
      return {
        animation: false,
        expanded: false,
        height: 0,
      }
    },
    computed: {
      bodyStyled({ expanded, animation, height }) {
        let style = ''
        if (animation) {
          style += 'transition: height ease 0.3s;'
        }
        // Bug: 安卓下 rpx 转换有误差
        style += `height: ${expanded ? height : 0}px;`
        return style
      },
    },
    watch: {
      expanded: {
        handler(val) {
          val && this.getBodyHeight()
        },
        immediate: true
      }
    },
    methods: {
      initRender(val, firstInit = false) {
        this.animation = !firstInit
        if (Array.isArray(val)) {
          this.expanded = val.includes(this.name)
        } else {
          if (typeof val === 'boolean') {
            this.expanded = val
          } else {
            this.expanded = this.name === val
          }
        }
      },
      onClick() {
        if (this.disabled) return
        const parent = this.getCollapse()
        parent && parent.change({name: this.name, expanded: !this.expanded})
      },
      getBodyHeight() {
        this.$nextTick(async () => {
          const rect = await getRect(this, '.et-collapse-item-content')
          this.height = rect.height
        })
      },
      getCollapse() {
        return getParentInstance(this, 'useCollapse')
      },
      useCollapseItem() {}
    }
  }
</script>

<style lang="scss" scoped>
  .et-collapse-item-icon {
    display: block;
    transition: all ease .3s;
    &.is-expanded {
      transform: rotate(180deg);
    }
  }
  .et-collapse-item-body {
    height: 0;
    overflow: hidden;
    /* transition: height ease 0.3s; */
  }
</style>
