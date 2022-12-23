<template>
  <!-- type: 2d / webgl -->
  <canvas :type="isUseNewCanvas ? '2d' : ''" class="ec-canvas" :canvas-id="canvasId" @touchstart="touchStart"
    @touchmove="touchMove" @touchend="touchEnd"></canvas>
</template>

<script>
import WxCanvas from './wx-canvas'
// 使用本地文件
// import * as echarts from './echarts.min'

// 通过 echarts 包引入
// 需要手动修改 zrender 包，不兼容小程序
// node_modules/zrender/lib/core/event.js
import * as echarts from './echarts'

let ctx

function compareVersion(v1, v2) {
  v1 = v1.split('.')
  v2 = v2.split('.')
  const len = Math.max(v1.length, v2.length)

  while (v1.length < len) {
    v1.push('0')
  }
  while (v2.length < len) {
    v2.push('0')
  }

  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1[i])
    const num2 = parseInt(v2[i])

    if (num1 > num2) {
      return 1
    } else if (num1 < num2) {
      return -1
    }
  }
  return 0
}

export default {
  name: 'ec-canvas',
  props: {
    canvasId: {
      type: String,
      value: 'ec-canvas'
    },
    ec: {
      type: Object,
      default: () => { }
    },
    // 图表类型
    type: null,
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    option: {
      type: Object,
      default: () => { }
    },
    forceUseOldCanvas: {
      type: Boolean,
      value: false
    },
  },
  data() {
    return {
      isUseNewCanvas: true
    }
  },
  mounted() {
    // Disable prograssive because drawImage doesn't support DOM as parameter
    // See https://developers.weixin.qq.com/miniprogram/dev/api/canvas/CanvasContext.drawImage.html
    echarts.default.registerPreprocessor(option => {
      if (option && option.series) {
        if (option.series.length > 0) {
          option.series.forEach(series => {
            series.progressive = 0
          })
        }
        else if (typeof option.series === 'object') {
          option.series.progressive = 0
        }
      }
    })

    if (!this.ec) {
      console.warn('组件需绑定 ec 变量，例：<ec-canvas id="mychart-dom-bar" '
        + 'canvas-id="mychart-bar" :ec="ec"></ec-canvas>')
      return
    }

    if (!this.ec.lazyLoad) {
      this.init()
    }
  },
  methods: {
    init: function (callback) {
      const version = wx.getSystemInfoSync().SDKVersion

      const canUseNewCanvas = compareVersion(version, '2.9.0') >= 0
      const forceUseOldCanvas = this.forceUseOldCanvas
      const isUseNewCanvas = canUseNewCanvas && !forceUseOldCanvas
      this.isUseNewCanvas = isUseNewCanvas

      if (forceUseOldCanvas && canUseNewCanvas) {
        console.warn('开发者强制使用旧canvas,建议关闭')
      }

      if (isUseNewCanvas) {
        // console.log('微信基础库版本大于2.9.0，开始使用<canvas type="2d"/>');
        // 2.9.0 可以使用 <canvas type="2d"></canvas>
        this.initByNewWay(callback)
      } else {
        const isValid = compareVersion(version, '1.9.91') >= 0
        if (!isValid) {
          console.error('微信基础库版本过低，需大于等于 1.9.91。'
            + '参见：https://github.com/ecomfe/echarts-for-weixin'
            + '#%E5%BE%AE%E4%BF%A1%E7%89%88%E6%9C%AC%E8%A6%81%E6%B1%82')
          return
        } else {
          console.warn('建议将微信基础库调整大于等于2.9.0版本。升级后绘图将有更好性能')
          this.initByOldWay(callback)
        }
      }
    },
    initByOldWay(callback) {
      // 1.9.91 <= version < 2.9.0：原来的方式初始化
      ctx = wx.createCanvasContext(this.canvasId, this)
      const canvas = new WxCanvas(ctx, this.canvasId, false)
      echarts.default.setCanvasCreator(() => {
        return canvas
      })
      // const canvasDpr = wx.getSystemInfoSync().pixelRatio // 微信旧的canvas不能传入dpr
      const canvasDpr = 1
      var query = wx.createSelectorQuery().in(this)
      query.select('.ec-canvas').boundingClientRect(res => {
        this.chart = this.initChart(canvas, res.width, res.height, canvasDpr)
        // if (typeof callback === 'function') {
        //   this.chart = callback(canvas, res.width, res.height, canvasDpr);
        // }
        // else if (this.ec && typeof this.ec.onInit === 'function') {
        //   this.chart = this.ec.onInit(canvas, res.width, res.height, canvasDpr);
        // }
        // else {
        //   // this.triggerEvent('init', {
        //   this.$emit('init', {
        //     canvas: canvas,
        //     width: res.width,
        //     height: res.height,
        //     canvasDpr: canvasDpr // 增加了dpr，可方便外面echarts.init
        //   });
        // }
      }).exec()
    },
    initByNewWay(callback) {
      // version >= 2.9.0：使用新的方式初始化
      const query = wx.createSelectorQuery().in(this)
      query
        .select('.ec-canvas')
        .fields({ node: true, size: true })
        .exec(res => {
          const canvasNode = res[0].node
          this.canvasNode = canvasNode

          const canvasDpr = wx.getSystemInfoSync().pixelRatio
          const canvasWidth = res[0].width
          const canvasHeight = res[0].height

          const ctx = canvasNode.getContext('2d')
          const canvas = new WxCanvas(ctx, this.canvasId, true, canvasNode)
          echarts.default.setCanvasCreator(() => {
            return canvas
          })

          this.chart = this.initChart(canvas, canvasWidth, canvasHeight, canvasDpr)

          // if (typeof callback === 'function') {
          //   this.chart = callback(canvas, canvasWidth, canvasHeight, canvasDpr)
          // } else if (this.ec && typeof this.ec.onInit === 'function') {
          //   this.chart = this.onInit(canvas, canvasWidth, canvasHeight, canvasDpr)
          // } else {
          //   // this.triggerEvent('init', {
          //   this.$emit('init', {
          //     canvas: canvas,
          //     width: canvasWidth,
          //     height: canvasHeight,
          //     dpr: canvasDpr
          //   })
          // }
        })
    },
    initChart(canvas, width, height, dpr) {
      const chart = echarts.default.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // new
      })
      canvas.setChart(chart)
      chart.setOption(this.option)

      const zr = chart.getZr()
      zr.on('click', (evt) => {
        let current
        if (this.type !== 'pie') {
          const pointer = [evt.offsetX, evt.offsetY]
          current = chart.convertFromPixel({ seriesIndex: 0 }, pointer)[0]
        }
        this.$emit('click', evt, current)
      })

      return chart
    },
    canvasToTempFilePath(opt) {
      if (this.isUseNewCanvas) {
        // 新版
        const query = wx.createSelectorQuery().in(this)
        query
          .select('.ec-canvas')
          .fields({ node: true, size: true })
          .exec(res => {
            const canvasNode = res[0].node
            opt.canvas = canvasNode
            wx.canvasToTempFilePath(opt)
          })
      } else {
        // 旧的
        if (!opt.canvasId) {
          opt.canvasId = this.canvasId
        }
        ctx.draw(true, () => {
          wx.canvasToTempFilePath(opt, this)
        })
      }
    },
    touchStart(e) {
      if (this.ec.disableTouch) return
      if (this.chart && e.touches.length > 0) {
        var touch = e.touches[0]
        var handler = this.chart.getZr().handler
        handler.dispatch('mousedown', {
          zrX: touch.x,
          zrY: touch.y
        })
        handler.dispatch('mousemove', {
          zrX: touch.x,
          zrY: touch.y
        })
        handler.processGesture(this.wrapTouch(e), 'start')
      }
    },
    touchMove(e) {
      if (this.ec.disableTouch) return
      if (this.chart && e.touches.length > 0) {
        var touch = e.touches[0]
        var handler = this.chart.getZr().handler
        handler.dispatch('mousemove', {
          zrX: touch.x,
          zrY: touch.y
        })
        handler.processGesture(this.wrapTouch(e), 'change')
      }
    },
    touchEnd(e) {
      if (this.ec.disableTouch) return
      if (this.chart) {
        const touch = e.changedTouches ? e.changedTouches[0] : {}
        var handler = this.chart.getZr().handler
        handler.dispatch('mouseup', {
          zrX: touch.x,
          zrY: touch.y
        })
        handler.dispatch('click', {
          zrX: touch.x,
          zrY: touch.y
        })
        handler.processGesture(this.wrapTouch(e), 'end')
      }
    },
    wrapTouch(event) {
      for (let i = 0; i < event.touches.length; ++i) {
        const touch = event.touches[i]
        touch.offsetX = touch.x
        touch.offsetY = touch.y
      }
      return event
    }
  }
}
</script>

<style lang="scss" scoped>
.ec-canvas {
  width: 100%;
  height: 100%;
}
</style>
