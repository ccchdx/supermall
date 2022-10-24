export default {
    // addCart(state, payload) {
    //     //1.产找之前数组是否有该商品
    //     let oldProduct = state.cartList.find(item => item.iid === payload.iid)

    //     //2.判断oldProduct
    //     if (oldProduct) {
    //         oldProduct.count += 1;
    //     } else {
    //         payload.count = 1;
    //         state.cartList.push(payload)
    //     }
    // }
    //mutations中的每个方法应尽可能完成的事件比较简单一点，故上面更适合放在actions中

    addCounter(state, payload) {
        payload.count++
    },
    addToCart(state, payload) {
        payload.checked = true
        state.cartList.push(payload)
    },

}
