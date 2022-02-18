<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cont: 0,
    };
  },
  created() {
    const data = JSON.parse(localStorage.getItem('good'));
    if (data) {
      localStorage.setItem('good', JSON.stringify(data));
    } else {
      localStorage.setItem('good', JSON.stringify({}));
    }
    if (data) {
      const arr = Object.values(data);
      arr.forEach((ele) => {
        this.cont += ele.number;
      });
      this.$store.commit('setGood', this.cont);
    }
  },
};
</script>
<style lang="less">
#app {
  width: 100%;
  height: 100%;
}
</style>
