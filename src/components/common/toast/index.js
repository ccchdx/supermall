import Toast from './Toast'

const obj = {}

obj.install = function (Vue) {
    //document.body.appendChild(Toast.$el)不能用方法1，此处Toast.$el为undefined
    //方法2
    //1.创建组件构造器
    const toastContrustor = Vue.extend(Toast)
    //2.new的方式，根据组件构造器创建一个组件对象
    const toast = new toastContrustor()
    //3.将创建出来的组件对象手动挂载到某一个元素上
    toast.$mount(document.createElement('div'))
    //4.toash.$el对应的就是div
    document.body.appendChild(toast.$el)

    Vue.prototype.$toast = toast;
}

export default obj