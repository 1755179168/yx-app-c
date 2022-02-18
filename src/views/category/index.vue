<template>
  <div class="fl">
    <div class="search" @touchend="$router.push('/search')">
      <van-icon name="search" />
      <div class="text">网红车厘子售价9999</div>
    </div>
    <!--  -->
    <div class="dh">
      <OneTab @change="handlerChange" />
    </div>
    <div class="center">
      <div class="loading" v-show="$store.state.isLoading === false">
        <van-loading text-size="20px" color="#103ab5" />
      </div>
      <div class="aside">
        <levelTow :Title="levelTowData" @changeClick="handler" />
      </div>
      <div class="card" @change="handlerAsideChange">
        <PullRefresh @refresh="handlerRefresh">
          <template>
            <div class="header van-hairline--top-bottom">
              <div class="icon">
                <div class="t" @touchend="handlerT" ref="T"></div>
                <div class="b" @touchend="handlerB" ref="B"></div>
              </div>
              <div :class="{ active: isActive === 0 }" @touchend="handlerClick(0)">
                综合
              </div>
              <div :class="{ active: isActive === 1 }" @touchend="handlerClick(1)">
                销量
              </div>
              <div :class="{ active: isActive === 2 }" @touchend="handlerClick(2)">
                价格
              </div>
            </div>
            <Card
              v-for="(prop, i) in carData.list"
              :carData="prop"
              :key="i"
              @good="handlerGood"
            />
            <van-empty
              image="search"
              v-show="carData.list.length === 0"
              description="没有相关商品了"
            />
          </template>
        </PullRefresh>
      </div>
    </div>
  </div>
</template>

<script>
import GoodsList from '@/api/GoodsList';
import productList from '@/api/productList';
import levelTow from '@/components/siderBar/index.vue';
import OneTab from '@/components/OneTab/index.vue';
import Card from '@/components/card/index.vue';
import PullRefresh from '@/components/pull-refresh/index.vue';

