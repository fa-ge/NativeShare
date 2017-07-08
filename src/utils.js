const UA = navigator.userAgent

const isIpad = /(iPad).*OS\s([\d_]+)/.test(UA)
const isIpod = /(iPod)(.*OS\s([\d_]+))?/.test(UA)
const isIphone = !isIpad && /(iPhone\sOS)\s([\d_]+)/.test(UA)
const isIos = isIpad || isIpod || isIphone
const isAndroid = /(Android);?[\s\/]+([\d.]+)?/.test(UA)
const isWechat = /micromessenger/i.test(UA)
const isQQ = /QQ\/([\d\.]+)/.test(UA)
const isQZone = /Qzone\//.test(UA)
const isQQMBrowser = /MQQBrowser/i.test(UA) && !isWechat && !isQQ
const isUCMBrowser = /UCBrowser/i.test(UA)
const isBaiduMBrowser = /mobile.*baidubrowser/i.test(UA)
const isSogouMBrowser = /SogouMobileBrowser/i.test(UA)
const isBaiduApp = /baiduboxapp/i.test(UA)

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

function openAppByScheme(scheme) {
    if (isIos) {
        location.href = scheme
    } else {
        var iframe = document.createElement('iframe')
        iframe.style.display = 'none'
        iframe.src = scheme
        document.body.appendChild(iframe)
        setTimeout(function() {
            iframe && iframe.parentNode && iframe.parentNode.removeChild(iframe)
        }, 2000)
    }
}

function generateQueryString(queryObj, needEncode = false) {
    const arr = []
    for (let key in queryObj) {
        if (needEncode) {
            arr.push(`${key}=${encodeURIComponent(queryObj[key])}`)
        } else {
            arr.push(`${key}=${queryObj[key]}`)
        }
    }
    return arr.join('&')
}

const Base64 = {
    _keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
    encode: function(a) {
        var b,
            c,
            d,
            e,
            f,
            g,
            h,
            i = '',
            j = 0
        for (a = Base64._utf8_encode(a); j < a.length; )
            (b = a.charCodeAt(j++)), (c = a.charCodeAt(j++)), (d = a.charCodeAt(j++)), (e = b >> 2), (f =
                ((3 & b) << 4) | (c >> 4)), (g = ((15 & c) << 2) | (d >> 6)), (h = 63 & d), isNaN(c)
                ? (g = h = 64)
                : isNaN(d) && (h = 64), (i =
                i + this._keyStr.charAt(e) + this._keyStr.charAt(f) + this._keyStr.charAt(g) + this._keyStr.charAt(h))
        return i
    },
    _utf8_encode: function(a) {
        a = a.replace(/\r\n/g, '\n')
        for (var b = '', c = 0; c < a.length; c++) {
            var d = a.charCodeAt(c)
            d < 128
                ? (b += String.fromCharCode(d))
                : d > 127 && d < 2048
                  ? ((b += String.fromCharCode((d >> 6) | 192)), (b += String.fromCharCode((63 & d) | 128)))
                  : (
                        (b += String.fromCharCode((d >> 12) | 224)),
                        (b += String.fromCharCode(((d >> 6) & 63) | 128)),
                        (b += String.fromCharCode((63 & d) | 128))
                    )
        }
        return b
    },
}

function getHostnameFromUrl(url) {
    const a = document.createElement('a')
    a.href = url
    return a.hostname
}

const descTag = document.querySelector('meta[name=description]')
const iconTag = document.querySelector('link[rel*=icon]')

function getContentFromDescTag() {
    return Object(descTag).content || ''
}

function getHrefFromIconTag() {
    return Object(iconTag).href || `${location.protocol}//${location.hostname}/favicon.ico`
}

function getTitleFromTitleTag() {
    return document.title
}

function setDescTagContent(content) {
    if (descTag) {
        descTag.content = content
    } else {
        document.head.insertAdjacentHTML('beforeend', `<meta name="description" content="${content}">`)
    }
}

function setIconTagHref(href) {
    if (iconTag) {
        iconTag.href = href
    } else {
        document.head.insertAdjacentHTML('beforeend', `<link rel="shortcut icon" href="${href}">`)
    }
}

function setTitleTagTitle(title) {
    document.title = title
}

export {
    isWechat,
    isQQ,
    isQZone,
    isIos,
    isAndroid,
    isQQMBrowser,
    isUCMBrowser,
    isBaiduMBrowser,
    isSogouMBrowser,
    isBaiduApp,
    loadJs,
    noop,
    assign,
    openAppByScheme,
    generateQueryString,
    Base64,
    getHostnameFromUrl,
    getContentFromDescTag,
    getHrefFromIconTag,
    getTitleFromTitleTag,
    setDescTagContent,
    setIconTagHref,
    setTitleTagTitle,
}
