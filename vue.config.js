const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: '0.0.0.0', // 本地地址
    port: 8080, // 端口号
    open: true, // 配置项目在启动时自动在浏览器打开
    proxy: {
        '/api' : { // '/api'是代理标识，一般是每个接口前的相同部分
            target: "http://155.138.200.46:1234/", // 请求地址，一般是服务器地址
            changeOrigin: true, // 是否进行跨域
            pathRewrite: { // pathRewrite的作用是把请求接口中的 '/api'替换掉，一般是替换为空""
                '^/api':""
            }
        }
    }
}
    /*devServer: {
      host: '0.0.0.0',
      port: 8080, // 端口
    }*/
    /*server: {
        host: '0.0.0.0',
        port: 1002,
        open: false,
        proxy: {
          '/api': {
            target: viteEnv.VITE_APP_API_BASE_URL,
            changeOrigin: true, // 允许跨域
            rewrite: path => path.replace('/api/', '/'),
          },
        },
      },*/
})
