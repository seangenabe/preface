'use strict'

const Transform = require('stream').Transform

class PrependStream extends Transform {

  constructor(data, options) {
    super(options)
    let enc = null
    if (options) {
      enc = options.enc
    }
    this.firstChunk = true
    this.prependData = data
  }

  _transform(data, enc, cb) {
    if (this.firstChunk) {
      this.firstChunk = false
      this.push(this.prependData)
    }
    cb(null, data)
  }

}

module.exports = PrependStream
