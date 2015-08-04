'use strict'

var PrependStream = require('./prepend-stream')

/**
 * Prepends data to a new stream.
 */
function preface(inputStream, data) {
  return inputStream.pipe(new PrependStream(data))
}
module.exports = preface
preface.PrependStream = PrependStream

module.exports.console = function _console() {
  var minimist = require('minimist')
  var FS = require('fs')

  var argv = minimist(process.argv.slice(2), {
    string: ['o', 'i', '_'],
    alias: {
      o: 'out',
      i: 'in'
    }
  })

  var {_: [data], o, i} = argv
  if (o)
    o = FS.createWriteStream(o)
  else
    o = process.stdout

  if (i)
    i = FS.createReadStream(i)
  else
    i = process.stdin

  i.pipe(new PrependStream(data))
    .pipe(o)
}

if (require.main === module) {
  module.exports.console()
}
