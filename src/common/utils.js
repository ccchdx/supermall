export function debouce(func, delay) {
    //防抖函数debounce，节流，减少refresh的执行次数
    let timer = null;
    return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}