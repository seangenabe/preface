const test = require('ava')
const preface = require('..')
const { PrependStream } = require('..')
const { PassThrough, Transform } = require('stream')
const getStream = require('get-stream')

test("PrependStream should prepend a string to a stream", async(t) => {
  let r = new PassThrough()
  let w = new PrependStream('a')

  r.pipe(w)
  r.end('b')

  let value = await getStream(w)
  t.is(value, 'ab')
})

test("PrependStream should prepend object data to a stream", async t => {
  let r = new PassThrough({ objectMode: true })
  let w = new PrependStream({ a: 1 }, { objectMode: true })

  r.pipe(w)
  r.end({ b: 2 })

  let arr = await getStream.array(w)
  t.deepEqual(arr, [{ a: 1 }, { b: 2 }])
})

test("preface should prepend a string to a stream", async t => {
  let r = new PassThrough()
  let w = preface(r, 'a')

  r.end('b')
  let v = await getStream(w)
  t.is(v, 'ab')
})

test("prepend should prepend object data to a stream", async t => {
  let r = new PassThrough({ objectMode: true })
  let w = preface(r, { a: 1 }, { objectMode: true })

  r.end({ b: 2 })
  let arr = await getStream.array(w)
  t.deepEqual(arr, [{ a: 1 }, { b: 2 }])
})
