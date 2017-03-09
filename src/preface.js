'use strict'

const PrependStream = require('./prepend-stream')

/**
 * Prepends data to a new stream.
 */
function preface(inputStream, data, options) {
  return inputStream.pipe(new PrependStream(data, options))
}

module.exports = preface
preface.PrependStream = PrependStream
