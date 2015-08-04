# Preface

Prepend data to a stream or file.

[![Build Status](https://travis-ci.org/seangenabe/preface.svg?branch=master)](https://travis-ci.org/seangenabe/preface)
[![Dependency Status](https://david-dm.org/seangenabe/preface.svg)](https://david-dm.org/seangenabe/preface)
[![devDependency Status](https://david-dm.org/seangenabe/preface/dev-status.svg)](https://david-dm.org/seangenabe/preface#info=devDependencies)

## API

    var preface = require('preface')
    var PrependStream = require('preface').PrependStream

### class PrependStream extends Transform

A transform stream that prepends data to the incoming stream.

#### `new PrependStream(data, options)`

Creates a new instance of PrependStream.

* `data: String|Buffer|null`: The data to prepend to the input stream.
* `options: Object`: Options to pass to the Transform constructor.
* `options.enc: String`: Encoding of the data to push.

### `preface(inputStream, data: String|Buffer|null)`

Returns a new instance of PrependStream constructed with the specified
arguments.

* `inputStream: stream.Readable` (or any Readable-compatible API)
* `data: String|Buffer|null`

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
