<!--  -->
<template>
  <swiper>
    <swiper-item v-for="item in banner" :key="item.title">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "HomeSwiper",
  props: {
    banner: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    Swiper,
    SwiperItem,
  },
  data() {
    return {
      isLoad: false,
    };
  },
  mounted() {},
  methods: {
    imageLoad() {
      if (!this.isLoad) {
        this.$emit("swiperImageLoad");
        //homeswiper加载完一张图片就可得到图片的高度，因此只需让homeswiper发出一次事件，不必加载完每张都发出事件
        this.isLoad = true;
      }
    },
  },
};
</script>
<style scoped>
</style>