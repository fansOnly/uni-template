<!--
  1. tip: Canvas 2D（新接口）需要显式设置画布宽高，默认：300*150，最大：1365*1365
  2. bug: 避免设置过大的宽高，在安卓下会有crash的问题
  3. tip: iOS 暂不支持 pointer-events
  4. bug: 文本设置行高无效
-->
<template>
  <canvas id="myCanvas" class="canvas" canvas-id="myCanvas" type="2d" :style="styled" @longtap="onLongTap" @error="onError"></canvas>
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
    // 二维码
    qrCode: null,
    // 样式类型
    type: {
      type: Number,
      default: 1
    },
    // 标题文本
    title: null,
    // 标签文本
    tag: null,
    // 描述文本
    text: null,
    // 特性文本
    desc: {
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
      // console.log('canvas, ctx: ', canvas, ctx);

      const imageList = ['https://img.yzcdn.cn/vant/tree.jpg', 'https://img.yzcdn.cn/vant/tree.jpg', 'https://img.yzcdn.cn/vant/tree.jpg', 'https://img.yzcdn.cn/vant/tree.jpg', 'https://img.yzcdn.cn/vant/tree.jpg', 'https://img.yzcdn.cn/vant/tree.jpg', 'https://img.yzcdn.cn/vant/tree.jpg', 'https://img.yzcdn.cn/vant/tree.jpg']
      const image = canvas.createImage()
      image.src = imageList[this.type - 1]
      this.backgroundImage = image
      await this.paint(canvas, ctx)
      setTimeout(() => {
        this.exportImage(canvas)
      }, 0)
    }, 0)
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
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, this.width, this.height)
      this.backgroundImage && ctx.drawImage(this.backgroundImage, 0, 0, this.width, 340)

      // 绘制 logo
      // ctx.drawImage(this.backgroundImage, 24, 18, 100, 20)

      const { titleStyle, tagStyle, textStyle, descStyle } = this.getDrawStyle()

      // 默认的左边距
      let left = this.left
      // 文本的基线设为 top
      ctx.textBaseline = 'top'
      // 绘制标题
      let titleTextArr = []
      if (this.title) {
        ctx.font = `${titleStyle.fontWeight} ${this.fontRatio * titleStyle.fontSize}px PingFangSC-Semibold`
        ctx.fillStyle = titleStyle.color
        // 文本居中显示时，需要处理左边距
        ctx.textAlign = titleStyle.align || 'left'
        left = titleStyle.align === 'center' ? this.width / 2 : this.left
        if (titleStyle.wrap) {
          titleTextArr = this.calcText(ctx, this.title, titleStyle)
          titleTextArr.forEach((text, index) => {
            ctx.fillText(text, left, titleStyle.top + index * titleStyle.lineHeight)
          })
        } else {
          ctx.fillText(this.title, left, titleStyle.top, this.width)
        }
      }

      // 绘制标签区域
      if (this.type === 7) {
        ctx.textAlign = 'left'
        const tagWidth = 90; const tagHeight = 23; const marginLeft = 10; const paddingLeft = 13
        const tagTop = titleStyle.top + (titleTextArr.length - 1) * titleStyle.lineHeight + 3
        const metrics = ctx.measureText(titleTextArr[titleTextArr.length - 1])
        const tagLeft = this.left + metrics.width
        // 标签背景
        const grd = ctx.createLinearGradient(0, 0, 200, 0)
        tagStyle.gradientColor.forEach(item => {
          grd.addColorStop(item.start, item.value)
        })
        // grd.addColorStop(0, '#FF9866')
        // grd.addColorStop(1, '#FFCA3C')
        ctx.fillStyle = grd
        this.roundedRect(ctx, tagLeft + marginLeft, tagTop, tagWidth, tagHeight, 12.5)

        // 标签文本
        ctx.font = `${tagStyle.fontWeight} ${this.fontRatio * tagStyle.fontSize}px PingFangSC-Semibold`
        ctx.fillStyle = tagStyle.color
        // 文本居中显示时，需要处理左边距
        ctx.fillText(this.tag, tagLeft + marginLeft + paddingLeft, tagTop + 5)
      }

      // 绘制次要标题
      if (this.text) {
        ctx.font = `${textStyle.fontWeight} ${this.fontRatio * textStyle.fontSize}px PingFangSC-Regular`
        ctx.fillStyle = textStyle.color
        // 文本居中显示时，需要处理左边距
        ctx.textAlign = textStyle.align || 'left'
        left = textStyle.align === 'center' ? this.width / 2 : this.left
        ctx.fillText(this.text, left, textStyle.top)
      }

      // 绘制属性描述文本
      if (this.desc.length) {
        ctx.font = `${descStyle.fontWeight} ${this.fontRatio * descStyle.fontSize}px PingFangSC-Medium`
        ctx.fillStyle = descStyle.color
        ctx.textAlign = descStyle.align || 'left'
        left = descStyle.align === 'center' ? this.width / 2 : this.left
        this.desc.forEach((item, index) => {
          ctx.fillText(item, left, descStyle.top + index * (descStyle.lineHeight + descStyle.marginTop))
        })
      }

      // 底部样式固定一种
      // 绘制二维码
      ctx.textAlign = 'left'
      ctx.drawImage(this.backgroundImage, this.left, 360, 72, 72)

      // 绘制二维码右侧文本
      ctx.font = `400 ${this.fontRatio * 16}px PingFangSC-Regular`
      ctx.fillStyle = '#323232'
      ctx.fillText('贵州银行财富管理', 108, 373)

      ctx.font = `400 ${this.fontRatio * 12}px PingFangSC-Regular`
      ctx.fillStyle = '#808080'
      ctx.fillText('长按识别，了解更多详情', 108, 398)
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
    getDrawStyle() {
      // 内容样式动态渲染
      const styles = {
        'style1': {
          titleStyle: { top: 80, color: '#BE3B1F', fontSize: 24, fontWeight: 600, lineHeight: 33, wrap: false },
          textStyle: { top: 112, color: '#3472D', fontSize: 13, fontWeight: 400, lineHeight: 18, wrap: false },
          descStyle: { top: 167, color: '#B34E4B', fontSize: 18, fontWeight: 500, lineHeight: 25, marginTop: 22, wrap: false }
        },
        'style2': {
          titleStyle: { top: 80, color: '#80241D', fontSize: 24, fontWeight: 600, lineHeight: 33, wrap: false },
          textStyle: { top: 112, color: '#AD471F', fontSize: 13, fontWeight: 400, lineHeight: 18, wrap: false },
          descStyle: { top: 167, color: '#EF3025', fontSize: 18, fontWeight: 500, lineHeight: 25, marginTop: 22, wrap: false }
        },
        'style3': {
          titleStyle: { top: 80, color: '#233080', fontSize: 18, fontWeight: 600, lineHeight: 25, wrap: false },
          textStyle: { top: 109, color: '#283784', fontSize: 13, fontWeight: 400, lineHeight: 18, wrap: false },
          descStyle: { top: 167, color: '#2B36A5', fontSize: 18, fontWeight: 500, lineHeight: 25, marginTop: 22, wrap: false }
        },
        'style4': {
          titleStyle: { top: 80, color: '#A55824', fontSize: 18, fontWeight: 600, lineHeight: 25, wrap: false },
          textStyle: { top: 109, color: '#AF7939', fontSize: 13, fontWeight: 400, lineHeight: 18, wrap: false },
          descStyle: { top: 167, color: '#E56830', fontSize: 18, fontWeight: 500, lineHeight: 25, marginTop: 22, wrap: false }
        },
        'style5': {
          titleStyle: { top: 80, color: '#7E146E', fontSize: 18, fontWeight: 600, lineHeight: 25, wrap: false },
          textStyle: { top: 109, color: '#7E146E', fontSize: 13, fontWeight: 400, lineHeight: 18, wrap: false },
          descStyle: { top: 167, color: '#A61C54', fontSize: 18, fontWeight: 500, lineHeight: 25, marginTop: 22, wrap: false }
        },
        'style6': {
          titleStyle: { top: 89, color: '#FF5A00', fontSize: 32, fontWeight: 600, lineHeight: 45, align: 'center', wrap: false },
          descStyle: { top: 133, color: '#FF600B', fontSize: 14, fontWeight: 600, lineHeight: 20, marginTop: 22, align: 'center', wrap: false }
        },
        'style7': {
          titleStyle: { top: 69, color: '#3177CD', fontSize: 28, fontWeight: 600, lineHeight: 40, wrap: true },
          tagStyle: { color: '#fff', fontSize: 13, fontWeight: 600, lineHeight: 18, gradientColor: [
            { start: 0, value: '#FFCA3C' },
            { start: 1, value: '#FF9866' },
          ], wrap: false },
          textStyle: { top: 305, color: '#256CBD', fontSize: 13, fontWeight: 400, lineHeight: 18, wrap: false },
          descStyle: { top: 167, color: '#F4881E', fontSize: 18, fontWeight: 500, lineHeight: 25, marginTop: 22, wrap: false }
        },
        'style8': {
          titleStyle: { top: 59, color: '#EA4800', fontSize: 23, fontWeight: 600, lineHeight: 32, align: 'center', wrap: false },
          textStyle: { top: 95, color: '#F0C68C', fontSize: 13, fontWeight: 400, lineHeight: 18, align: 'center', wrap: false },
          descStyle: { top: 139, color: '#EC7B0C', fontSize: 18, fontWeight: 500, lineHeight: 22, marginTop: 16, wrap: false }
        }
      }
      return styles['style' + this.type]
    },
    /**
     * @param ctx 上下文对象
     * @param text 文本内容
     * @param style 文本样式
     */
    calcText(ctx, text, style) {
      const { align, top } = style
      const wrapWidth = align === 'center' ? this.width : this.width - this.left * 2
      let arr = []
      let i = 1
      let str = text
      while (str.length && i < str.length) {
        const { width } = ctx.measureText(str.substring(0, i))
        if (width > wrapWidth) {
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
    calcText2(ctx, text, style) {
      const { align, top } = style
      const wrapWidth = align === 'center' ? this.width : this.width - this.left * 2
      let arr = []
      let flag = true
      while (text.length && flag) {
        const metrics = ctx.measureText(text)
        console.log('metrics: ', metrics)
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
