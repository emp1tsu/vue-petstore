module.exports = {
  devServer: {
    proxy: {
      "/v3": {
        target: "http://localhost:2345"
      }
    }
  }
};
