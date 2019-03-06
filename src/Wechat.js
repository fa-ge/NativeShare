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
        loadJs('https://res.wx.qq.com/open/js/jweixin-1.4.0.js', () => {
            wx.config(
                assign(
                    {
                        debug: false,
                        jsApiList: [
                            'updateAppMessageShareData',
                            'updateTimelineShareData',
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
                wx.updateAppMessageShareData(wxShareData)
                wx.updateTimelineShareData(wxShareData)
            })
        })
    }
}
