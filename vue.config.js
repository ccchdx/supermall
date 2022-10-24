module.exports = {
  lintOnSave: false,
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      //extension: []，后缀
      alias: {
        'assets': "@/assets",
        'common': "@/common",
        'components': "@/components",
        'network': "@/network",
        'views': "@/views",
      }
    }
  }
}

