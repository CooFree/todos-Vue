const { VueLoaderPlugin } = require('vue-loader');
const path = require('path');
module.exports = {
    //入口文件的配置项
    entry: {
        entry: './src/index.js'
    },
    
    //出口文件的配置项
    output: {
        //输出的路径，用了Node语法
        path: path.resolve(__dirname, 'dist'),
        //输出的文件名称
        filename: 'bundle.js'
    },
    //模块：例如解读CSS,图片如何转换，压缩
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /.css$/,
                use: ['style-loader','css-loader']
             },
    
        ]
    },
    //插件，用于生产模版和各项功能
    plugins:[
       // 添加VueLoaderPlugin，以响应vue-loader
       new VueLoaderPlugin()
    ],
    //配置webpack开发服务功能
    devServer: {}
}