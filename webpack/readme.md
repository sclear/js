### plugins
  ``webpack-bundle-analyzer``打包分析

```javascript
  new BundleAnalyzerPlugin()
```

  ``copy-webpack-plugin`` 文件copy移动

  ```javascript
  new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../src/index.html'),
                to: path.resolve(__dirname, '../dist'),
                ignore: ['.*']
            }
        ])
  ```