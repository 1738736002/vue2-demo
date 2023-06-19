const { defineConfig } = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({
  publicPath: '/vue2-demo/',
  transpileDependencies: true,
  outputDir: 'docs'
  // chainWebpack: config => {
  //   // 配置自动导入公共样式文件
  //   const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
  //   types.forEach(type => addStyleResource(config.module.rule('stylus').oneOf(type)))
  // }
})

function addStyleResource (rule) {
  const url = './src/assets/dncss/vars.styl'
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, url)
      ]
    })
}
