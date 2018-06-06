const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

module.exports = {
    entry: './src/js/bootstrap.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist'
    },
    devServer: {
        port: 3000,
        open: true
    },
    devtool: 'source-map',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env']
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'postcss-loader']
                })
            },
            {
                test: /\.(png|jpg|gif|woff2|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'images/',
                            publicPath: ''
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'bundle.css'
        })
        // new BrowserSyncPlugin(
        //     // BrowserSync options
        //     {
        //         // browse to http://localhost:3000/ during development
        //         host: 'localhost',
        //         port: 3000,
        //         // proxy the Webpack Dev Server endpoint
        //         // (which should be serving on http://localhost:3100/)
        //         // through BrowserSync
        //         proxy: 'http://localhost:3100/',
        //         // server: { baseDir: ['./'] }
        //     },
        //     // // plugin options
        //     // {
        //     //     // prevent BrowserSync from reloading the page
        //     //     // and let Webpack Dev Server take care of this
        //     //     reload: false
        //     // }
        // )
    ]
}
