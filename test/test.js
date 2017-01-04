const test = require('ava')
const preface = require('..')
const { PrependStream } = require('..')
const { Writable, Readable, Transform } = require('stream')

class TestObjectReadable extends Readable {

  constructor(options) {
    super(options)
  }

  put(obj) {
    this.push(obj)
  }

  finish() {
    this.push(null)
  }

  _read() {
  }
}

class TestObjectWritable extends Writable {

  constructor(options) {
    super(options)
    this.objects = []
  }

  _write(chunk, encoding, callback) {
    this.objects.push(chunk)
    callback()
  }
}

class TestStringReadable extends Readable {

  constructor(options) {
    super(options)
  }

  put(str) {
    this.push(str)
  }

  finish() {
    this.push(null)
  }

  _read() {
  }
}

class TestStringWritable extends Writable {

  constructor(options) {
    super(options)
    this.data = ''
  }

  _write(chunk, encoding, callback) {
    this.data += chunk
    callback()
  }
}

test.cb("PrependStream should prepend a string to a stream", t => {
  let r = new TestStringReadable()
  let w = new TestStringWritable()
  let w2 = new TestStringWritable()

  r.on('end', function() {
    t.is(w.data, 'ba')
    t.is(w2.data, 'ca')
    t.end()
  })

  r.pipe(new PrependStream('b')).pipe(w)

  r.put('a')
  r.finish()

  r.pipe(new PrependStream('c')).pipe(w2)
})

test.cb("PrependStream should prepend object data to a stream", t => {
  let r = new TestObjectReadable({objectMode: true})
  let w = new TestObjectWritable({objectMode: true})
  let w2 = new TestObjectWritable({objectMode: true})

  r.on('end', function() {
    t.deepEqual(w.objects, [{a: 1}, {b: 2}, {c: 3}])
    t.deepEqual(w2.objects, [{d: 4}, {b: 2}, {c: 3}])
    t.end()
  })

  r.pipe(new PrependStream({a: 1}, {objectMode: true})).pipe(w)

  r.put({b: 2})
  r.put({c: 3})
  r.finish()

  r.pipe(new PrependStream({d: 4}, {objectMode: true})).pipe(w2)
})

test.cb("preface should prepend a string to a stream", t => {
  let r = new TestStringReadable()
  let w = new TestStringWritable()
  let w2 = new TestStringWritable()

  r.on('end', function() {
    t.is(w.data, 'ba')
    t.is(w2.data, 'ca')
    t.end()
  })

  preface(r, 'b').pipe(w)

  r.put('a')
  r.finish()

  preface(r, 'c').pipe(w2)
})

test.cb("prepend should prepend object data to a stream", t => {
  let r = new TestObjectReadable({objectMode: true})
  let w = new TestObjectWritable({objectMode: true})
  let w2 = new TestObjectWritable({objectMode: true})

  r.on('end', function() {
    t.deepEqual(w.objects, [{a: 1}, {b: 2}, {c: 3}])
    t.deepEqual(w2.objects, [{d: 4}, {b: 2}, {c: 3}])
    t.end()
  })

  preface(r, {a: 1}, {objectMode: true}).pipe(w)

  r.put({b: 2})
  r.put({c: 3})
  r.finish()

  preface(r, {d: 4}, {objectMode: true}).pipe(w2)
})
