
module.exports = function load (src, cb) {
  var head = document.head || document.getElementsByTagName('head')[0]
  var script = document.createElement('script')

  script.type = 'text/javascript'
  script.charset = 'utf8'
  script.async = true
  script.src = src

  if (cb) {
    var onend = 'onload' in script ? stdOnEnd : ieOnEnd
    onend(script, cb)
  }

  head.appendChild(script)
}

function stdOnEnd (script, cb) {
  cb = once(cb) // IE fires load event after error
  script.onload = function () {
    cb()
  }
  script.onerror = function () {
    cb(new Error('Failed to load ' + this.src))
  }
}

function ieOnEnd (script, cb) {
  script.onreadystatechange = function () {
    if (this.readyState != 'complete') return
    this.onreadystatechange = null
    cb() // there is no way to catch loading errors in IE8
  }
}

function once (fn) {
  var done = false
  return function () {
    if (done) return
    done = true
    fn.apply(this, arguments)
  }
}
