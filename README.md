# Chainr

Chainr is a tiny utility to make you possible to call undefined methods, by using
[Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy).

```javascript
import { createInstance } from 'chainr'
const chainr = createInstance(function dispatch (keys, args) {
  console.log(keys, args)
})

chainr()                        // [], []
chainr.what.is.this.method()    // ['what', 'is', 'this', 'method'], []
chainr['amazing!!!'](1, 2, 3)   // ['amazing!!!'], [1, 2, 3]
```

## API

Coming soon...
