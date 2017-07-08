import {
    noop,
    assign,
    openAppByScheme,
    generateQueryString,
    Base64,
    isIos,
    setDescTagContent,
    setIconTagHref,
    setTitleTagTitle,
} from './utils'
import shareData from './shareData'

export default class Share {
    _shareData = shareData
    _config = {
        syncDescToTag: false,
        syncIconToTag: false,
        syncTitleToTag: false,
    }
    
    constructor(config) {
        this.setConfig(config)
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
