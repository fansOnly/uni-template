<template >
  <vc-index-bar v-if="CONTACT_LIST.length" :sticky="false" :scroll-top="scrollTop" :long-list="false">
    <view v-for="(item) in CONTACT_LIST" :key="item.key">
      <vc-index-anchor :index="item.key" custom-class="custom-anchor" />

      <vc-cell v-for="(user, sIndex) in item.values" :key="sIndex" class="vc-cell-move--right" border>
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
    const CONTACT_LIST = genPinyinSortData(customers.slice(0, 500), 'userName')
    // this.CONTACT_LIST = CONTACT_LIST;

    this.CONTACT_LIST1 = CONTACT_LIST.slice()
    let timer = setInterval(() => {
      const data = this.appendData()
      this.CONTACT_LIST = this.concatData(this.CONTACT_LIST, data)
      if (!this.CONTACT_LIST1.length) {
        clearInterval(timer)
        timer = null
      }
    }, 60)
  },
  methods: {
    concatData(arr1, arr2) {
      if (!arr1.length) return arr2
      let res = []
      const end = arr1[arr1.length - 1]
      const concat = arr2[0]
      if (end.key === concat.key) {
        res = [
          ...arr1.slice(0, -1),
          {
            key: arr2[0].key,
            values: [...end.values, ...concat.values]
          },
          ...arr2.slice(1)
        ]
      } else {
        res = [...arr1, ...arr2]
      }
      return res
    },
    appendData() {
      const res = []
      let num = 50
      let i = 0
      while (i < this.CONTACT_LIST1.length) {
        const item = this.CONTACT_LIST1[i]
        const count = item.values.length
        if (count < num) {
          num -= count
          res.push(...this.CONTACT_LIST1.splice(i, 1, { key: item.key, values: [] }))
          i++
        } else {
          if (count === num) {
            res.push(...this.CONTACT_LIST1.splice(i, 1, { key: item.key, values: [] }))
          } else {
            const val = item.values.splice(0, num)
            res.push({
              key: item.key,
              values: val
            })
          }
          break
        }
      }
      this.CONTACT_LIST1 = this.CONTACT_LIST1.filter(v => v.values.length)
      return res
    },
  }
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
