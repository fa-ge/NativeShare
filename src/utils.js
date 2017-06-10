const UA = window.navigator.userAgent

const isIpad = /(iPad).*OS\s([\d_]+)/.test(UA)
const isIpod = /(iPod)(.*OS\s([\d_]+))?/.test(UA)
const isIphone = !isIpad && /(iPhone\sOS)\s([\d_]+)/.test(UA)
const isIos = isIpad || isIpod || isIphone
const isAndroid = /(Android);?[\s\/]+([\d.]+)?/.test(UA)
const isWechat = /micromessenger/i.test(UA)
const isQQMBrowser = /MQQBrowser/i.test(UA) && !isWechat
const isUCMBrowser = /UCBrowser/i.test(UA)
const isBAIDUMBrowser = /mobile.*baidubrowser/i.test(UA)

function noop() {}

function loadJs(src, callback = noop) {
    const ref = document.getElementsByTagName('script')[0]
    const script = document.createElement('script')
    script.src = src
    script.async = true
    ref.parentNode.insertBefore(script, ref)
    script.onload = callback
}

function assign(target, varArgs) {
    if (target == null) {
        throw new TypeError('Cannot convert undefined or null to object')
    }

    var to = Object(target)

    for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index]

        if (nextSource != null) {
            for (var nextKey in nextSource) {
                if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                    to[nextKey] = nextSource[nextKey]
                }
            }
        }
    }
    return to
}

export { isWechat, isIos, isAndroid, isQQMBrowser, isUCMBrowser, isBAIDUMBrowser, loadJs, noop, assign }
