var path = require('path');

module.exports = {
	entry: {
		App: './app/assets/scripts/App.js',
		Vendor: './app/assets/scripts/Vendor.js'
	},
	output: {
		path: path.resolve(__dirname, './app/temp/scripts'),
		filename: '[name].js'
	},
	module: {
		loaders: [
			{
				loader: 'babel-loader',
				query: {
					presets: ['es2015']
				},
				// only apply the loader to JS files
				test: /\.js$/,
				// exclude JS files that you do not want to convert
				exclude: /node_modules/
			}
		]
	}
};
