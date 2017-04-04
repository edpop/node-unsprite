## unsprite

Unsprite your sprite!

Get the source images from sprite files __json__+__png__.


### Usage
```bash
npm install unsprite
```

```js
const unsprite = require('unsprite');

unsprite('/path/to/my/sprite.json', '/path/to/my/sprite.png', 'build/', function (err) {
	if (err) throw err;

	console.info('Success!');
});
```
