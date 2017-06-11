import { assign, loadJs } from './utils'
import { setShareData, shareData } from './baseShare'

function callShare(command, options = {}) {
    setShareData(options)
}

function init() {}

function setWechatConfig(config) {
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
        const wxShareData = {
            title: shareData.title,
            desc: shareData.desc,
            link: shareData.link,
            imgUrl: shareData.icon,
            type: shareData.type,
            dataUrl: shareData.dataUrl,
            success: shareData.success,
            cancel: shareData.cancel,
            fail: shareData.fail,
        }

        Object.defineProperty(wxShareData, 'trigger', {
            get() {
                return (...args) => {
                    shareData.trigger(...args)
                    assign(wxShareData, shareData)
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

export default { callShare, init, setWechatConfig }
