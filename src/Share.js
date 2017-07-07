import {
    noop,
    assign,
    openAppByScheme,
    generateQueryString,
    Base64,
    isIos,
    getContentFromDescTag,
    getHrefFromIconTag,
    getTitleFromTitleTag,
    setDescTagContent,
    setIconTagHref,
    setTitleTagTitle,
} from './utils'

export default class Share {
    _shareData = null
    _config = {
        syncDescToTag: false,
        syncIconToTag: false,
        syncTitleToTag: false,
    }
    constructor(config) {
        this.setConfig(config)
        this.initShareData()
    }

    initShareData() {
        this._shareData = {
            link: location.href,
            title: getTitleFromTitleTag(),
            desc: getContentFromDescTag(),
            icon: getHrefFromIconTag(),
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
        if (this._config.syncDescToTag) {
            setDescTagContent(this._shareData.desc)
        }
        if (this._config.syncIconToTag) {
            setIconTagHref(this._shareData.icon)
        }
        if (this._config.syncTitleToTag) {
            setTitleTagTitle(this._shareData.title)
        }
    }

    setConfig(config = {}) {
        assign(this._config, config)
    }

    getConfig() {
        return assign({}, this._config)
    }
}
