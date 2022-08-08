<template>
  <view class="page-wrapper">
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
::v-deep .demo-checkbox,
.demo-checkbox-group {
  margin: 10px 0 0 20px
}

::v-deep .value-class {
  flex: none !important
}

::v-deep .icon {
  width: 20px
}
</style>
