const path = require("path");


module.exports = {
  mode: "none",
  entry:"./_src_/index.ts",
  devtool: "cheap-source-map",
  output: {
    library: "libx",
    libraryTarget: "umd",
    auxiliaryComment: "leadmap libx",
    filename: "index.js",
    path: path.resolve(__dirname, "lib"),
    
  },
  externals: ["react", "react-dom", "react-router", /antd/i, "react-router-dom", "qs", /axios/i, /emotion/i, "react-cookie"],
  resolve: {
    extensions: [".wasm",".mjs", ".ts", ".js", ".json", ".tsx", ".less"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        enforce: "pre",
        use: [{
          loader: "babel-loader"
        }, {
          loader: "ts-loader"
        }, {
          loader: "tslint-loader",
          options: {
            configFile: "./tslint.yaml",
            tsConfigFile: "tsconfig.json"
          }
        }],
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: [
          // {
          //   loader: MiniCssExtractPlugin.loader
          // },
          {
            loader: "style-loader",
            options: {
              sourceMap: true,
            }
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              importLoaders: 1
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: loader => {
                return [
                  // require('postcss-import')(),
                  require("autoprefixer")({
                    browers: [
                      "> 5%",
                      "last 2 major versions",
                      "not ie <= 11"
                    ]
                  })
                ];
              }
            }
          },
          {
            loader: "less-loader",
            options: {
              javascriptEnabled: true,
              sourceMap: true
            }
          }
        ]
      }
    ]
  },

  // plugins: [
  //   new MiniCssExtractPlugin()
  // ]
};
