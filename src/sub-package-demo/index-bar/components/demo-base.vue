<template >
  <vc-index-bar v-if="CONTACT_LIST.length" :sticky="false" :scroll-top="scrollTop" :long-list="false">
    <view v-for="(item, index) in CONTACT_LIST" :key="item.anchor">
      <vc-index-anchor :index-anchor="item.anchor" :is-last="index === CONTACT_LIST.length - 1" />

      <vc-cell v-for="(user, sIndex) in item.values" :key="sIndex" border>
        <view slot="title" class="user-info">
          <view class="user-avatar">
            <view class="user-avatar-re">{{ user.userName.substring(0, 1) }}</view>
          </view>
          <view class="user-name">{{ user.userName }}</view>
        </view>
      </vc-cell>
    </view>
  </vc-index-bar>
</template>

<script>
import { usePinyin } from '@/common/hooks/use-pinyin'
import customers from '../customer.json'

export default {
  name: 'demo-base',
  props: {
    scrollTop: {
      type: Number,
      default: 0
    },
  },
  data() {
    return {
      CONTACT_LIST: []
    }
  },
  created() {
    const { genPinyinSortData } = usePinyin()
    const CONTACT_LIST = genPinyinSortData(customers.slice(0, 50), 'userName')
    this.CONTACT_LIST = CONTACT_LIST
  },
}
</script>

<style lang="scss" scoped>
.user-info {
  display: flex;
  align-items: center;
  height: 40px;
}

.user-avatar {
  margin-right: 8px;
}

.user-avatar-re {
  width: 40px;
  height: 40px;
  background: #FFC05D;
  border-radius: 100%;
  font-size: 17px;
  text-align: center;
  line-height: 40px;
}

.user-name {
  flex: 1;
}
</style>
