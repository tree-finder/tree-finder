/*
 * Copyright (c) 2020, Max Klein
 *
 * This file is part of the tree-finder library, distributed under the terms of
 * the BSD 3 Clause license. The full license can be found in the LICENSE file.
 */
/*
 * Copyright (c) 2020, Max Klein
 *
 * This file is part of the tree-finder library, distributed under the terms of
 * the BSD 3 Clause license. The full license can be found in the LICENSE file.
 */
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const RemoveEmptyScriptsPlugin = require("webpack-remove-empty-scripts");
const path = require("path");

const isProd = process.env.NODE_ENV === "production";

const cssLoader = () => {
    return {
        loader: "css-loader",
        options: {
            importLoaders: 1,
            import: true,
            modules: {
                localIdentName: "[local]", //"[path][name]__[local]--[hash:base64:5]",
                // compileType: "module",
                // mode: "local",
                // auto: true,
                // exportGlobals: true,
                // localIdentContext: path.resolve(__dirname, "src"),
                // localIdentHashPrefix: "my-custom-hash",
                // namedExport: true,
                // exportLocalsConvention: "camelCase",
                // exportOnlyLocals: false,
            },
        },
    };
};

// const postCssLoader = () => {return {
//   loader: "postcss-loader",
//   ...(process.env.NODE_ENV === "production") && {options: {
//     postcssOptions: {
//       minimize: true,
//       plugins: [
//         cssnano({
//           preset: "lite"
//         }),
//       ],
//     },
//   }},
// };}

// load bitmap image rules
const bitmapRules = [
    {
        test: /\.(jpg|png|gif)$/,
        use: "file-loader",
    },
];

// load dependency source maps
const dependencySrcMapRules = [
    {
        test: /\.js$/,
        use: "source-map-loader",
        enforce: "pre",
        exclude: /node_modules/,
    },
    { test: /\.js.map$/, use: "file-loader" },
];

// rules to cover all of pure/modules css/less
const stylingRules = [
    {
        test: /\.module\.css$/,
        use: [cssLoader()],
    },
    {
        test: /(?<!\.module)\.css$/,
        use: [
            // "style-loader",
            MiniCssExtractPlugin.loader,
            cssLoader(),
        ],
    },
    {
        test: /\.module\.less$/,
        use: [
            cssLoader(),
            // "postcss-loader",
            "less-loader",
        ],
    },
    {
        test: /(?<!\.module)\.less$/,
        use: [
            // "style-loader",
            MiniCssExtractPlugin.loader,
            cssLoader(),
            // "postcss-loader",
            "less-loader",
        ],
    },
];

// load svg via css url() rules
const svgUrlRules = [
    {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        type: "asset/inline",
        use: {
            loader: "svg-url-loader",
            options: { encoding: "none", limit: 10000 },
        },
    },
];

const tsRules = [
    {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
            loader: "ts-loader",
            options: {
                transpileOnly: false, // Set to true if you are using fork-ts-checker-webpack-plugin
                projectReferences: true,
            },
        },
    },
];

const getContext = (dir) => {
    return {
        // context: path.resolve(dir),
    };
};

const getOptimization = () => {
    return {
        minimizer: [
            // "...",
            new TerserPlugin({
                // turn off license gen
                terserOptions: {
                    format: {
                        comments: false,
                    },
                },
                // turn off license gen
                extractComments: false,
            }),
            new CssMinimizerPlugin(),
        ],
    };
};

const getResolve = (dir) => {
    return {
        modules: ["node_modules", path.resolve(dir)],
        extensions: [".tsx", ".ts", ".jsx", ".js", ".less", ".css"],
    };
};

const treeFinderConfig = {
    entry: {
        "tree-finder": "src/index.ts",
    },
    devtool: "source-map",
    ...getContext(__dirname),

    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "/dist/",

        // filename: "[name].js",
        libraryTarget: "umd",

        // use a unique name for each chunk
        // filename: "[name].[chunkhash].js",
    },

    module: {
        rules: [
            ...dependencySrcMapRules,
            ...stylingRules,
            ...svgUrlRules,
            ...tsRules,
        ],
    },

    resolve: {
        ...getResolve(__dirname),
    },

    plugins: [new MiniCssExtractPlugin()],

    mode: isProd ? "production" : "development",

    optimization: {
        minimize: isProd,
        ...(isProd && getOptimization()),
    },

    // experiments: {
    //   topLevelAwait: true,
    // },

    // don"t include any external packages in bundle
    // externals: [/^[a-z0-9@]/],

    // split the bundle into chunks
    // optimization: {
    //   splitChunks: {
    //     chunks: "all"
    //   }
    // },
};

const treeFinderStyleConfig = {
    entry: {
        "tree-finder": "style/index.less",
    },
    devtool: "source-map",
    ...getContext(__dirname),

    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "/dist/",
    },

    module: {
        rules: [
            ...dependencySrcMapRules,
            ...stylingRules,
            ...svgUrlRules,
            ...tsRules,
        ],
    },

    resolve: {
        ...getResolve(__dirname),
    },

    plugins: [
        // new FixStyleOnlyEntriesPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),

        new RemoveEmptyScriptsPlugin(),
    ],

    mode: isProd ? "production" : "development",

    optimization: {
        minimize: isProd,
        ...(isProd && getOptimization()),
    },
};

const treeFinderThemeConfig = {
    entry: {
        material: "style/theme/material.css",
    },
    devtool: "source-map",
    ...getContext(__dirname),

    output: {
        path: path.resolve(__dirname, "dist/theme"),
        publicPath: "/dist/",
    },

    module: {
        rules: [
            ...dependencySrcMapRules,
            ...stylingRules,
            ...svgUrlRules,
            ...tsRules,
        ],
    },

    resolve: {
        ...getResolve(__dirname),
    },

    plugins: [
        // new FixStyleOnlyEntriesPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),

        new RemoveEmptyScriptsPlugin(),
    ],

    mode: isProd ? "production" : "development",

    optimization: {
        minimize: isProd,
        ...(isProd && getOptimization()),
    },
};

module.exports = [
    treeFinderConfig,
    treeFinderStyleConfig,
    treeFinderThemeConfig,
];
