'use strict'

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
