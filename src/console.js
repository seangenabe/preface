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
const outputStream = o ? FS.createWriteStream(o) : process.stdout
const inputStream = i ? FS.createReadStream(i) : process.stdin

inputStream.pipe(new PrependStream(data))
  .pipe(outputStream)
