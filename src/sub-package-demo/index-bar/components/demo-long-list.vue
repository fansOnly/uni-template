<template >
  <vc-index-bar v-if="CONTACT_LIST.length" :scroll-top="scrollTop" use-throttle>
    <view v-for="(item) in CONTACT_LIST" :key="item.anchor">
      <vc-index-anchor :index-anchor="item.anchor" :is-last="ready && item.anchor === lastAnchor" />

      <!-- 大量的数据要通过组件的方式去渲染，不然会报错  Uncaught Dom limit exceeded -->
      <!-- 1000/50 2000/50 3000/50 5000/100 6000/200 8000/200 10000/200 -->
      <demo-user-info :list="item.values" />
      <!-- <demo-user-info-item v-for="(user, sIndex) in item.values" :key="user.userId + sIndex" :user="user" /> -->
    </view>
  </vc-index-bar>
</template>

<script>
import DemoUserInfo from './demo-user-info.vue'
import DemoUserInfoItem from './demo-user-info-item.vue'
import { usePinyin } from '@/common/hooks/use-pinyin'
import customers from '../customer.json'

export default {
  name: 'demo-long-list',
  components: {
    DemoUserInfo,
    DemoUserInfoItem
  },
  props: {
    scrollTop: {
      type: Number,
      default: 0
    },
  },
  data() {
    return {
      CONTACT_LIST: [],
      ready: false,
      lastAnchor: '',
    }
  },
  created() {
    const { genPinyinSortData } = usePinyin()
    const customers2 = []
    const usernames = customers.map(v => v.userName)
    for (let i = 0; i < 100000; i++) {
      customers2.push({
        'orgName': '',
        'headImg': 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTL8qwKT00ZD3Cm8kjica2vibdnhG5HqH2r0EsAtOtZia8UDz6xFsqFpMeXmPTmjLRflbnDVs3icQsFR6Q/132',
        'phone': '13765846370',
        'nickName': '贺文黔',
        'achiManaId': '',
        'custType': '0',
        'remark': '',
        'prodCount': '',
        'userName': usernames[Math.floor(Math.random() * usernames.length)],
        'userId': `2003270F4025484578QBHXNSGCEAE3CA${i}`
      })
    }
    const total = 5000
    const CONTACT_LIST = genPinyinSortData(customers2.slice(0, total), 'userName')
    console.log('累计加载数据量', total)
    this.lastAnchor = CONTACT_LIST[CONTACT_LIST.length - 1].anchor

    this.t0 = +new Date()
    // #ifdef MP-WEIXIN
    this.lazyLoad(CONTACT_LIST)
    // #endif
    // #ifdef H5
    this.CONTACT_LIST2 = CONTACT_LIST
    this.syncLoad()
    // #endif
  },
  methods: {
    lazyLoad(data) {
      const firstAnchor = data[0].anchor
      const lastAnchorLength = data[data.length - 1].values.length
      let timer = setInterval(() => {
        const anchor = this.iterateKey(this.CONTACT_LIST, firstAnchor)
        this.load(data, anchor)
        const last = this.CONTACT_LIST.find(v => v.anchor === this.lastAnchor)
        if (this.CONTACT_LIST.length == data.length && last.values.length >= lastAnchorLength) {
          console.log('数据耗时', +new Date() - this.t0, 'ms - 5000 / 100')
          console.log('this.CONTACT_LIST: ', this.CONTACT_LIST)
          this.ready = true
          clearInterval(timer)
          timer = null
        }
      }, 60)
    },
    syncLoad() {
      // use window.requestAnimationFrame
      const data = this.CONTACT_LIST2
      const firstAnchor = data[0].anchor
      const lastAnchorLength = data[data.length - 1].values.length

      const anchor = this.iterateKey(this.CONTACT_LIST, firstAnchor)
      this.load(data, anchor)
      const last = this.CONTACT_LIST.find(v => v.anchor === this.lastAnchor)
      if (this.CONTACT_LIST.length == data.length && last.values.length >= lastAnchorLength) {
        console.log('数据耗时', +new Date() - this.t0, 'ms - 5000 / 100')
        console.log('this.CONTACT_LIST: ', this.CONTACT_LIST)
        this.ready = true
        return
      }

      window.requestAnimationFrame(this.syncLoad)
    },
    load(source, anchor) {
      const index = source.findIndex(v => v.anchor === anchor)
      const data = source[index].values
      let exists = this.CONTACT_LIST.find(v => v.anchor === anchor)
      if (!exists) {
        this.CONTACT_LIST[index] = (exists = {
          anchor,
          values: []
        })
      }
      if (exists.values.length >= data.length) {
        anchor = source[index + 1].anchor
        return this.load(source, anchor)
      }

      const list = data.slice(0, 200)
      exists.values = exists.values.concat(list)
      this.CONTACT_LIST.splice(index, 1, exists)
    },
    iterateKey(data, anchor) {
      return data.length ? data[data.length - 1].anchor : anchor
    },
  }
}
</script>
