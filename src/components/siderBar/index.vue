<template>
  <div class="aside">
    <van-sidebar v-model="activeKey" @change="handlerChange">
      <van-sidebar-item
      v-for="(prop,i) in Title" :title="prop" :key="i" />
    </van-sidebar>
  </div>
</template>
<script>
export default {
  props: {
    Title: {
      type: Array,
      default: () => [],
    },
  },
  created() {
    this.$event.$on('refresh', this.handlerRefresh);
  },
  data() {
    return {
      activeKey: 0,
    };
  },
  methods: {
    handlerChange(i) {
      this.$emit('changeClick', i);
    },
    handlerRefresh() {
      this.activeKey = 0;
    },
  },
  beforeDestroy() {
    this.$event.$off('refresh', this.handlerRefresh);
  },
};
</script>

<style scoped lang="less">
.aside {
  width:100%;
}
.van-sidebar{
  width:100%;
  height:100%;
  overflow: auto;
  & .van-sidebar-item{
    font-size: 11px;
  }
}
.van-sidebar::-webkit-scrollbar{
  width:0;
  background: none;
}
</style>
