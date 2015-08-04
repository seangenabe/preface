'use strict'

import PrependStream from './prepend-stream'
export var PrependStream

/**
 * Prepends data to a new stream.
 */
export default function preface(inputStream, data) {
  return inputStream.pipe(new PrependStream(data))
}

export function console() {
  import minimist from 'minimist'
  import FS from 'fs'

  var argv = minimist(process.argv.slice(2), {
    string: ['o', 'i'],
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
    i = FS.createWriteStream(i)
  else
    i = process.stdin

  i.pipe(new PrependStream(data))
    .pipe(o)
}

if (require.main === module) {
  console()
}
