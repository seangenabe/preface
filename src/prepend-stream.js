
import {Transform} from 'stream'

export default class PrependStream extends Transform {

  constructor(data, options) {
    super(options)
    var enc = null
    if (options) {
      enc = options.enc
    }
    this.push(data, enc)
  }

  _transform(data, encoding, callback) {
    callback(null, data)
  }

}
