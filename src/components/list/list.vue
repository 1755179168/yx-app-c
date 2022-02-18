<template>
  <ul>
    <li :key="i" v-for="(prop,i) in result" @touchend="handler(prop)">{{prop}}</li>
  </ul>
</template>

<script>
//
export default {
  props: {
    result: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    handler(title) {
      // console.log(111);
      this.$emit('search', title);
    },
  },
};
</script>

<style scoped>

ul{
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: #eee;
  padding: 10px 10px 10px 0;
  box-sizing: border-box;
}
li {
  width: 100%;
  height: 20px;
  padding: 5px 0;
}
</style>
