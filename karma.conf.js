module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'/*, 'es6-shim'*/],


        // list of files / patterns to load in the browser
        files: [
            //'node_modules/es7-shim/dist/es7-shim.js',
            //'node_modules/es6-symbol/implement.js'
            'spec/ServiceRegistrySpec.js'
        ],


        // list of files to exclude
        exclude: [],


        plugins: [
            'karma-webpack',
            'karma-sourcemap-loader',
            'karma-jasmine',
            'karma-chrome-launcher',
            'karma-firefox-launcher'
        ],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'spec/ServiceRegistrySpec.js': ['webpack', 'sourcemap']
            //'node_modules/es7-shim/dist/es7-shim.js': ['webpack'],
            //'node_modules/es6-symbol/implement.js': ['webpack']
        },

        webpack: {
            context: __dirname + "/spec",
            devtool: 'inline-source-map',
            module: {
                loaders: [
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        loader: 'babel',
                        query: {
                            presets: ["es2015", "stage-0"]
                        }
                    }
                ]
            }
        },

        webpackMiddleware: {
            noInfo: true
        },

        // test results reporter to use
        // possible values: 'dots', 'progress', 'coverage', 'mocha', 'nyan'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['dots'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Firefox', 'Chrome'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        // Concurrency level
        // how many browser should be started simultanous
        concurrency: Infinity
    });
};
