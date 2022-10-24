<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item
        v-for="item in cartList"
        :key="item.iid"
        :item-info="item"
      />
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import { mapGetters } from "vuex";
import CartListItem from "./CartListItem.vue";

export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["cartList"]),
  },
  mounted() {},
  methods: {},
  activated() {
    this.$refs.scroll.refresh();
  },
};
</script>
<style scoped>
.cart-list {
  height: calc(100% - 44px - 49px - 40px);
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>