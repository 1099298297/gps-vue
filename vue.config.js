module.exports = {
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "AI GPS Sys";
      return args;
    });
  },
  lintOnSave:false,
  devServer: {
    //配置完需要重启服务
    proxy: {
      "/api": {
        // target: "http://v0.campus.webpro.ltd/my-lms",
        // target: "http://leave.test.webpro.ltd/my-lms",
        // target: "http://192.168.1.103:8087",
        target: "http://127.0.0.1:8087",
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
  assetsDir: "static",
  parallel: false,
  publicPath: "./",
};
