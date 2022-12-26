<template>
  <view class="page-wrapper">
    <demo-block title="折线图 - 基础" padding background="#fff">
      <demo-line />
    </demo-block>

    <demo-block title="折线图 - 填充" padding background="#fff">
      <demo-line-bg />
    </demo-block>

    <demo-block title="折线图 - 双 y 轴" padding background="#fff">
      <demo-line-double-y />
    </demo-block>

    <demo-block title="柱状图 - 基础" padding background="#fff">
      <demo-bar />
    </demo-block>

    <demo-block title="柱状图 - 双指标" padding background="#fff">
      <demo-bar-double-y />
    </demo-block>

    <demo-block title="饼状图 - 基础" padding background="#fff">
      <demo-pie />
    </demo-block>

    <demo-block title="柱状图 - 环形图" padding background="#fff">
      <demo-pie-ring />
    </demo-block>
  </view>
</template>

<script>
import DemoBlock from '@/sub-package-demo/components/demo-block'
import DemoLine from './components/line'
import DemoLineBg from './components/line-bg'
import DemoLineDoubleY from './components/line-double-y'
import DemoBar from './components/bar'
import DemoBarDoubleY from './components/bar-double-index'
import DemoPie from './components/pie'
import DemoPieRing from './components/pie-ring'

export default {
  components: {
    DemoBlock,
    DemoLine,
    DemoLineBg,
    DemoLineDoubleY,
    DemoBar,
    DemoBarDoubleY,
    DemoPie,
    DemoPieRing,
  }
}
</script>
