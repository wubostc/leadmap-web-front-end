const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
  mode: "production",
  entry:
  {
    init: "./_src_/lm.ts",
  },
  output: {
    filename: "[name]-[chunkhash:16].js",
    path: path.resolve(__dirname, "lib"),
    // publicPath: urlconfig["prod"]["sysconfig"]["login"]["url"]
  },

  optimization: 
  {
    runtimeChunk: true,
    splitChunks: 
    {
      chunks: "all",
      // minChunks: 10,
      // minSize: 0,
      maxInitialRequests: 4,
      maxAsyncRequests: 6,
      cacheGroups: 
      {
        react:
        {
          test: /react/i,
          name: "react_bundle",
          priority: 99,
          reuseExistingChunk: true
        },
        vendor: {
          test: path.resolve(__dirname, "../node_modules"),
          name: "vendor",
          priority: 0,
          reuseExistingChunk: true
        },
      }
    }
  },

  resolve: {
    extensions: [".wasm",".mjs", ".ts", ".js", ".json", ".tsx"]
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        enforce: "pre",
        use: [{
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
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: false,
              importLoaders: 1
            }
          },
          {
            loader: "less-loader",
            options: {
              javascriptEnabled: true,
              sourceMap: false
            }
          }
        ]
      }
    ]
  },

  plugins: [

 
    new MiniCssExtractPlugin({
      filename: "[name]_[hash:16].css",
      chunkFilename: "[id]_[contenthash].css",
    }),

  ]
};
