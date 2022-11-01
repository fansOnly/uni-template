<template>
  <view class="page-wrapper">

    <demo-block title="基础用法" padding>
      <vc-cell title="基础用法" is-link border hover-class="" @click="visible = true"></vc-cell>
      <vc-cell title="包含内容" is-link hover-class="" @click="visible2 = true"></vc-cell>
    </demo-block>

    <vc-overlay :visible.sync="visible"></vc-overlay>
    <vc-overlay :visible.sync="visible2">
      <view class="content">
        渺渺清音，演奏的是落英缤纷时的一场邂逅，亦或是内心记忆深处的烙印，回首往事，不堪的是那一丝轻狂，亦或是早已成风的夸下的海口，这般深的情，这般痴的心，难道皆抗拒不了漫长时间的流逝？牵着记忆的手，追寻罢……</view>
    </vc-overlay>
  </view>
</template>

<script>
import DemoBlock from '@/components/demo-block';
export default {
  components: {
    DemoBlock
  },
  data() {
    return {
      visible: false,
      visible2: false,
    };
  }
};
</script>

<style lang="scss" scoped>
.content {
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 250px;
  height: 200px;
  padding: 15px;
  background: #fff;
  transform: translate(-50%, -50%);
}
</style>
