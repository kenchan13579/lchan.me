 module.exports = {
     entry: './src/js/app.jsx',
     output: {
         path: './dist/js/',
         filename: 'app.js'
     },
    module: {
      loaders: [
        { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader", query: {presets:['es2015', 'react'] }},
        { test: /\.css$/, loader: "style-loader!css-loader" }
      ]
    }
 };
