<template>
  <van-submit-bar
    id="id"
    :safe-area-inset-bottom="false"
    :price="price"
    :decimal-length="2"
    :button-text="value"
    @submit="onSubmit"
  >
    <van-checkbox @click="handler" checked-color="#f40" v-model="checked"
      >全选</van-checkbox
    >
    <template #tip> 你的收货地址不支持同城送, </template>
  </van-submit-bar>
</template>

<script>
import { Dialog, Notify } from 'vant';

export default {
  created() {
    this.$event.$on('change', this.change);
    this.$event.$on('delete', this.handlerDel);
  },
  data() {
    return {
      isLoading: false,
      value: '提交订单',
      checked: false,
      price: 0,
    };
  },
  methods: {
    change(price) {
      let p = `${price.chat}`;
      if (p !== '0') {
        p = p.padEnd(2, 0);
      } else {
        p = '00';
      }
      const pr = `${price.int}${p}`;
      this.price = Number(pr);
    },

    handler() {
      this.$emit(
        'select',
        (price) => {
          let p = `${price.chat}`;
          if (p !== '0') {
            p = p.padEnd(2, 0);
          } else {
            p = '00';
          }
          const pr = `${price.int}${p}`;
          this.price = Number(pr);
        },
        this.checked,
      );
    },
    onSubmit() {
      if (!this.price) {
        Dialog.alert({
          title: '请选择商品！',
        });
      } else {
        this.value = '正在提交...';
        this.$emit('submit', () => { this.value = '提交订单'; this.price = 0; this.checked = false; });
      }
      // this.isLoading = !this.isLoading;
    },
    handlerDel() {
      this.price = 0;
      Notify({ type: 'success', message: '操作成功' });
    },
  },
  beforeDestroy() {
    this.$event.$off('change', this.change);
    this.$event.$off('delete', this.handlerDel);
  },
};
</script>

<style scoped>
#id {
  /* position: absolute; */
}
</style>
