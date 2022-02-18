<template>
  <div class="home-container">
      <div class="content">
          <router-view></router-view>
      </div>
      <van-tabbar v-model="$store.state.tab">
        <van-tabbar-item icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item icon="apps-o" to="/category">分类</van-tabbar-item>
        <van-tabbar-item icon="cart-o" to="/card" id="card">购物车</van-tabbar-item>
        <van-badge id="id" :content="$store.state.good">
        </van-badge>
        <van-tabbar-item icon="user-circle-o">我的</van-tabbar-item>
      </van-tabbar>
  </div>
</template>
<script>
export default {
};
</script>

<style lang='less'>
.home-container {
  width: 100%;
  height: 100%;
}
div.content{
    width:100%;
    height:100%;
    box-sizing: border-box;
}
#id{
  position: absolute;
  right: 115px;
}
</style>
