const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const autoprefixer = require("autoprefixer");
const merge = require("webpack-merge");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const common = require("./webpack.common.js");
const pkgjson = require("../../package.json");

const ROOT_DIR = path.resolve(__dirname, "../../");
const DIST_DIR = path.resolve(ROOT_DIR, "dist");

const NAME_PROJECT = process.env.NODE_ENV == 'homolog' ? `homolog-${pkgjson.storeName}` : pkgjson.storeName;

function recursiveIssuer(m) {
    if (m.issuer) {
        return recursiveIssuer(m.issuer);
    } else if (m.name) {
        return m.name;
    } else {
        return false;
    }
}

const config = {
    mode: "production",
    devtool: "none",
    output: {
        path: DIST_DIR,
        publicPath: "/dist/",
        filename: (chunkData) => {
            if (chunkData.chunk.name === "checkout") {
                return `checkout${pkgjson.vtexCheckout}-custom.js`;
            }
            if (chunkData.chunk.name === "orderplaced") {
                return `checkout-confirmation${pkgjson.vtexCheckoutConfirmation}-custom.js`;
            }
        },
    },
    module: {
        rules: [
            // css
            {
                test: /\.css$/,
                include: /node_modules/,
                loader: ["style-loader", "css-loader"],
            },
            // sass
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    "css-hot-loader",
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: [autoprefixer("last 4 version")],
                            sourceMap: true,
                            includePaths: [
                                path.resolve(
                                    __dirname,
                                    "../node_modules/compass-mixins/lib"
                                ),
                            ],
                        },
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                            sassOptions: {
                                includePaths: [
                                    path.resolve(
                                        __dirname,
                                        "../node_modules/compass-mixins/lib"
                                    ),
                                ],
                            },
                        },
                    },
                    // resources loader
                    // {
                    //     loader: "sass-resources-loader",
                    //     options: {
                    //         resources: [
                    //             path.resolve(
                    //                 __dirname,
                    //                 "../src/assets/stylesheets/_theme.scss"
                    //             ),
                    //         ],
                    //     },
                    // },
                ],
            },
        ],
    },
    optimization: {
        runtimeChunk: false,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    output: {
                        comments: false,
                    },
                },
            }),
            new OptimizeCssAssetsPlugin({
                cssProcessor: require("cssnano"),
                cssProcessorPluginOptions: {
                    preset: [
                        "default",
                        { discardComments: { removeAll: true } },
                    ],
                },
                canPrint: true,
            }),
        ],
    },
    externals: {
        $: "jQuery",
        jquery: "jQuery",
        "window.jquery": "jQuery",
    },
    plugins: [
        // clean dist folder
        new CleanWebpackPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new MiniCssExtractPlugin({
            moduleFilename: ({ name }) => {
                if (name == "checkout") {
                    return `${name.replace(
                        "checkout",
                        `checkout${pkgjson.vtexCheckout}`
                    )}-custom.css`;
                }
                if (name == "orderplaced") {
                    return `${name.replace(
                        "orderplaced",
                        `checkout-confirmation${pkgjson.vtexCheckoutConfirmation}`
                    )}-custom.css`;
                }
            },
        }),
        new BundleAnalyzerPlugin({
            // Can be `server`, `static` or `disabled`.
            // In `server` mode analyzer will start HTTP server to show bundle report.
            // In `static` mode single HTML file with bundle report will be generated.
            // In `disabled` mode you can use this plugin to just generate Webpack Stats JSON file by setting `generateStatsFile` to `true`.
            analyzerMode: "static",
            // Host that will be used in `server` mode to start HTTP server.
            analyzerHost: "127.0.0.1",
            // Port that will be used in `server` mode to start HTTP server.
            analyzerPort: 8888,
            // Path to bundle report file that will be generated in `static` mode.
            // Relative to bundles output directory.
            reportFilename: "bundleReport.html",
            // Automatically open report in default browser
            openAnalyzer: false,
            // If `true`, Webpack Stats JSON file will be generated in bundles output directory
            generateStatsFile: false,
            // Name of Webpack Stats JSON file that will be generated if `generateStatsFile` is `true`.
            // Relative to bundles output directory.
            statsFilename: "stats.json",
            // Options for `stats.toJson()` method.
            // For example you can exclude sources of your modules from stats file with `source: false` option.
            // See more options here: https://github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
            statsOptions: null,
            // Log level. Can be 'info', 'warn', 'error' or 'silent'.
            logLevel: "info",
        }),
    ],
};

module.exports = merge(common, config);
