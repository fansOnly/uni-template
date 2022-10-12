<template>
  <view class="page-wrapper">

    <demo-block title="基础用法" padding>
      <vc-cell title="提示弹窗" is-link border @click="visible = true"></vc-cell>
      <vc-cell title="取消按钮" is-link border @click="visible2 = true"></vc-cell>
      <vc-cell title="无标题弹窗" is-link @click="visible3 = true"></vc-cell>
    </demo-block>

    <demo-block title="高级用法" padding>
      <vc-cell title="异步关闭" is-link @click="visible4 = true"></vc-cell>
    </demo-block>

    <vc-dialog :visible.sync="visible" title="提示弹窗"
      content="流年是一段韶华，苍老是一段年华。当手中以往握紧的风沙扬起，当指尖的沙漏倾泄，当笔墨侧锋浓重，窗外的风景开始变了色彩，瘦黄却凝结成熟，枯零却捎带自然，萧瑟却洋溢温暖。" :show-cancel="false"
      @confirm="onConfirm" @close="onClose"></vc-dialog>

    <vc-dialog :visible.sync="visible2" title="提示弹窗"
      content="岁月里的物象，无论怎样的变幻无常，只要秉持一颗不被惊扰的心念，世风无论怎样的摇曳，也会处惊不变，淡定如初。只要心存温润，便不会邂逅岁月的寒凉，总被一抹暖色所浸润。" @confirm="onConfirm"
      @cancel="onCancel" @close="onClose"></vc-dialog>

    <vc-dialog :visible.sync="visible3" content="月亮不知什么时候悄然隐去，从梦里醒来时候正是午夜，外面已下着小雨。雨滴滴落窗台，溅起点点晶莹的光点。"
      @confirm="onConfirm" @cancel="onCancel" @close="onClose"></vc-dialog>

    <vc-dialog :visible.sync="visible4" title="异步关闭"
      content="细数走过的岁月，欢乐伴着忧伤。在时光的深处中，最美的永远艳丽多彩不褪色，那些伤痛，时间久了也就模糊不清，留下的记忆也是残缺碎片。" :before-close="onBeforeClose"
      @confirm="onConfirm" @cancel="onCancel" @close="onClose"></vc-dialog>
  </view>
</template>

<script>
import DemoBlock from '@p/components/demo-block';
import { sleep } from '@/shared';

export default {
  components: {
    DemoBlock,
  },
  data() {
    return {
      visible: false,
      visible2: false,
      visible3: false,
      visible4: false,
    };
  },
  methods: {
    onConfirm() {
      console.log('[debug] dialog 弹窗点击了确认按钮');
    },
    onCancel() {
      console.log('[debug] dialog 弹窗点击了取消按钮');
    },
    onClose() {
      console.log('[debug] dialog 弹窗关闭');
    },
    async onBeforeClose({ confirm, cancel }) {
      await sleep(500);
      // 返回 true 关闭弹窗，返回 false 取消关闭弹窗
      return !!confirm;
    }
  }
};
</script>
