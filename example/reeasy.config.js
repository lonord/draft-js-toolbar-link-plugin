const webpack = require('webpack')

module.exports = {
	rootPath: 'app.tsx',
	selector: '#root',
	webpack: config => {

		config.module.loaders.unshift({
			test: /\.tsx?$/,
			use: [
				{
					loader: 'babel-loader',
					options: {
						presets: [
							['env', { "modules": false }],
							'react'
						],
						plugins: [
							[
								"transform-runtime",
								{
									"helpers": false,
									"polyfill": false,
									"regenerator": true,
									"moduleName": "babel-runtime"
								}
							]
						]
					}
				},
				{
					loader: 'awesome-typescript-loader',
					options: {
						configFileName: 'example/tsconfig.json',
						silent: true
					}
				}
			]
		})

		config.module.loaders.push({
			test: /\.css$/,
			loader: 'style-loader!css-loader'
		})

		config.plugins.push(new webpack.ProgressPlugin())

		return config
	}
}