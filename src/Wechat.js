import { assign, loadJs } from './utils'
import Share from './Share'

export default class Wechat extends Share {
    constructor(config) {
        super(config)
        this.setConfig(config)
    }

    call(command, options) {
        this.setShareData(options)
    }

    setConfig(config) {
        super.setConfig(config)
        this.init(this.getConfig().wechatConfig)
    }

    init(config) {
        if (!config) {
            return
        }
        loadJs('https://res.wx.qq.com/open/js/jweixin-1.2.0.js', () => {
            wx.config(
                assign(
                    {
                        debug: false,
                        jsApiList: [
                            'onMenuShareTimeline',
                            'onMenuShareAppMessage',
                            'onMenuShareQQ',
                            'onMenuShareWeibo',
                            'onMenuShareQZone',
                        ],
                    },
                    config
                )
            )

            const shareData = this._shareData
            const wxShareData = {}

            Object.defineProperty(wxShareData, 'trigger', {
                get() {
                    return (...args) => {
                        assign(wxShareData, {
                            title: shareData.title,
                            desc: shareData.desc,
                            link: shareData.link,
                            imgUrl: shareData.icon,
                            type: shareData.type,
                            dataUrl: shareData.dataUrl,
                            success: shareData.success,
                            fail: shareData.fail,
                            cancel: shareData.fail,
                        })
                        shareData.trigger(...args)
                    }
                },
                set(newValue) {
                    shareData.trigger = newValue
                },
                enumerable: true,
            })

            wx.ready(() => {
                wx.onMenuShareAppMessage(wxShareData)
                wx.onMenuShareQQ(wxShareData)
                wx.onMenuShareQZone(wxShareData)
                wx.onMenuShareWeibo(wxShareData)
                wx.onMenuShareTimeline(wxShareData)
            })
        })
    }
}
