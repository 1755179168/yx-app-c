<template>
  <div class="search-title-container">
    <div class="top">
      <div class="left">
        <van-icon name="arrow-left" size="45" @touchend="handlerClick" />
      </div>
      <div>
        <van-search readonly v-model="value" />
      </div>
      <div class="right">
        <van-icon name="shopping-cart-o" size="45" />
        <div class="badge">
          <van-badge :content="$store.state.good" color="#f40"> </van-badge>
        </div>
      </div>
    </div>
    <div class="card">
      <van-card
        v-for="(prop, i) in cardData"
        :key="i"
        :num="goodNub"
        :price="prop.price"
        :desc="prop.desc"
        :title="prop.c_item"
        :thumb="prop.images[0]"
      >
        <template #tags>
          <van-tag plain type="danger" v-for="(item, i) in prop.tags" :key="i">
            {{ item }}</van-tag
          >
        </template>
        <template #footer>
          <van-button size="mini" round @touchend="handlerClickEdit">-</van-button>
          <van-button size="mini" round @touchend="handlerClickAdd">+</van-button>
        </template>
      </van-card>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    const id = JSON.parse(localStorage.getItem('good'));
    const arr = Object.keys(id);
    for (let i = 0; i < arr.length; i += 1) {
      if (arr.includes(`${this.cardData.id}`)) {
        this.goodNub = id[arr[i].number];
      }
    }
  },
  data() {
    return {
      goodNub: 0,
      a: 1,
    };
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    cardData: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    handlerClick() {
      this.$emit('back');
    },
    handlerClickEdit() {
      if (this.goodNub === 0) {
        return;
      }
      this.$emit('btnEdit', () => {
        this.goodNub -= 1;
      });
    },
    handlerClickAdd() {
      this.$emit('btnAdd', () => {
        this.goodNub += 1;
      });
    },
  },
};
</script>

<style scoped lang="less">
.search-title-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9999;
  background: #fff;
  & div.top {
    display: flex;
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    & > div {
      box-sizing: border-box;
      flex: 1 1 auto;
      height: 100%;
      text-align: center;
      line-height: 50px;
    }
    & .left {
      padding: 5px;
      width: 30px;
      flex: 0 0 auto;
      margin-right: -10px;
      padding-right: 0;
    }
    & .right {
      padding: 5px 10px 0 0;
      margin: 0 0 0 -5px;
      width: 30px;
      flex: 0 0 auto;
      position: relative;
      & .badge {
        position: absolute;
        top: -5px;
        right: 0;
      }
    }
  }
  & .card {
    box-sizing: border-box;
    padding: 10px 20px;
  }
}
</style>
