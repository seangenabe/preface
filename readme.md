# Preface

Prepend data to a stream or file.

[![Node.js CI](https://github.com/seangenabe/preface/actions/workflows/node.js.yml/badge.svg)](https://github.com/seangenabe/preface/actions/workflows/node.js.yml)

## API

```javascript
const preface = require('preface')
const PrependStream = require('preface').PrependStream
```

### class PrependStream extends Transform

A transform stream that prepends data to the incoming stream.

#### `new PrependStream(data, options)`

Creates a new instance of PrependStream.

* `data: String|Buffer|null`: The data to prepend to the input stream. Can accept any object in [object mode](https://nodejs.org/api/stream.html#stream_object_mode).
* `options: Object`: Options to pass to the [Transform constructor](https://nodejs.org/api/stream.html#stream_new_stream_transform_options).
* `options.enc: String`: Encoding of the data to push.

### `preface(inputStream, data, [options])`

Returns a new instance of PrependStream constructed with the specified
arguments. This is in a way just a function version to set up the PrependStream
class.

* `inputStream: stream.Readable` (or any Readable-compatible API)
* `data: String|Buffer|null` or `any`: Data to prepend to the stream. Can accept any object in [object mode](https://nodejs.org/api/stream.html#stream_object_mode).
* `options: Object`: options to pass to the PrependStream constructor.

## CLI

Install as a global module to do some awesome:

* First unnamed argument: Data to prepend to the stream.
* `-i` / `--in`: Path to input file. Uses standard input if not provided.
* `-o` / `--out`: Path to output file. Uses standard output if not provided.

Examples:

* `echo 1234 | preface abcd` (Try this one!)
* `preface abcd < in.txt > out.txt`
* `preface abcd --in in.txt --out out.txt`

## License

MIT
