<template>
  <van-card
    ref="card"
    :num="carData.number"
    :price="carData.price"
    :desc="carData.desc"
    :title="carData.title"
    :thumb="carData.images[0]"
    @change="handlerChange"
  >
    <template #tags>
      <van-tag plain type="danger">24小时发货</van-tag>
    </template>
    <template #footer>
      <van-icon class="edit"
        @touchend="handlerEdit"
        name="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/rec.png"
      />
      <!-- <div class="icon" >
        <img src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/rec.png" alt="">
      </div> --><van-icon
        @touchend="handlerAdd($event)"
        name="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/add.png"
      />
    </template>
  </van-card>
</template>

<script>
import Animate from '@/util/animate';

export default {
  created() {
    const number = this.carData.number || 0;
    this.nub = number;
  },
  data() {
    return {
      nub: this.number,
    };
  },
  props: {
    carData: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    handlerAdd(event) {
      // this.$refs.card.getElementsByClassName('van-image')[0],
      Animate(event.target);
      this.$emit('good', {
        id: this.carData.id,
        price: this.carData.price,
        price_off: this.carData.price_off,
        ff: 'add',
        number: this.carData.number,
      });
    },
    handlerEdit() {
      this.$emit('good', {
        id: this.carData.id,
        price: this.carData.price,
        price_off: this.carData.price_off,
        ff: 'edit',
        number: this.carData.number,
      });
    },
    handlerChange(i) {
      console.log(i);
    },
  },
};
//
</script>
<style lang="less" scoped>
.van-card .van-card__footer {
  position: relative;
  height: 30px;
}
.edit{
  padding-right: 10px;
}
.icon {
  margin-right: 10px;
  position: absolute;
  right: 20px;
}
#add {
  margin-left: 10px;
}
.right {
  right: 0px;
}
</style>
