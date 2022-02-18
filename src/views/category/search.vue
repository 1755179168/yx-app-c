<template>
  <div class="search">
    <div class="top">
      <van-icon name="arrow-left" class="icon" @touchend="handlerClick" />
      <van-search
        @input="searchTo"
        class="top-search"
        v-model="value"
        placeholder="请输入搜索关键词"
      />
    </div>
    <div class="list" v-show="value && likeValue.length">
      <list :result="likeValue" @search="searchTitle"></list>
    </div>
    <div class="center" v-if="history.length">
      <p>历史记录：</p>
      <span class="history" v-for="(it, i) in this.history" :key="i">{{
        it
      }}</span>
    </div>
  </div>
</template>

<script>
import likeSearch from '@/api/likeSearch';
import list from '@/components/list/list.vue';

export default {
  created() {
    const search = localStorage.getItem('search');
    if (search) {
      this.history = JSON.parse(search);
    } else {
      localStorage.setItem('search', JSON.stringify([]));
    }
  },
  components: {
    list,
    // searchDetail,
  },
  data() {
    return {
      value: '',
      likeValue: [],
      history: [],
      timer: null,
      titleBtn: '',
    };
  },
  methods: {
    /**
     * 确认搜索
     */
    handlerBtn() {
      if (this.value && this.likeValue.length) {
        if (!this.history.includes(this.value)) {
          this.history.push(this.value);
        }
        this.$router.push('/category');
      }
    },
    handlerClick() {
      this.$router.push('/category');
    },
    searchTo() {
      // 输入框模糊搜索 防抖
      if (this.value === '') {
        return false;
      }
      clearTimeout(this.timer);
      this.timer = null;
      // if (!this.timer) {
      //   this.timer = setTimeout(() => {
      //     console.log(111);
      //   }, 200);
      // }
      if (!this.timer) {
        this.timer = setTimeout(() => {
          likeSearch(this.value).then((r) => {
            this.likeValue = r.result;
            this.timer = null;
          });
        }, 200);
      }
      return true;
    },
    searchTitle(title) {
      this.$router.push({
        name: 'searchDetail',
        params: {
          id: title,
        },
      });
    },
  },
  beforeDestroy() {
    localStorage.setItem('search', JSON.stringify(this.history));
  },
};
</script>

<style scoped>
.search {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 2;
}
.top {
  display: flex;
  height: 50px;
}
span.history {
  display: inline-block;
  width: 45px;
  background-color: #ccc;
  margin-left: 20px;
  border-radius: 10px;
  padding: 3px;
  text-align: center;
}
div.btn {
  line-height: 50px;
  padding-right: 10px;
}
div.center p {
  font-weight: 800;
  padding-left: 20px;
}
div.center{
  margin-top: 45px;
}
.icon {
  width: 20px;
  font-size: 20px;
  line-height: 50px;
  padding-left: 10px;
}
.top-search {
  flex: 1 1 auto;
  padding-left: 3px;
}
div.list {
  position: absolute;
  width: 75%;
  height: 200px;
  overflow: auto;
  transform: translateX(-50%);
  left: 50%;
  top: 45px;
}
</style>
