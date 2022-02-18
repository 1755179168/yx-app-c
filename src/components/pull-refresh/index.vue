<template>
  <van-pull-refresh
  head-height= "100" v-model="isLoading" @refresh="onRefresh">
    <slot></slot>
  </van-pull-refresh>
</template>

<script>
import { Toast } from 'vant';

export default {
  name: 'PullRefresh',
  data() {
    return {
      count: 0,
      isLoading: false,
    };
  },
  methods: {
    onRefresh() {
      this.$emit('refresh', () => {
        Toast('刷新成功');
        this.isLoading = false;
      });
    },
  },
};
</script>

<style>
</style>
