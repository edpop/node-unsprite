const fs = require('fs');
const path = require('path');

const Jimp = require('jimp');


function readJSON (path) {
	return new Promise(function (resolve, reject) {
		fs.readFile(path, { encoding: 'utf-8' }, function (err, data) {
			if (err) {
				reject(err);
			} else {
				try {
					data = JSON.parse(data);
				} catch (err) {
					return reject(err);
				}
				resolve(data);
			}
		});
	});
}

module.exports = function (srcJSONPath, srcImgPath, destImgDir, callback) {
	const extension = path.extname(srcImgPath);

	Promise.all([
		Jimp.read(srcImgPath),
		readJSON(srcJSONPath)
	])
		.catch(callback)
		.then(function (values) {
			const image = values[0];
			const json = values[1];

			Promise.all(Object.keys(json).map(function (name) {
				return new Promise(function (resolve, reject) {
					const attrs = json[name];
					const filename = path.join(destImgDir, name + extension);
					image
						.clone()
						.crop(attrs.x, attrs.y, attrs.width, attrs.height)
						.write(filename, function (err) {
							if (err) {
								reject(err);
							} else {
								resolve();
							}
						});
				});
			}))
				.catch(callback)
				.then(function () {
					callback(null);
				});
		});
};
