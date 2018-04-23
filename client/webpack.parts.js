exports.devServer = ({host, port} = {}) => ({
  devServer: {
    stats: "errors-only",
    host: host,
    port: port,
    open: true, // open in browser
    overlay: true, // show fullscreen error in browser on error
  },
});