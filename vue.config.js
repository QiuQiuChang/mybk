// vue.config.js
const CompressionPlugin = require('compression-webpack-plugin')
module.exports = {
    publicPath: './',
    devServer: {
        open: true, //是否自动弹出浏览器页面
        host: "localhost", 
        port: '8080',
        https: false,
        hotOnly: false, 
        // proxy: {
        //   '/api': {
        //     target: 'http://qiucang.xyz:3000', //API服务器的地址http://qiucang.xyz:3000
        //     ws: true, //代理websockets
        //     changeOrigin: true, // 虚拟的站点需要更管origin
        //     pathRewrite: {  //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
        //       '^/api': ''
        //     }
        //   }
        // },
    },
    configureWebpack: {
        plugins: [
         new CompressionPlugin({
          test: /\.(js|css)?$/i, // 哪些文件要压缩
          filename: '[path].gz[query]',　// 压缩后的文件名
          algorithm: 'gzip',　// 使用gzip压缩
          minRatio: 1,　// 压缩率小于1才会压缩
          deleteOriginalAssets: false // 删除未压缩的文件，谨慎设置，如果希望提供非gzip的资源，可不设置或者设置为false
         })
        ]
       }
    
}