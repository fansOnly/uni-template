<template>
  <view class="page-wrapper">
    <view class="gap"></view>
    <et-scroll-list :first-load="firstLoad" :is-loading="isLoading" :finished="finished" :empty="isEmpty">
      <view class="work-list-wrap">
        <view v-for="item in WORKS_LIST" :key="item.ID" class="work-list-item">
          <view class="work-item__image"></view>
          <view class="work-item__info">{{ item.TITLE }}</view>
        </view>
      </view>
    </et-scroll-list>
  </view>
</template>

<script>
export default {
  data() {
    return {
      query: {
        PAGE_SIZE: 10,
        NEXT_KEY: 1,
      },
      isLoading: false, // 是否加载中
      finished: false, // 是否加载已完成
      firstLoad: true, // 切换类型重新加载
      WORKS_LIST: [],
    }
  },
  computed: {
    isEmpty() {
      return !this.WORKS_LIST.length
    },
  },
  onLoad() {
    this.apiWorksList(true)
  },
  methods: {
    onReachBottom() {
      if (this.finished || this.isLoading) {
        return
      }
      this.isLoading = true
      this.query.NEXT_KEY++
      this.apiWorksList()
    },
    async apiWorksList(isReload = false) {
      this.query.NEXT_KEY == 1 &&
        wx.showLoading({
          title: '加载中',
          mask: true,
        })
      try {
        const params = {
          ...this.query,
          PAGE_SIZE: String(this.query.PAGE_SIZE),
          NEXT_KEY: isReload ? '1' : String(this.query.NEXT_KEY),
        }
        const item = {
          URL: 'https://test-ecs.ytfs.yitong.com.cn/fs-active/eteng-plat-web/static/img/bg.bcb5aadd.png',
        }
        let i = this.query.PAGE_SIZE * this.query.NEXT_KEY
        let l = this.query.PAGE_SIZE * (this.query.NEXT_KEY + 1)
        let res = []
        for (; i < l; i++) {
          res.push({
            ID: 'S0000000' + i,
            TITLE: '测试我的作品标题' + i,
            ...item,
          })
        }
        setTimeout(() => {
          this.WORKS_LIST = this.WORKS_LIST.concat(res)
          this.isLoading = false
          this.pageLoaded = true
          this.firstLoad = false
          if (res.length < this.query.PAGE_SIZE || this.query.NEXT_KEY >= 3) {
            // 加载是否已完成
            this.finished = true
          }
          wx.hideLoading()
        }, 2000)
      } catch (e) {
        this.isLoading = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.work-list-wrap {
  display: flex;
  flex-wrap: wrap;
  padding: 0 8px;
}

.work-list-item {
  box-sizing: border-box;
  width: 50%;
  margin-bottom: 10px;
  padding: 0 8px;
}

.work-item__image {
  width: 100%;
  height: 120px;
  background: #ccc;
}

.work-item__info {
  line-height: 30px;
  text-align: center;
}
</style>
