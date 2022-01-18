module.exports = {
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import "@/assets/scss/_variables.scss";
          @import "@/assets/scss/_media-queries.scss";
          @import "@/assets/scss/_global.scss";
        `
      }
    }
  }
};