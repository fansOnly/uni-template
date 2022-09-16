import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      pageReady: false,
    };
  },
  computed: {
    ...mapState('router', ['nextRoute'])
  },
  onLoad() {
    console.time('[page-load-time]');
  },
  onReady() {
    console.timeEnd('[page-load-time]');
  },
  methods: {
    // ...mapActions('router', ['setNextRoute'])
  }
};
