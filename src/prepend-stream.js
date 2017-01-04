'use strict'

var Transform = require('stream').Transform
var Util = require('util')

function PrependStream(data, options) {
  Transform.call(this, options)
  var enc = null
  if (options) {
    enc = options.enc
  }
  this.firstChunk = true
  this.prependData = data
}

PrependStream.prototype._transform = function _transform(data, enc, cb) {
  if (this.firstChunk) {
    this.firstChunk = false
    this.push(this.prependData)
  }
  cb(null, data)
}

Util.inherits(PrependStream, Transform)

module.exports = PrependStream
