
import { requestAnimationFrame } from '../common/util';
import { isObject } from '../common/validate';

export default {
  props: {
    // 显示开关
    visible: {
      type: Boolean,
      default: false
    },
    // 动画时长 ms
    duration: {
      type: Number,
      default: 300
    },
  },
  data() {
    return {
      status: '',
      display: false,
      currentDuration: 0,
      classes: '',
      transitionEnded: false,
    };
  },
  watch: {
    visible: {
      handler(val, oldVal) {
        if (val === oldVal) return;
        val ? this.enter() : this.leave();
      },
      immediate: true
    },
  },
  beforeDestroy() {
    // remove screen lock
  },
  methods: {
    async enter() {
      const classNames = this.getClassNames(this.animationName);
      const currentDuration = isObject(this.duration) ? this.duration.enter : this.duration;
      this.status = 'enter';
      this.$emit('before-enter');

      await requestAnimationFrame();
      if (this.status !== 'enter') return;
      this.$emit('enter');
      this.display = true;
      this.currentDuration = currentDuration;
      this.classes = classNames['enter'];

      await requestAnimationFrame();
      if (this.status !== 'enter') return;
      this.transitionEnded = false;
      this.classes = classNames['enter-to'];
      // magic: this line will make animation in device be real smooth
    },
    async leave() {
      if (!this.display) return;
      const classNames = this.getClassNames(this.animationName);
      const currentDuration = isObject(this.duration) ? this.duration.leave : this.duration;
      this.status = 'leave';
      this.$emit('before-leave');

      await requestAnimationFrame();
      if (this.status !== 'leave') return;
      this.$emit('leave');
      this.classes = classNames['leave'];
      this.currentDuration = currentDuration;

      await requestAnimationFrame();
      if (this.status !== 'leave') return;
      this.transitionEnded = false;
      setTimeout(() => {
        this.onTransitionEnd();
      }, currentDuration);
      this.classes = classNames['leave-to'];
    },
    onTransitionEnd() {
      if (this.transitionEnded) return;
      this.transitionEnded = true;
      this.$emit('after-' + this.status);
      if (!this.visible && this.display) {
        this.display = false;
      }
    },
    getClassNames(name) {
      return ({
        'enter': `vc-${name}-enter vc-${name}-enter-active`,
        'enter-to': `vc-${name}-enter-to vc-${name}-enter-active`,
        'leave': `vc-${name}-leave vc-${name}-leave-active`,
        'leave-to': `vc-${name}-leave-to vc-${name}-leave-active`,
      });
    },
  }
};