<template>
  <div>
    <input type="text" v-model="numbers" />
    <button @click="reloads">render</button>
    <div>当前渲染:{{ numbers || 10000 }}条</div>
    <div>渲染时间:{{ showTime }}ms</div>
    <div style="height:300px;overflow:auto" ref="vb">
      <div :style="{ height: `${blockTop}px` }"></div>
      <div
        v-for="item in renderList"
        :style="{ height: '50px', background: item.color }"
        :key="`${item.id}`"
      >
        <div>{{ item.id }}</div>
      </div>
      <div :style="{ height: `${blockTopView}px` }"></div>
    </div>
  </div>
</template>

<script>
function throttle(fn, wait = 100) {
  let timer = null;
  return function() {
    const context = this;
    const args = arguments;
    if (!timer) {
      timer = setTimeout(function() {
        fn.apply(context, args);
        timer = null;
      }, wait);
    }
  };
}
export default {
  data() {
    return {
      startView: 0,
      endView: 0,
      blockTop: 0,
      blockTopView: 0,
      renderList: [],
      data: [],
      numbers: 0,
      showTime: ""
    };
  },
  mounted() {
    this.$refs.vb.addEventListener("scroll", throttle(this.updateV), false);
    this.constructorData();
    this.updateV(0);
  },
  methods: {
    findRenderList(s, e, blockArr) {
      const _s = parseInt(s / 50);
      const _e = Math.ceil(e / 50);
      this.blockTop = _s * 50;
      this.blockTopView = (blockArr.length - _e) * 50;
      return blockArr.slice(_s, _e);
    },
    updateV() {
      const scrollTop = this.$refs.vb.scrollTop;
      this.startView = scrollTop;
      this.endView = scrollTop + 300;
      this.renderList = this.findRenderList(
        this.startView,
        this.endView,
        this.data
      );
    },
    reloads() {
      this.data = [];
      this.renderList = [];
      if (Number(this.numbers) < 0) this.numbers = 10000;
      this.constructorData();
      this.updateV(0);
    },
    constructorData() {
      let s = new Date().getTime();
      for (let i = 0; i < (Number(this.numbers) || 10000); i++) {
        this.data.push({
          color: this.randomColor(),
          id: i
        });
      }
      this.showTime = new Date().getTime() - s;
    },
    randomColor() {
      return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    }
  }
};
</script>
