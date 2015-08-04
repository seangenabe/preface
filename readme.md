# Preface

Prepend data to a stream.

## API

    var preface = require('preface')
    var PrependStream = require('preface').PrependStream

### `PrependStream extends Transform`

A transform stream that prepends data to the incoming stream.

#### `new prependStream(data: String|Buffer|null, options: object)`

Creates a new instance of PrependStream.

* data: The data to prepend to the input stream.
* options: Options to pass to the Transform constructor.
* options.enc: Encoding of the data to push.

### `preface(inputStream: ReadableStream, data: String|Buffer|null)`

Returns a new instance of PrependStream constructed with the specified
arguments.

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
