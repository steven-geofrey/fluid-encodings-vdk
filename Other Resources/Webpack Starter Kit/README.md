# Getting started

`npm init`

# To install webpack

`npm install webpack webpack-cli --save-dev`

# To install webpack-dev-server

`npm install --save-dev webpack-dev-server`

# Installing plugins and loaders

`npm install --save-dev html-webpack-plugin`
`npm install --save-dev css-loader style-loader`
`npm install url-loader --save-dev`
`npm install file-loader --save-dev`
`npm install d3`
`npm install --save-dev @babel/core babel-loader @babel/preset-env`

For TypeScript:
`npm install ts-loader source-map-loader`

# Add the following to package.json after npm init

    "scripts": {
        ...
        "build": "webpack",
        "dev": "webpack serve --open"

    }

For TypeScript, merge the following into webpack.config.js:
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
    },
    module: {
    rules: [
        // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
        { test: /\.tsx?$/, loader: "ts-loader" },
        // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        { test: /\.js$/, loader: "source-map-loader" },
    ],
    },