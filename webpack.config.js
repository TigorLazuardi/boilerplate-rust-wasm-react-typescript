/*
 * webpack.config.ts is not supported because ts-node does not support JS as ES Modules (as of this date), so we use JS directly.
 */
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin")
const path = require("path")
const { TsconfigPathsPlugin } = require("tsconfig-paths-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")

const dist = path.resolve(__dirname, "dist")

/**
 * import webpack types for autocomplete support. Requires @types/webpack to be installed
 * @type {import('webpack').Configuration}
 */
module.exports = {
    mode: "production",
    entry: {
        index: "./app/Index.tsx",
    },
    output: {
        path: dist,
        filename: "[name].js",
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                options: {
                    transpileOnly: true,
                },
                exclude: /dist/,
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        plugins: [new TsconfigPathsPlugin()],
    },
    devServer: {
        contentBase: dist,
    },
    plugins: [
        new HtmlWebpackPlugin({ template: "./static/index.html" }),
        new WasmPackPlugin({
            crateDirectory: __dirname,
            // Set the directory somewhere close to the web renderer
            outDir: "app/crate",
        }),
    ],
}
