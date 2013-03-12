# load-script

Dynamic script loading.

## Installation

```
$ component install eldargab/load-script
```

## API

```javascript
var load = require('load-script')
load('foo.js', function (err) {
  if (err) {
    // print useful message
  else {
    // use script
    // note that in IE8 and below loading error wouldn't be reported
  }
})
```

## License

MIT
