<template>
  <div class="card">
    <div class="top-nav">
      <van-nav-bar title="购物车" @click-right="del">
        <template #right>
          <div class="clear">删除</div>
        </template>
      </van-nav-bar>
    </div>
    <div class="card-list">
      <div class="card-box" v-for="(prop, i) in result" :key="i">
        <van-checkbox
          @click="handler(prop, i)"
          v-model="check[i]"
          checked-color="#f40"
        ></van-checkbox>
        <div class="card">
          <van-card
            :num="prop.number"
            :price="prop.price"
            :desc="prop.desc"
            :title="prop.c_item"
            :thumb="prop.images[prop.images.length - 1]"
          >
            <template #tags>
              <van-tag
                plain
                type="danger"
                v-for="prop2 in prop.tags"
                :key="prop2"
                >{{ prop2 }}</van-tag
              >
            </template>
            <template #footer>
              <van-button size="mini" @click="handlerEdit(prop)">-</van-button>
              <van-button size="mini" @click="handlerAdd(prop)">+</van-button>
            </template>
          </van-card>
        </div>
      </div>
    </div>
    <div class="result">
      <result @select="jisuan" @submit="submit"></result>
    </div>
  </div>
</template>

<script>
import getId from '@/api/getId';
import { Dialog } from 'vant';
import result from './result.vue';

export default {
  async created() {
    const good = JSON.parse(localStorage.getItem('good'));
    const arr = Object.keys(good);
    this.local = good;
    const response = await getId(arr.join());
    const arr2 = [];
    arr.forEach((ele) => {
      arr2.push({
        id: good[ele].id,
        number: good[ele].number,
      });
    });
    for (let i = 0; i < response.list.length; i += 1) {
      for (let i1 = 0; i1 < arr2.length; i1 += 1) {
        if (response.list[i].id === arr2[i1].id) {
          response.list[i].number = arr2[i1].number;
        }
      }
    }
    const check = [];
    check.length = response.list.length;
    check.fill(false);
    this.check = check;
    this.result = response.list;
  },
  data() {
    return {
      result: [], // 本地存储的数据
      check: [], // 多选框关联的数据
      local: null, // 本地化存储商品对象
      selected: [], // 选中的选项
    };
  },
  methods: {
    /**
     * 点击全选按钮
     */
    async jisuan(fn, checked) {
      // getId(arr.join()).then((r) => {
      //   console.log(r);
      //   this.selected = r.list;
      if (checked) {
        const good = JSON.parse(localStorage.getItem('good'));
        const arr = Object.keys(good);
        const r = await getId(arr.join());
        this.selected = r.list;
      } else {
        this.selected = [];
      }
      // checked 是否为全选true
      const ut = [...this.check];
      for (let ii1 = 0; ii1 < ut.length; ii1 += 1) {
        if (checked) {
          ut[ii1] = true;
        } else {
          ut[ii1] = false;
        }
      }
      this.check = ut;
      fn(this.price);
    },
    del() {
      if (!this.selected.length) {
        return false;
      }
      Dialog.confirm({
        message: '确定要删除？',
      })
        .then(() => {
          this.delete2();
          this.$event.$emit('delete');
        })
        .catch(() => '');
      return true;
    },
    handler(prop, i) {
      if (this.check[i]) {
        this.selected.push(prop);
      } else {
        for (let i22 = 0; i22 < this.selected.length; i22 += 1) {
          if (prop.id === this.selected[i22].id) {
            this.selected.splice(i22);
          }
        }
      }
      this.$event.$emit('change', this.price);
    },
    handlerEdit(prop) {
      let arr = this.result;
      const good = this.$store.state.good - 1;
      this.$store.commit('setGood', good);
      if (prop.number - 1) {
        for (let ii = 0; ii < arr.length; ii += 1) {
          if (prop.id === arr[ii].id) {
            arr[ii].number -= 1;
            this.local[prop.id].number -= 1;
          }
        }
      } else {
        arr = this.result.filter((ele) => {
          if (ele.id !== prop.id) {
            return true;
          }
          delete this.local[prop.id];
          return false;
        });
      }
      this.result = arr;
      localStorage.setItem('good', JSON.stringify({ ...this.local }));
    },
    /**
     * 提交订单
     */
    submit(call) {
      this.$event.$emit('delete');
      setTimeout(() => {
        call();
      }, 1000);
      this.delete2();
    },
    delete2() {
      const arr = [];
      this.selected.forEach((ele) => {
        arr.push(ele.id);
        delete this.local[ele.id];
      });
      localStorage.setItem('good', JSON.stringify({ ...this.local }));
      let good = 0;
      Object.keys(this.local).forEach((ele) => {
        good += this.local[ele].number;
      });
      this.$store.commit('setGood', good);
      const newResult = this.result.filter((ele, i) => {
        if (!arr.includes(ele.id)) {
          return true;
        }
        this.check.splice(i);
        return false;
      });
      this.result = newResult;
    },
    handlerAdd(prop) {
      const good = this.$store.state.good + 1;
      this.$store.commit('setGood', good);
      for (let ii = 0; ii < this.result.length; ii += 1) {
        if (prop.id === this.result[ii].id) {
          this.result[ii].number += 1;
          this.local[prop.id].number += 1;
          this.local[prop.id].number += 1;
        }
      }
      localStorage.setItem('good', JSON.stringify({ ...this.local }));
    },
  },
  components: {
    result,
  },
  computed: {
    price() {
      const good = JSON.parse(localStorage.getItem('good'));
      const arr = Object.keys(good);
      let p = 0;
      this.selected.forEach((ele) => {
        if (arr.includes(`${ele.id}`)) {
          p += good[`${ele.id}`].number * good[`${ele.id}`].price;
        }
      });
      const arr2 = `${p}`.split('.');
      return {
        int: arr2[0] || 0,
        chat: arr2[1] || 0,
      };
      // this.result.forEach((ele) => {
      //   this.checkePrice.int = 0;
      //   this.checkePrice.chat = 0;
      //   const int = (`${ele.price}`).split('.');
      //   this.checkePrice.int = int[0] * 1;
      //   if (int[1]) {
      //     this.checkePrice.chat = int[1].length > 1 ? int[1] : `${int[1]}0`;
      //   }
      // });
      // return { ...this.checkePrice };
    },
  },
};
</script>

<style scoped>
.card-list::-webkit-scrollbar {
  width: 0px;
}
.card-list {
  padding: 10px;
  width: 100%;
  height: calc(100% - 50px);
  box-sizing: border-box;
  overflow: auto;
  position: absolute;
  top: 50px;
  padding-bottom: 110px;
}
.card-box {
  display: flex;
}
div.card {
  flex: 1 1 auto;
}
div.checkbox {
  width: 30px;
  flex: 0 0 auto;
  display: flex;
  justify-content: center;
}
.top-nav {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9999;
  height: 50px;
  width: 100%;
}
div.result {
  width: 100%;
  height: 45px;
  position: fixed;
  bottom: 47px;
  left: 0;
}
</style>
