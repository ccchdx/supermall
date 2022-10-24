<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control"
      v-show="isFixed"
    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banner="banners" @swiperImageLoad="swiperImageLoad" />
      <recommend-view :recommend="recommends" />
      <feature-view />
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      />
      <goods-list :goods="showGoods" />
    </scroll>
    <!-- .native 对于监听原生组件，要用native -->
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl.vue";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll.vue";
import BackTop from "components/content/backtop/BackTop.vue";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { itemListenerMixin } from "common/mixin";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  mixins: [itemListenerMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
      toboffsetTop: 0,
      isFixed: false,
      saveY: 0,
      itemImgListener: null,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },

  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    //对scroll进行刷新
    this.$refs.scroll.refresh();
  },
  deactivated() {
    //1.保存Y值
    this.saveY = this.$refs.scroll.scroll.y;
    //2.离开时取消全局监听
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },

  created() {
    //请求多个数据
    this.getHomeMultidata();
    //请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    //将refresh传入防抖函数中，生成新函数，节流，减少refresh的执行次数
    const refresh = this.debounce(this.$refs.scroll.refresh);

    //接收一次itemImageLoad，就刷新一次scroll（maxheight属性）
    this.itemImgListener = () => {
      refresh();
    };
    this.$bus.$on("itemImageLoad", this.itemImgListener);
  },
  methods: {
    //  事件监听相关方法

    debounce(func, delay) {
      //防抖函数debounce，节流，减少refresh的执行次数
      let timer = null;
      return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    },

    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 300);
    },
    contentScroll(position) {
      //决定BackTop何时显示消失
      this.isShowBackTop = -position.y > 1000;
      //决定tabControl是否吸顶（position:fixed）
      this.isFixed = -position.y > this.taboffsetTop;
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    swiperImageLoad() {
      //$el 可以获取组件里的元素
      this.taboffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    //网络请求的相关方法
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>
<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /* 在使用浏览器原生滚动时，为了使导航不随一起滚动 */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
/* 此方法实现的吸顶在better-scroll中失效 */
/* .tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
} */
.content {
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.tab-control {
  position: relative;
  z-index: 9;
}

/*.content {*/
/*height: calc(100% - 93px);*/
/*overflow: hidden;*/
/*margin-top: 44px;*/
/*}*/
</style>
