
import preface, {PrependStream} from '..'
import {expect} from 'chai'
import {Writable, Readable} from 'stream'
import {WritableStreamBuffer, ReadableStreamBuffer} from 'stream-buffers'

class TestObjectReadable extends Readable {

  constructor(options) {
    super(options)
  }

  _read() {
    this.push({b: 2})
    this.push({c: 3})
    this.push(null)
  }
}

class TestObjectWritable extends Writable {

  constructor(options) {
    options.objectMode = true
    super(options)
    this.objects = []
  }

  _write(chunk, encoding, callback) {
    this.objects.push(chunk)
    callback()
  }
}

function bufferTestSetup(done) {
  var r = new ReadableStreamBuffer()
  r.put('efgh', 'utf8')
  var w = new WritableStreamBuffer()

  w.on('end', function() {
    expect(w.getContentsAsString('utf8'))
      .to.equal('abcdefgh')
    done()
  })

  return {r, w}
}

describe('PrependStream', function() {

  it('should prepend a string to a stream', function(done) {
    var {r, w} = bufferTestSetup(done)
    r.pipe(new PrependStream('abcd', {enc: 'utf8'})).pipe(w)
  })

  it('should prepend object data to a stream', function(done) {
    var r = new TestObjectReadable()
    var w = new TestObjectWritable()

    w.on('end', function() {
      expect(w.objects).to.deep.equal([{a: 1}, {b: 2}, {c: 3}])
      done()
    })

    r.pipe(new PrependStream({a: 1})).pipe(w)
  })

})

describe('preface', function() {

  it('should prepend a string to a stream', function(done) {
    var {r, w} = bufferTestSetup(done)
    preface(r, 'abcd').pipe(w)
  })

})
