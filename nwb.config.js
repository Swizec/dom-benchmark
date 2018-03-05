module.exports = {
    type: "react-app",
    babel: {
        presets: "react"
    },
    webpack: {
        extra: {
            module: {
                rules: [{ test: /\.vue$/, loader: "vue-loader" }]
            }
        }
    }
};