export default {
  async created() {
    const list = await productList();
    const card = await GoodsList();
    list[0] = '全部';
    const obj = JSON.parse(localStorage.getItem('good'));
    const arr = Object.keys(obj);
    for (let i = 0; i < card.list.length; i += 1) {
      if (arr.includes(`${card.list[i].id}`)) {
        card.list[i].number = obj[`${card.list[i].id}`].number;
      } else {
        card.list[i].number = 0;
      }
    }
    this.carData = card;
    this.levelTowData = list;
    this.$store.commit('setLoading', true);
  },
  data() {
    return {
      levelTowData: [],
      value: '',
      carData: {
        list: [],
      },
      grup: null,
      title: 0,
      isActive: 0,
      sort: null,
      pNum: 0,
    };
  },
  methods: {
    handlerGood(data) {
      // console.log(data);
      // let goodNub = this.$store.state.good;
      // const { number } = data;
      // this.pNum = number;
      this.pNum = 0;
      const obj = JSON.parse(localStorage.getItem('good'));
      obj[data.id] = {
        ...data,
      };
      delete obj[data.id].ff;
      if (data.ff === 'add') {
        for (let i = 0; i < this.carData.list.length; i += 1) {
          if (data.id === this.carData.list[i].id) {
            this.carData.list[i].number += 1;
            obj[data.id].number = this.carData.list[i].number;
          }
        }
      } else {
        for (let i = 0; i < this.carData.list.length; i += 1) {
          if (data.id === this.carData.list[i].id) {
            const list = this.carData.list[i];
            list.number = list.number - 1 < 0 ? 0 : list.number - 1;
            obj[data.id].number = this.carData.list[i].number;
          }
        }
      }
      Object.values(obj).forEach((ele) => {
        this.pNum += ele.number;
      });
      this.$store.commit('setGood', this.pNum);
      if (obj[data.id].number === 0) {
        delete obj[data.id];
        localStorage.setItem('good', JSON.stringify(obj));
      } else {
        localStorage.setItem('good', JSON.stringify(obj));
      }
    },
    handlerAsideChange(i) {
      console.log(i);
    },
    handlerSearch() {
      this.$router.push('/search');
    },
    /**
     * 下拉
     */
    async handlerRefresh(call) {
      const response = await GoodsList({
        type: this.title || 2,
        page: 1,
        size: 1000,
        sort: 1,
      });
      this.carData = response;

      setTimeout(() => {
        call();
        this.$event.$emit('refresh');
      }, 300);
    },
    handlerClick(i) {
      this.$refs.B.style.borderTopColor = '#ccc';
      this.$refs.T.style.borderBottomColor = '#ccc';
      this.isActive = i;
      if (i === 0) {
        // 综合排序and销量排序
        this.carData.list.sort(() => Math.random() - 0.5);
      } else if (i === 1) {
        this.carData.list.sort((a, b) => a.sale - b.sale);
      } else {
        // 价格排序
        this.carData.list.sort((a, b) => a.price - b.price);
      }
    },
    handlerChange(data) {
      // 一级导航触发事件
      this.title = data.type;
      const arr = [...data.categoryData];
      arr[0] = '全部';
      this.levelTowData = arr; // 侧边栏导航数据
      this.carData = {
        total: data.p.total,
        list: data.p.list,
      }; // 商品卡片数据
      this.isActive = 0;
      this.$refs.B.style.borderTopColor = '#ccc';
      this.$refs.T.style.borderBottomColor = '#ccc';
    },
    async handler(i) {
      // 侧边栏选项点击
      this.isActive = 0;
      this.$refs.B.style.borderTopColor = '#ccc';
      this.$refs.T.style.borderBottomColor = '#ccc';
      if (i === 0) {
        const type = this.title === 0 ? 2 : this.title;
        const response = await GoodsList({
          type,
          page: 1,
          size: 1000,
          sort: 1,
        });
        const obj = JSON.parse(localStorage.getItem('good'));
        const arr = Object.keys(obj);
        for (let i1 = 0; i1 < response.list.length; i1 += 1) {
          if (arr.includes(`${response.list[i1].id}`)) {
            response.list[i1].number = obj[response.list[i1].id].number;
          } else {
            response.list[i1].number = 0;
          }
        }
        this.carData = response;
      } else {
        const type = this.levelTowData[i];
        const response = await GoodsList({
          type,
          page: 1,
          size: 1000,
          sort: 1,
        });
        const obj = JSON.parse(localStorage.getItem('good'));
        const arr = Object.keys(obj);
        for (let i1 = 0; i1 < response.list.length; i1 += 1) {
          if (arr.includes(`${response.list[i1].id}`)) {
            response.list[i1].number = obj[response.list[i1].id].number;
          } else {
            response.list[i1].number = 0;
          }
        }
        this.carData = response;
      }
    },
    handlerT() {
      this.carData.list.sort((a, b) => a.price - b.price);
      this.$refs.B.style.borderTopColor = '#ccc';
      this.$refs.T.style.borderBottomColor = '#d13193';
      this.sort = 'top';
    },
    handlerB() {
      this.carData.list.sort((a, b) => b.price - a.price);
      this.$refs.T.style.borderBottomColor = '#ccc';
      this.$refs.B.style.borderTopColor = '#d13193';
      this.sort = 'bottom';
    },
  },
  components: {
    OneTab,
    levelTow,
    Card,
    PullRefresh,
  },
};
</script>

<style scoped lang='less'>
.search {
  background-color: #eee;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  line-height: 33px;
  & i {
    line-height: 33px;
    padding-right: 10px;
  }
}
.search {
  width: 355px;
  margin: 0 auto;
  height: 33px;
}
.search div.text {
  color: #a1a1a1;
  font-size: 14px;
}
div.dh {
  height: 95px;
}
div.card::-webkit-scrollbar {
  width: 0px;
}
div.center {
  & .loading {
    z-index: 1999;
    position: absolute;
    width: 30px;
    height: 30px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  display: flex;
  width: 100%;
  overflow: hidden;
  height: calc(100% - 180px);
  position: relative;
  & .aside {
    width: 70px;
    height: 100%;
    flex: 0 0 auto;
  }
}
div.fl {
  height: 100%;
  padding-top: 11px;
  box-sizing: border-box;
}
div.active {
  color: #d13193;
}
div.card {
  flex: 1 1 auto;
  overflow: auto;
}
.header {
  width: 100%;
  height: 20px;
  display: flex;
  position: relative;
  justify-content: end;
  & > div {
    margin-right: 5px;
    line-height: 20px;
  }
  & > div:last-child {
    margin-right: 20px;
  }
}
div.icon {
  width: 18px;
  height: 100%;
  position: absolute;
  right: 0;
  margin: 0;
  top: 0;
}
div.icon div.b {
  position: absolute;
  right: 0;
  border: 5px solid #ccc;
  border-color: transparent;
  border-top-color: #ccc;
  top: 10px;
}
div.icon div.t {
  position: absolute;
  right: 0;
  border: 5px solid #ccc;
  border-color: transparent;
  border-bottom-color: #ccc;
  top: -2px;
}
</style>
