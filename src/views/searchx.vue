<template>
  <div class="search-title-container">
    <div class="top">
      <div class="left">
        <van-icon name="arrow-left" size="45" @touchend="handlerClick" />
      </div>
      <div>
        <van-search readonly :value="value" />
      </div>
      <div class="right">
        <van-icon name="shopping-cart-o" size="45" @touchend="$router.push({
          path: '/card',
          query: {
            back: value
          }
        })" />
        <div class="badge">
          <van-badge :content="$store.state.good" color="#f40"> </van-badge>
        </div>
      </div>
    </div>
    <div class="card">
      <van-card
        v-for="(prop, i) in cardData"
        :key="i"
        :num="prop.number"
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
          <van-button size="mini" round @click="handlerClickEdit(prop)">-</van-button>
          <van-button size="mini" round @click="handlerClickAdd(prop)">+</van-button>
        </template>
      </van-card>
    </div>
  </div>
</template>

<script>
import Title from '@/api/search';

export default {
  async created() {
    this.value = this.$route.params.id;
    const rep = await Title(this.value);
    this.cardData = rep.list;
    const id = JSON.parse(localStorage.getItem('good'));
    const arr = Object.keys(id);
    for (let i = 0; i < this.cardData.length; i += 1) {
      if (arr.includes(`${this.cardData[i].id}`)) {
        this.cardData[i].number = id[`${this.cardData[i].id}`].number;
      } else {
        this.cardData[i].number = 1;
      }
    }
  },
  data() {
    return {
      a: 1,
      value: '',
      cardData: [],
      good: {},
    };
  },
  methods: {
    handlerClick() {
      this.$router.push({ name: 'category' });
    },
    handlerClickEdit(prop) {
      if (!this.good[prop.id] || prop.number < 1) {
        return false;
      }
      this.good[prop.id].number -= 1;
      let { good } = this.$store.state;
      this.$store.commit('setGood', (good -= 1));
      for (let i = 0; i < this.cardData.length; i += 1) {
        if (prop.id === this.cardData[i].id) {
          this.cardData[i].number -= 1;
        }
      }
      return true;
    },
    handlerClickAdd(prop) {
      if (this.good[prop.id]) {
        this.good[prop.id].number += 1;
      } else {
        this.good[prop.id] = {
          id: prop.id,
          price: prop.price,
          price_off: prop.price_off,
          number: 1,
        };
      }
      for (let i = 0; i < this.cardData.length; i += 1) {
        if (prop.id === this.cardData[i].id) {
          this.cardData[i].number += 1;
        }
      }
      let { good } = this.$store.state;
      this.$store.commit('setGood', (good += 1));
    },
  },
  beforeDestroy() {
    //
    let local = JSON.parse(localStorage.getItem('good'));
    const localArr = Object.keys(local);
    const good = Object.keys(this.good);
    for (let i = 0; i < localArr.length; i += 1) {
      if (good.includes(localArr[i])) {
        local[localArr[i]].number += this.good[localArr[i]].number;
      } else {
        local[good[i]] = this.good[good[i]];
      }
    }
    local = JSON.stringify(local);
    localStorage.setItem('good', local);
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
