<template>
  <view>
    <view v-for="(user, sIndex) in list" :key="sIndex" class="user-info"
      :class="[sIndex < list.length - 1 ? 'vc-hairline--bottom' : null]">
      <view class="user-avatar">
        <image v-if="user.headImg" :src="user.headImg" lazy-load class="user-avatar__image" />
        <view v-else class="user-avatar__text">{{ user.userName.substring(0, 1) }}</view>
      </view>
      <view class="user-name">{{ user.userName }}</view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'demo-user-info',
  props: {
    list: {
      type: Array,
      default: () => []
    },
  }
}
</script>

<style lang="scss" scoped>
.user-info {
  display: flex;
  align-items: center;
  height: 40px;
  padding: 14px 16px;
  background: #fff;
}

.user-avatar {
  margin-right: 8px;
}

.user-avatar__image {
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background: #e5e5e5;
}

.user-avatar__text {
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
