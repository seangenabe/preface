#!/usr/bin/env node
'use strict'

const minimist = require('minimist')
const FS = require('fs')

const argv = minimist(process.argv.slice(2), {
  string: ['o', 'i', '_'],
  alias: {
    o: 'out',
    i: 'in'
  }
})

const { _: [data], o, i } = argv
o = o ? FS.createWriteStream(o) : process.stdout
i = i ? FS.createReadStream(i) : process.stdin

i.pipe(new PrependStream(data))
  .pipe(o)
