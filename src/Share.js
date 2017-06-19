import { noop, assign, openAppByScheme, generateQueryString, Base64, isIos } from './utils'

export default class Share {
    _shareData = null

    constructor(config) {
        this.initShareData()
    }

    initShareData() {
        const descTag = document.querySelector('meta[name=description]')
        const iconTag = document.querySelector('link[rel*=icon]')
        let desc = 'from https://github.com/fa-ge/NativeShare'
        let icon = ''
        if (descTag) {
            desc = descTag.getAttribute('content')
        }
        if (iconTag) {
            icon = iconTag.getAttribute('href')
        }

        this._shareData = {
            link: location.href,
            title: document.title,
            desc,
            icon,
            from: '',
            success: noop,
            fail: noop,
            cancel: noop,
            trigger: noop,
        }
    }

    getShareData() {
        return assign({}, this._shareData)
    }

    setShareData(options = {}) {
        assign(this._shareData, options)
    }
}
