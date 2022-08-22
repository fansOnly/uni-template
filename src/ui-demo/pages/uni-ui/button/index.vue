<template>
<view class="page-wrapper">
  <demo-block title="按钮类型" padding>
      <view class="row">
        <button class="demo-margin-right">默认按钮</button>
        <button type="primary" class="demo-margin-right">主要按钮</button>
      </view>
      <button type="warn">警告按钮</button>
    </demo-block>

    <demo-block title="朴素按钮" padding>
      <button type="primary" plain class="demo-margin-right">朴素按钮</button>
      <button type="warn" plain>朴素按钮</button>
    </demo-block>

    <demo-block title="细边框" padding>
      <button type="primary" plain hairline class="demo-margin-right">细边框按钮</button>
      <button type="warn" plain hairline>细边框按钮</button>
    </demo-block>

    <demo-block title="禁用状态" padding>
      <button type="primary" disabled class="demo-margin-right">禁用状态</button>
      <button type="warn" disabled>禁用状态</button>
    </demo-block>

    <demo-block title="加载状态" padding>
      <button loading type="primary" class="demo-margin-right" />
      <button loading type="primary" loading-type="spinner" class="demo-margin-right" />
      <button loading type="warn" loading-text="加载中..." />
    </demo-block>

    <demo-block title="按钮形状" padding>
      <button type="primary" square class="demo-margin-right">方形按钮</button>
      <button type="warn" round>圆形按钮</button>
    </demo-block>

    <demo-block title="图标按钮" padding>
      <button type="primary" icon="star-o" class="demo-margin-right" />
      <button type="primary" icon="star-o" class="demo-margin-right">按钮</button>
      <button plain type="primary" icon="https://img.yzcdn.cn/vant/logo.png">按钮</button>
    </demo-block>

    <demo-block title="按钮尺寸" padding>
      <view  class="demo-margin-bottom">
        <button type="primary" size="large" block>大号按钮</button>
      </view>
      <button type="primary" class="demo-margin-right">普通按钮</button>
      <button type="primary" size="small" class="demo-margin-right">小型按钮</button>
      <button type="primary" size="mini">迷你按钮</button>
    </demo-block>

    <demo-block title="块级元素" padding>
      <view class="demo-margin-bottom">
        <button type="primary">普通按钮</button>
      </view>
      <button type="primary" block>块级元素</button>
    </demo-block>

    <demo-block title="自定义颜色" padding>
      <button color="#7232dd" class="demo-margin-right">单色按钮</button>
      <button color="#7232dd" class="demo-margin-right" plain>单色按钮</button>
      <button color="linear-gradient(to right, #4bb0ff, #6149f6)">渐变色按钮</button>
    </demo-block>
</view>

</template>

<script>
import DemoBlock from '@p/components/demo-block'
export default {
  components: {
    DemoBlock
  },
  data() {
    return {
    }
  },
  methods: {
  },
}
</script>

<style lang="scss" scoped>
</style>
