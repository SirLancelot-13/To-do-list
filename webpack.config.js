const path=require('path');
const HTMLWebpackPlugin=require('html-webpack-plugin');

module.exports={
    mode:"development",
    entry:"./src/main.js",
    output:{
        filename:"test.js",
        path:path.resolve(__dirname,"dist"),
        clean:true,
    },
    devtool:"eval-source-map",
    devServer:{
        watchFiles:["./src/index.html"],
    },
    module:{
        rules:[
            {
                test:/\.css$i/,
                use:["style-loader","css-loader"],
            },
            {
                test:/\.html$/i,
                loader:"html-loader",
            },
            {
                test:/\.(png|svg|jpg|jpeg|gif)$/i,
                type:"asset/resource",
            }]
    },
    plugins:[
        new HTMLWebpackPlugin({
            template:"./src/index.html"
        }),
    ]
        
}