const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/* 
ES6: export default import
CommonJS: module.exports / exports / require
*/
module.exports = {
    // 模式: 生产环境
    // mode: 'production',
    // 入口
    entry: {
        // __dirname: 代表当前文件所在目录
        app: path.resolve(__dirname, 'src/index.js')
    },
    // 出口(打包生成js)
    output: {
        filename: 'static/js/[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    // 模块加载器
    module: {
        rules: [
            {
                test: /\.js$/, // 用于匹配文件(对哪些文件进行处理)
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']  // 预设包: 包含多个常用插件的包
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: 'static/img/[name].[hash:7].[ext]'  //相对于output.path
                }
            }
        ]
    },
    // 插件
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
            filename: 'index.html'
        })
    ],
    //开发服务器
    devServer: {
        // open: true, // 自动打开浏览器
        //quiet: true  // 不做太多日志输出
    },
    // 开启source-map
    devtool: 'cheap-module-eval-source-map',
}

