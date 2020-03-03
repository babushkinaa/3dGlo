// подключим path предварительно установив
// npm i path -D
// устанавливаем babel: npm install -D babel-loader @babel/core @babel/preset-env 

const path = require('path');
module.exports = {
    entry: { // точка входа
        main : './src/index.js'
    },
    output: { // точка выхода
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js', // будет взято имя из entery 'main'
        publicPath: '/dist' // пишется без точки './dist' - не правильно
    },
    devServer: { // настройка dev servera
        overlay :true // отображать ошибку на страницу проекта сверху
    },
    // правила обработки в проекте
    module: {
        rules: [
            {
                test: /\.js$/, //какие файлы будем проверять
                loader: 'babel-loader',
                exclude: '/node_modules/', // что исключаем из проверки babel
            }
        ]
    }
};