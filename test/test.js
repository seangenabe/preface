
import preface, {PrependStream} from '..'
import {expect} from 'chai'
import {Writable, Readable, Transform} from 'stream'

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

describe('PrependStream', function() {

  it('should prepend a string to a stream', function(done) {
    var r = new TestStringReadable()
    var w = new TestStringWritable()
    var w2 = new TestStringWritable()

    r.on('end', function() {
      expect(w.data).to.equal('ba')
      expect(w2.data).to.equal('ca')
      done()
    })

    r.pipe(new PrependStream('b')).pipe(w)

    r.put('a')
    r.finish()

    r.pipe(new PrependStream('c')).pipe(w2)
  })

  it('should prepend object data to a stream', function(done) {
    var r = new TestObjectReadable({objectMode: true})
    var w = new TestObjectWritable({objectMode: true})
    var w2 = new TestObjectWritable({objectMode: true})

    r.on('end', function() {
      expect(w.objects).to.deep.equal([{a: 1}, {b: 2}, {c: 3}])
      expect(w2.objects).to.deep.equal([{d: 4}, {b: 2}, {c: 3}])
      done()
    })

    r.pipe(new PrependStream({a: 1}, {objectMode: true})).pipe(w)

    r.put({b: 2})
    r.put({c: 3})
    r.finish()

    r.pipe(new PrependStream({d: 4}, {objectMode: true})).pipe(w2)
  })

})

describe('preface', function() {

  it('should prepend a string to a stream', function(done) {
    var r = new TestStringReadable()
    var w = new TestStringWritable()
    var w2 = new TestStringWritable()

    r.on('end', function() {
      expect(w.data).to.equal('ba')
      expect(w2.data).to.equal('ca')
      done()
    })

    preface(r, 'b').pipe(w)

    r.put('a')
    r.finish()

    preface(r, 'c').pipe(w2)
  })

})
