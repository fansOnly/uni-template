<template>
  <text class="iconfont" :class="[block ? 'is-block' : null, 'icon-' + name]" :style="styled" @click="onClick"></text>
</template>

<script>
import cssVariables from '@/common/lib/theme';
import { appendStyles } from '../common/util';

export default {
  name: 'et-icon',
  props: {
    // 图标名称
    name: null,
    // 图标尺寸
    size: {
      type: [String, Number],
      default: cssVariables.iconSize,
      validator(val) {
        return /^\d+$/.test(String(val));
      }
    },
    color: {
      type: String,
      default: cssVariables.iconColor
    },
    // 是否块级元素
    block: {
      type: Boolean,
      default: true
    },
    // 自定义组件样式
    customStyle: null
  },
  computed: {
    styled({ size, color, customStyle }) {
      let style = '';
      style += `font-size: ${size}px;`;
      style += `color: ${color};`;
      return appendStyles([style, customStyle]);
    }
  },
  methods: {
    onClick() {
      this.$emit('click');
      this.$emit('tap');
    }
  }
};
</script>

<style lang="scss" >
@import "../common/iconfont/iconfont.scss";
.is-block {
  display: block;
}
</style>
