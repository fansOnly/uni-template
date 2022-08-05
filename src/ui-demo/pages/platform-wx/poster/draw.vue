<!--
  1. tip: Canvas 2D（新接口）需要显式设置画布宽高，默认：300*150，最大：1365*1365
  2. bug: 避免设置过大的宽高，在安卓下会有crash的问题
  3. tip: iOS 暂不支持 pointer-events
  4. bug: 文本设置行高无效
-->
<template>
  <canvas class="canvas" canvas-id="myCanvas" id="myCanvas" type="2d" :style="styled" @longtap="onLongTap" @error="onError"></canvas>
</template>

<script>
export default {
  name: 'bs-canvas',
  props: {
    // 背景图
    // backgroundImage: null,
    // 宽度
    canvasWidth: {
      type: [Number, String],
      default: 320
    },
    // 高度
    canvasHeight: {
      type: [Number, String],
      default: 150
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
     fontRatio: 1,
     dpr: 1,
      width: 0,
      height: 0,
      backgroundImage: '', // 背景图
      left: 24, // 默认左右边距
    }
  },
  computed: {
    styled() {
      let style = ''
      style += `width: ${this.canvasWidth}px;`
      style += `height: ${this.canvasHeight}px;`
      return style
    }
  },
  async created() {
    setTimeout(async () => {
      const { canvas, ctx } = await this.initCanvas()

      // 预加载奖牌图标
      const goldIcon = canvas.createImage()
      goldIcon.src = 'https://www.eteng.cn/gzMgrBankResource/icon/first.png'
      this.goldIcon = goldIcon
      const silverIcon = canvas.createImage()
      silverIcon.src = 'https://www.eteng.cn/gzMgrBankResource/icon/silver_medal.png'
      this.silverIcon = silverIcon
      const bronzeIcon = canvas.createImage()
      bronzeIcon.src = 'https://www.eteng.cn/gzMgrBankResource/icon/copper_medal.png'
      this.bronzeIcon = bronzeIcon

      await this.paint(canvas, ctx)
      setTimeout(() => {
        this.exportImage(canvas)
      }, 0);
    }, 0);
  },
  methods: {
    initCanvas() {
      return new Promise(resolve => {
        const query = wx.createSelectorQuery().in(this)
        query.select('#myCanvas')
          .fields({ node: true, size: true })
          .exec((res) => {
            const canvas = res[0].node
            const ctx = canvas.getContext('2d')

            const { windowWidth, pixelRatio } = wx.getSystemInfoSync()
            this.dpr = pixelRatio
            // this.fontRatio = (windowWidth > 375 ? 375 : windowWidth) / 375
            this.width = canvas.width = res[0].width * pixelRatio
            this.height = canvas.height = res[0].height * pixelRatio
            ctx.scale(pixelRatio, pixelRatio)
            resolve({canvas, ctx})
          })
      })
    },
    paint(canvas, ctx) {
      // 绘制背景
      ctx.fillStyle = '#333'
      ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight)

      // 绘制排行榜
      this.rowOffsetTop = 50
      this.drawTable(canvas, ctx)

    },
    drawTable(canvas, ctx) {
      const tableOffsetLeft = 16 + 9 // 表格 left 值
      let rowOffsetTop = this.rowOffsetTop // 表格 top 值
      const tableWidth = this.canvasWidth - tableOffsetLeft * 2 // 表格宽度
      const theadHeight = 42.5 // 表头高度
      const rowWidth = [53, (tableWidth - 53) * 0.7, (tableWidth - 53) * 0.3] // 行宽
      const textLeft = [tableOffsetLeft + rowWidth[0] / 2, tableOffsetLeft + rowWidth[0], tableOffsetLeft + tableWidth - 16]
      const rowHeight = 60 // 行高
      const rowMargin = [0, 9, 6, 9] // 行外边距

      // 绘制表格背景
      const tableBgHeight = theadHeight +  this.list.length * (rowHeight + rowMargin[2]) + 26 /**padding-bottom */
      ctx.fillStyle = '#c14524'
      ctx.fillRect(16, rowOffsetTop, this.canvasWidth - 32, tableBgHeight)

      // 绘制表头
      ctx.font = '500 13px PingFangSC-Medium'
      ctx.fillStyle = '#FFCC9D'
      ctx.textAlign = 'center'
      ctx.fillText('排名', textLeft[0], rowOffsetTop + 25, rowWidth[0])
      ctx.textAlign = 'start'
      ctx.fillText('姓名/机构', textLeft[1], rowOffsetTop + 25)
      ctx.textAlign = 'end'
      ctx.fillText('AUM(万元)', textLeft[2], rowOffsetTop + 25)
      rowOffsetTop += theadHeight

      // 绘制表格行
      const avatar = canvas.createImage()
      let sortIcon = ''
      let orgTextList = []
      this.list.forEach(async (item, index) => {
        if (index > 0) rowOffsetTop += rowHeight + rowMargin[2]
        let tops = [rowOffsetTop + 35, rowOffsetTop + 15, rowOffsetTop + 28, rowOffsetTop + 43, rowOffsetTop + 35]
        let lefts = [textLeft[0], textLeft[1], textLeft[1] + 35, textLeft[1] + 35, textLeft[2]]
        // 绘制背景
        ctx.fillStyle = '#BF2108'
        ctx.fillRect(tableOffsetLeft, rowOffsetTop, tableWidth, rowHeight)
        // 绘制排行序号
        ctx.fillStyle = '#FFCC9D'
        ctx.textAlign = 'center'
        if (index < 3) {
          // 绘制奖牌
          sortIcon = index === 1 ? this.silverIcon : index === 2 ? this.bronzeIcon : this.goldIcon
          ctx.drawImage(sortIcon, lefts[0] - 11, tops[0] - 16, 22, 22)
        } else {
          ctx.fillText(index + 1, lefts[0], tops[0])
        }
        // 绘制头像
        avatar.src = item.avatar
        // console.log('avatar: ', avatar);
        ctx.save()
        ctx.beginPath()
        ctx.arc(lefts[1] + 15, tops[1] + 15, 15, 0, 2*Math.PI)
        ctx.clip()
        ctx.drawImage(avatar, lefts[1], tops[1], 30, 30)
        ctx.restore()

        // 获取机构文案数组，如果超出一行，需要单独处理绘制高度
        orgTextList = this.splitText(ctx, item.org, rowWidth[1] - 50)
        const offsetTop = orgTextList.length > 1 ? -7 : 0
        // 绘制姓名
        ctx.textAlign = 'start'
        ctx.fillText(item.name, lefts[2], tops[2] + offsetTop)
        ctx.save()
        // 绘制机构
        ctx.font = '400 11px PingFangSC-Medium'
        ctx.fillStyle = '#FF925A'
        orgTextList.forEach((text, i) => {
          ctx.fillText(text, lefts[3], tops[3] + offsetTop + 13 * i)
        })
        // ctx.fillText(item.org, lefts[3], tops[3])
        // 绘制 AUM
        ctx.restore()
        ctx.textAlign = 'end'
        ctx.fillText(this.formatMoney(item.aum), lefts[4], tops[4])
      })
    },
    exportImage(canvas) {
      const _this = this
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: this.width,
        height: this.height,
        destWidth: this.width * this.dpr,
        destHeight: this.height * this.dpr,
        canvas,
        success(res) {
          _this.$emit('export', res.tempFilePath)
        },
        complete(res) {
          console.log('[debug] canvas 导出图片 >>>', res)
        }
      })
    },
    /**
     * @param ctx 上下文对象
     * @param text 文本内容
     */
    splitText(ctx, text, maxWidth) {
      let arr = []
      let i = 1
      let str = text
      while (str.length && i < str.length) {
        const { width } = ctx.measureText(str.substring(0, i))
        if (width > maxWidth) {
          arr.push(str.substring(0, i - 1))
          str = str.substring(i - 1)
        } else {
          i++
        }
      }
      arr.push(str)
      return arr
    },
    // 真机没有 measureText 下的 advances 属性
    calcText2(ctx, text) {
      const wrapWidth = this.width - this.left * 2
      let arr = []
      let flag = true
      while (text.length && flag) {
        const metrics = ctx.measureText(text)
        console.log('metrics: ', metrics);
        for (let i = 0; i < metrics.advances.length; i++) {
          const left = metrics.advances[i]
          if (left > wrapWidth) {
            arr.push(text.substring(0, i - 1))
            text = text.substring(i - 1)
            break
          }
        }
        arr.push(text)
        flag = false
      }
      return arr
    },
    // 绘制圆角矩形
    roundedRect(ctx, x, y, width, height, radius, filling = true) {
      ctx.beginPath()
      ctx.moveTo(x, y + radius)
      ctx.lineTo(x, y + height - radius)
      ctx.quadraticCurveTo(x, y + height, x + radius, y + height)
      ctx.lineTo(x + width - radius, y + height)
      ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius)
      ctx.lineTo(x + width, y + radius)
      ctx.quadraticCurveTo(x + width, y, x + width - radius, y)
      ctx.lineTo(x + radius, y)
      ctx.quadraticCurveTo(x, y, x, y + radius)
      filling ? ctx.fill() : ctx.stroke()
    },
    onLongTap(evt) {
      console.log('[debug] canvas onLongTap >>>>', evt)
      this.$emit('long-tap', evt)
    },
    onError(detail) {
      console.log('[debug] canvas onError >>>>', detail)
      this.$emit('error', evt)
    }
  }
}
</script>

<style lang="scss" scoped>
.canvas {
  width:100%;
  min-height: 100%;
}
</style>
