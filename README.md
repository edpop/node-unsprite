## unsprite

Unsprite your sprite!


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
