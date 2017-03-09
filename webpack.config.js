const path = require('path');
const webpack = require('webpack');
const HandlebarsPlugin = require("handlebars-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default

const data = require("./src/data/data.json");

// TODO: Check dependency injection in scripts

module.exports = {
    context: path.resolve(__dirname, './src'),
    entry: {
        scripts: ['./assets/scripts/app.js'],
        styles: ['./assets/scss/app.scss']
    },

    module: {
        rules: [
            {
                test: /\.js$/, // include .js files
                exclude: /node_modules/, // exclude any and all files in the node_modules folder
                use: [
                    'jshint-loader', {
                        loader: "jshint-loader",
                        options: {
                            camelcase: true,
                            emitErrors: false,
                            failOnHint: false
                        }
                    },
                    'babel-loader'
                ]
            }, {
                test: /\.hbs$/,
                use: [
                    "handlebars", {
                        loader: "handlebars-loader"
                    },
                    "htmlhint", {
                        loader: "htmlhint",
                        options: {
                            configFile: '.htmlhintrc'
                        }
                    }
                ]
            }, {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader?importLoaders=1!postcss-loader!sass-loader', publicPath: './dist'})
            }, {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            }

        ]
    },

    plugins: [
        new WriteFilePlugin(),
        new StyleLintPlugin({configFile: '.stylelintrc'}),
        new HandlebarsPlugin({

            // path to main hbs template
            entry: path.join(process.cwd(), "src", "templates", "pages", "index.hbs"),
            // data passed to main hbs template: `main-template(data)`
            //data: require("./src/data/about.json", "./src/data/profession.json", "./src/data/contact.json"), //TODO: Make data work in templates
            // globbed path to partials, where folder/filename is unique
            partials: [path.join(process.cwd(), "src", "templates", "partials", "**", "*.hbs")],
            // register custom helpers. May be either a function or a glob-pattern
            data,
            helpers: {
                data: function() {
                    return data
                }
            },

            // filepath to result
            output: path.join(process.cwd(), "dist", "index.html"),

            // hooks
            onBeforeSetup: function(Handlebars) {},
            onBeforeAddPartials: function(Handlebars, partialsMap) {},
            onBeforeCompile: function(Handlebars, templateContent) {},
            onBeforeRender: function(Handlebars, data) {},
            onBeforeSave: function(Handlebars, resultHtml) {},
            onDone: function(Handlebars) {}
        }),

        new ExtractTextPlugin({filename: 'assets/css/style.css', disable: false, allChunks: true}),

        new CopyWebpackPlugin([
            {
                from: './assets/icofonts/',
                to: './assets/fonts'
            }
        ]),
        new CopyWebpackPlugin([
            {
                from: './assets/images/',
				to: './assets/img'
            }
        ]),
        new ImageminPlugin({test: /\.(jpe?g|png|gif|svg)$/i})

    ],

    devtool: "source-map", // any "source-map"-like devtool is possible

    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'assets/js/[name].bundle.js'
    },

    devServer: {
        contentBase: path.resolve(__dirname, './dist'), // New
    }

};
