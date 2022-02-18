<template>
  <div class="one-tab-container" ref="container">
    <div
      class="oneTab-item"
      v-for="(prop, i) in dataList"
      :key="i"
      :class="{ active: isActive === i }"
      @touchend="handlerClick(i, $event)"
      @touchmove="move = true"
      @touchstart="move = false"
    >
      <div class="img">
        <img :src="prop.imgURL" alt="" />
      </div>
      <div class="title">
        {{ prop.title }}
      </div>
    </div>
  </div>
</template>

<script>
import getData from '@/api/productList';
import getGoodsList from '@/api/GoodsList';

export default {
  data() {
    return {
      levelTowList: [],
      move: false,
      isActive: 0,
      dataList: [
        {
          title: '时令水果',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/时令水果.jpg',
        },
        {
          title: '酒水冲调',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/酒水冲调.jpg',
        },
        {
          title: '安心乳品',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/安心乳品.jpg',
        },
        {
          title: '休闲零食',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/休闲零食.jpg',
        },
        {
          title: '肉蛋食材',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/肉蛋食材.jpg',
        },
        {
          title: '新鲜蔬菜',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/新鲜食材.jpg',
        },
        {
          title: '熟食餐饮',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/熟食餐饮.jpg',
        },
        {
          title: '海鲜水产',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/海鲜水产.jpg',
        },
        {
          title: '粮油调味',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/粮油调味.jpg',
        },
        {
          title: '某手美食',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/某手美食.jpg',
        },
        {
          title: '纸杯清洁',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/纸品清洁.jpg',
        },
        {
          title: '个人护理',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/个人护理.jpg',
        },
        {
          title: '美妆护肤',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/美妆护肤.jpg',
        },
        {
          title: '家居收纳',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/家居收纳.jpg',
        },
        {
          title: '家用电器',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/家用电器.jpg',
        },
        {
          title: '3C数码',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/3C数码.jpg',
        },
        {
          title: '母婴用品',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/母婴用品.jpg',
        },
        {
          title: '鲜花绿植',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/鲜花绿植.jpg',
        },
        {
          title: '宠物用品',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/宠物用品.jpg',
        },
        {
          title: '图书玩具',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/图书文具.jpg',
        },
        {
          title: '手表配饰',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/手表配饰.jpg',
        },
      ],
    };
  },
  methods: {
    async handlerClick(i, event) {
      this.$store.commit('setLoading', false);
      const categoryData = await getData({ type: this.dataList[i].title });
      const p = await getGoodsList({
        type: categoryData[0],
        page: 1,
        size: 100,
      });
      this.levelTowList = categoryData;

      this.$store.commit('setLoading', true);
      const obj = JSON.parse(localStorage.getItem('good'));
      const arr = Object.keys(obj);
      for (let i1 = 0; i1 < p.list.length; i1 += 1) {
        if (arr.includes(`${p.list[i1].id}`)) {
          p.list[i1].number = obj[`${p.list[i1].id}`].number;
        } else {
          p.list[i1].number = 0;
        }
      }
      this.$emit('change', { categoryData, p, type: i });
      if (this.move) {
        return false;
      }
      this.isActive = i;
      const { container } = this.$refs;
      const imgWidth = event.target.offsetWidth; // 元素的宽度
      const client = container.clientWidth; // 容器可见宽度
      const offsetWidth = event.target.getBoundingClientRect().left; // 元素距离左侧的宽度
      // 被点击元素中心点距离 容器中心点的距离为滚动条需要滚动的距离
      //   const distance = client / 2 - offsetWidth - imgWidth / 2;
      //   if (distance > 0) {
      //     this.container.scrollLeft -= distance;
      //   } else {
      //        this.container.scrollLeft += distance;
      //   }
      const distance = imgWidth / 2 + offsetWidth - client / 2;
      this.moveTo(container.scrollLeft, distance);

      return true;
    },
    moveTo(start, end) {
      let speed = 5;
      let dis = 0;
      if (end < 0) {
        speed *= -1;
      }
      const timer = setInterval(() => {
        dis += speed;
        this.$refs.container.scrollLeft = start + dis;
        if (Math.abs(dis) > Math.abs(end)) {
          this.$refs.container.scrollLeft = start + end;
          clearInterval(timer);
        }
      }, 2);
    },
  },
};
</script>
<style scoped lang='less'>
.one-tab-container {
  height: 100%;
  display: flex;
  overflow: auto;
}
div.img {
  margin-bottom: 5px;
  box-sizing: border-box;
  border: 2px solid #fff;
  border-radius: 50px;
  padding: 3px;
}
.oneTab-item {
  width: 50px;
  height: 70px;
  margin: 10px 0 0 10px;
}
div.img img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
}
.oneTab-item .title {
  font-size: 11px;
}
.active {
  & .img {
    border: 2px solid #d13193;
  }
  & .title {
    font-weight: bold;
    background-color: #d13193;
    color: #fff;
    border-radius: 30px;
  }
}
div.img {
  width: 47px;
  height: 47px;
}
div.img img {
  width: 100%;
  height: 100%;
}
.one-tab-container::-webkit-scrollbar {
  width: 0;
  background: none;
}
div.levelTow-menu {
  width: 30px;
  height: 100px;
}
</style>
