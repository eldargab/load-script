
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
    this.onreadystatechange = this.onerror = null
    cb()
  }
  script.onerror = function () {
    this.onreadystatechange = this.onerror = null
    cb(new Error('Failed to load ' + this.src))
  }
}
