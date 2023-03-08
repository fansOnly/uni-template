<template>
  <vc-popup :visible="visible" round direction="btt" :max-height="rowHeight * rows" border
    :close-on-click-overlay="closeOnClickOverlay" body-style="padding-bottom: 32rpx;" @click-overlay="clickOverlay"
    @close="close" @after-leave="show = false">
    <template slot="header">
      <view class="vc-picker-header vc-hairline--bottom">
        <view class="vc-picker-button--cancel">
          <vc-icon name="cross" size="24" @click="close" />
          <view v-if="step > 1" class="vc-picker-button--back" @click="$emit('back')">返回</view>
        </view>
        <view class="vc-picker-header-title">{{ title }}</view>
        <view v-if="hasNext" class="vc-picker-button--confirm" @click="$emit('next')">下一步</view>
        <view v-else class="vc-picker-button--confirm" @click="onConfirm">确认</view>
      </view>
    </template>
    <view class="vc-picker-body" :style="{ 'height': rowHeight * rows + 'px' }">
      <vc-picker-column v-for="(item, index) in renderOptions" :key="index" class="vc-picker-col" :options="item.data"
        :current="getCurrentValue(item)" :rows="rows" :row-height="rowHeight"
        :style="{ 'max-width': 'calc(100% / ' + renderOptions.length + ');' }"
        @change="onChange($event, index)"></vc-picker-column>
      <template v-if="renderOptions.length">
        <view class="vc-picker-mask" :style="{ 'background-size': '100% ' + (rowHeight * (rows - 1)) / 2 + 'px' }">
        </view>
        <view :class="['vc-picker-line vc-hairline--top-bottom', rows % 2 === 0 ? null : 'adapt']"
          :style="{ 'height': rowHeight + 'px' }"></view>
      </template>
    </view>
  </vc-popup>
</template>

<script>
export default {
  name: 'vc-steps-picker',
  props: {
    // 显示开关
    visible: {
      type: Boolean,
      default: false
    },
    // 渲染源数据
    options: {
      type: Array,
      default: () => []
    },
    // 默认选中的项
    values: {
      type: Array,
      default: () => []
    },
    // 渲染区间
    range: {
      type: Array,
      default: () => []
    },
    // 当前步骤
    step: {
      type: Number,
      default: 1
    },
    // 是否下一步
    hasNext: {
      type: Boolean,
      default: false
    },
    // 默认 column 项的 value 属性
    optionKey: {
      type: String,
      default: 'value'
    },
    // 选择器的标题
    title: {
      type: String,
      default: ''
    },
    // 多列选择器是否级联关系
    cascade: {
      type: Boolean,
      default: false
    },
    // 每一项的高度
    rowHeight: {
      type: Number,
      default: 40
    },
    // 显示的行数
    rows: {
      type: Number,
      default: 7
    },
    // 点击遮罩是否关闭菜单 - 透传 popup 组件
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      show: this.visible,
      activeIndexes: [], // 默认索引
    }
  },
  computed: {
    renderOptions() {
      // 当前渲染的数据
      const [start, end = this.options.length - 1] = this.range
      return this.step === 1 ? this.options.slice(start, end) : this.options.slice(end)
    }
  },
  watch: {
    visible: {
      handler(val) {
        if (val) this.show = val
        val && this.initValues()
      },
      immediate: true,
    },
    values: {
      handler(val) {
        this.initValues()
      },
      deep: true
    },
  },
  methods: {
    initValues() {
      if (this.optionKey === 'value') {
        const arr = []
        this.options.map((item, i) => {
          const index = item.data.findIndex(v => {
            const selected = this.values.find(k => k.key === item.key)
            return selected ? v[this.optionKey] === selected[this.optionKey] : -1
          })
          arr.push({ key: item.key, value: index > -1 ? index : 0 })
        })
        this.activeIndexes = arr
      }
    },
    onChange(index, column) {
      // console.log(`[debug] >>> 当前操作第${column}列，第${index}项`);
      // 找到当前的操作的选择器列，更新后续的选择器列
      const current = this.renderOptions[column]
      let currentIdx = this.activeIndexes.findIndex(v => v.key === current.key)
      currentIdx = currentIdx > -1 ? currentIdx : (this.step == 1 ? column : column + 2)
      this.activeIndexes.splice(currentIdx, 1, { key: current.key, value: index })

      if (this.cascade) this.$emit('update', column, index)

      // 当前列滚动时，后面的列需要回滚初始位置
      this.activeIndexes.map((v, index) => {
        if (index > currentIdx) {
          this.activeIndexes.splice(index, 1, { key: v.key, value: 0 })
        }
      })
    },
    getCurrentValue(item) {
      return this.activeIndexes.filter(Boolean).length ? this.activeIndexes.find(v => v.key === item.key)?.value : 0
    },
    onConfirm() {
      this.$emit('confirm', this.activeIndexes)
      this.close()
    },
    clickOverlay() {
      if (!this.closeOnClickOverlay) return
      this.activeIndexes.length = 0
      this.close()
    },
    close() {
      this.$emit('close')
      this.$emit('update:visible', false)
    },
  }
}
</script>

<style lang="scss" scoped>
.vc-picker-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 104rpx;
  padding: 0 32rpx;
}

.vc-picker-button--cancel {
  display: flex;
  align-items: center;
  color: #909090;
}

.vc-picker-button--back {
  margin-left: 12px;
}

.vc-picker-button--confirm {
  color: var(--vc-color-primary);
}

.vc-picker-body {
  display: flex;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
}

.vc-picker-mask {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(180deg, hsla(0, 0%, 100%, 0.9), hsla(0, 0%, 100%, 0.4)), linear-gradient(0deg, hsla(0, 0%, 100%, 0.9), hsla(0, 0%, 100%, 0.4));
  background-repeat: no-repeat;
  background-position: top, bottom;
  backface-visibility: hidden;
  z-index: 2;
  pointer-events: none;
}

.vc-picker-line {
  position: absolute;
  top: 50%;
  right: 0;
  width: 100%;
  z-index: 1;
  pointer-events: none;

  &.adapt {
    transform: translateY(-50%);
  }
}

.vc-picker-col {
  flex: 1;
  overflow: hidden;
}
</style>
