import { debouce } from "./utils";

//混入
export const itemListenerMixin = {
    mounted() {
        let newRefresh = debouce(this.$refs.scroll.refresh, 100);
        this.itemImgListener = () => {
            newRefresh();
        };
        this.$bus.$on("itemImageLoad", this.itemImgListener);
        console.log('jjj')
    }
}